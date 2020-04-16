import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Input, Button, Text, Layout, Select, SelectItem } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"
import { FlyContext } from '../lib/flyContext';

const expectedTimeData = [
  {name:'Urgente menos de 1 hora'},
  {name:'1 hora - 3 horas'},
  {name:'1 a 3 días'}
];

const useInputState = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  return { value, onChangeText: setValue };
};

export const ClientHome = () => {

  const {fly, userData, showAlert, forceUpdate} = useContext(FlyContext);
  const [userName, setUserName] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [expectedTime, setExpectedTime] = useState();
  const [professionList, setProfessionList] = useState([]);
  const multilineInputState = useInputState();

  const onSignInButtonPress = () => {
    // navigation && navigation.goBack();
  };

  const renderOption = (element, idx) => (
    <SelectItem title={element.name} key={idx}/>
  );

  
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
        <Text category='h3'>Buenos días {userData.name}!</Text>
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
          {...multilineInputState}
        />
        <View style={{width:"100%", height:90}}>
        <View style={{flex:1, flexDirection: 'row'}}>
          <View style={{width:"70%"}}>
            <Text>Puedes adjuntar una fotografía de lo que desees arreglar</Text>
            <Input
              placeholder='Ingresa tu código postal'
              keyboardType={'numeric'}
              value={userName}
              onChangeText={setUserName}
            />
          </View>
          <Icon style={{width:90, height:90}} name='camera-outline'/>
        </View>
        </View>
        <Select
          style={{width:'100%'}}
          placeholder="Tiempo esperado"
          value={expectedTime && expectedTimeData[expectedTime.row]}
          selectedIndex={expectedTime}
          onSelect={index => setExpectedTime(index)}>
          {expectedTimeData.map(renderOption)}
        </Select>
        <View style={styles.signInContainer}>
          <Logo style={{width:90, height:90, marginTop:20, marginRight:20}}/>
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
    marginTop: 40,
    width: 200,
    height: 50,
    backgroundColor: 'rgba(22, 155, 213, 1)'
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

