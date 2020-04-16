import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Input, Button, Text, Layout, Select, SelectItem } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"
import { FlyContext } from '../lib/flyContext';

const PinIcon = (style) => (
  <Icon {...style} fill='#000' name='pin-outline'/>
);

export const ClientHome = ({route, navigation}) => {
  const {fly, userData, showAlert, forceUpdate} = useContext(FlyContext);
  const [selectedIndex, setSelectedIndex] = useState();
  const [professionList, setProfessionList] = useState([]);
  const [coords, setCoords] = useState();
  const [description, setDescription] = useState();

  const onSignInButtonPress = () => {
    fly.post("/orders", {client:{id:userData.id}, profession:{id:professionList[selectedIndex.row].id}, description, latitude:coords?coords.latitude:null, longitude:coords?coords.longitude:null}).then(res=>{
      showAlert("Orden de servicio creada!", null);
      navigation.navigate("ClientOrders");
    });
  };

  const renderOption = (element, idx) => (
    <SelectItem title={element.name} key={idx}/>
  );
  
  useEffect(() => {
    if (route.params?.coords) {
      setCoords(route.params?.coords);
    }
  }, [route.params?.coords]);
  
  useEffect(()=>{
    fly.get("/professions").then(res=>{
      setProfessionList(res);
    });
  }, []);

  return (
    <Layout style={styles.container} level='1'>
      <Background/>
      <View style={styles.formContainer}>
        <LogoHeader style={{width:"100%", height:100}}/>
        <Text category='h3' style={{textAlign:'center'}}>Buenos días {userData.name}!</Text>
        <Text category='h5'>¿Qué necesitar arreglar?</Text>
        <Select
          style={{width:'100%', marginVertical:7 }}
          placeholder="Busco a un ... ejemplo: Plomero"
          value={selectedIndex && professionList[selectedIndex.row].name}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          {professionList.map(renderOption)}
        </Select>
        <Input
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder='¿Que deseas reparar? Ejemplo: Se rompio la tuberia del fregadero'
          value={description}
          onChangeText={setDescription}
        />
        <View style={{width:"100%", height:90}}>
        <View style={{flex:1, flexDirection: 'row'}}>
          <View style={{width:"70%"}}>
            <Text>Puedes adjuntar una fotografía de lo que desees arreglar</Text>
            <Button
              style={{width:200, height:20}}
              accessoryLeft={PinIcon}
              appearance='outline'
              onPress={()=>navigation.navigate("LocationMap", {coords})}>
              Ubicación
            </Button>
          </View>
          <Icon style={{width:90, height:90}} name='camera-outline'/>
        </View>
        </View>
        <View style={styles.signInContainer}>
          <Logo style={{width:90, height:90, marginTop:5, marginRight:20}}/>
          <Button
            style={styles.signInButton}
            size='large'
            onPress={onSignInButtonPress}>
            Enviar
          </Button>
        </View>
      </View>
      <Text style={[StyleSheet.absoluteFill, {width:'100%', textAlign:'center', top:630}]}>
        Copyright © 2020 Yo lo hago!!
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255,255,0,0)",
    flex: 1
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInButton: {
    width: 200,
    height: 50,
    backgroundColor: 'rgba(22, 155, 213, 1)'
  },
  signInContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

