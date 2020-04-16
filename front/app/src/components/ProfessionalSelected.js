import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CheckBox, Button, Text, Layout, Select, SelectItem, Modal, Card, IndexPath } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"
import Stars from "./Stars"
import PriceBar from "./PriceBar"
import {AvatarPlaceholder} from "./AvatarPlaceholder"
import { FlyContext } from '../lib/flyContext';

const baseBorderColor = '#08f';

const data = [
  {name:'Angel Orozco', age:30, profession:'Plomero', distance:'10 km', experienceTime:5, rate:3.5, fare:0.6},
];

export const ProfessionalSelected = ({route, navigation}) => {

  // console.log(route.params);
  const {fly, userData, showAlert, forceUpdate} = React.useContext(FlyContext);
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [proposalList, setProposalList] = React.useState([]);

  const onSignInButtonPress = () => {
    navigation && navigation.navigate("Payment");
  };

  const renderOption = (element, idx) => (
    <SelectItem title={element.professional.name} key={idx}/>
  );

  React.useEffect(()=>{
    fly.get("/proposal/task/" + route.params.order.id).then(res=>{
      // console.log("proposal", res);
      setProposalList(res);
    });
  },[]);

  return (
    <Layout style={styles.container} level='1'>
      <Background/>
      <View style={styles.formContainer}>
        <LogoHeader style={{width:"100%", height:100, marginTop:-30}}/>
        <Text category='h3'>Buenos días {userData.name}!</Text>
        <Text category='h6'>Estos son los {route.params.order.profession.name} más cercanos:</Text>
        <Select
          style={{...styles.select, width:'90%', marginVertical:7 }}
          placeholder="Selecciona uno de la lista"
          value={selectedIndex && proposalList[selectedIndex.row].professional.name}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          {proposalList.map(renderOption)}
        </Select>
        <View style={styles.cardContainer}>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:2, justifyContent:'center'}}>
              <AvatarPlaceholder style={styles.profileAvatar}/>
            </View>
            <View style={{flex:7, justifyContent:'center'}}>
              {selectedIndex && 
              <View style={{flexDirection:'row'}}>
                <View style={{flex:3}}>
                  <Text>{proposalList[selectedIndex.row].professional.name}</Text>
                  <Text>Oficio: {route.params.order.profession.name}</Text>
                  <Text>Años de experiencia:</Text>
                  <Text>Evaluación:</Text>
                </View>
                <View style={{flex:1}}>
                  <Text>{proposalList[selectedIndex.row].professional.age} años</Text>
                  <Text>10 km</Text>
                  <Text>2</Text>
                </View>
              </View>
              }
            </View>
          </View>
          {selectedIndex && 
          <View>
            <Stars progress={0.7} style={{alignSelf:'center', height:30, marginTop:5}}/>
            <View style={{marginTop:5, flexDirection:'row', justifyContent:'space-between'}}>
              <Text>Precio:</Text>
              <PriceBar progress={0.6}/>
            </View>
            <View style={{marginLeft:50, flexDirection:'row', justifyContent:'space-between'}}>
              {['Bajo', 'Promedio', 'Alto'].map(val=><Text style={{fontSize:12}} key={val}>{val}</Text>)}
            </View>
          </View>
          }
        </View>
        {selectedIndex && <>
        <Text style={{alignSelf:'flex-start', marginLeft:20, marginVertical:4}}>Costo por reparación: ${proposalList[selectedIndex.row].fare}</Text>
        <Text style={{alignSelf:'flex-start', marginLeft:20, marginVertical:4}}>Comentarios: {proposalList[selectedIndex.row].notes}</Text>
        <Text style={{alignSelf:'flex-start', marginLeft:20, marginVertical:4}}>Tiempo estimado: {proposalList[selectedIndex.row].estimatedTime} días</Text>
        <CheckBox
          style={{alignSelf:'flex-start', padding:4, marginLeft:17}}
          checked={proposalList[selectedIndex.row].warranty}>
          Incluye garantía de 30 dias
        </CheckBox>
        <Button
          style={{backgroundColor: 'rgba(22, 155, 213, 1)', marginTop:10}}
          size='medium'
          onPress={() => setModalVisible(true)}>
          Leer comentarios
        </Button>
        <View style={styles.signInContainer}>
          <Logo style={{width:90, height:90, marginRight:20}}/>
          <Button
            style={styles.signInButton}
            size='large'
            onPress={onSignInButtonPress}>
            Contratar
          </Button>
        </View>
        </>}
      </View>
      <Modal visible={modalVisible} backdropStyle={{backgroundColor:'#0007'}}>
        <Card disabled={true} style={{borderRadius:20, padding:30}}>
          <Text style={{marginBottom:15}} category='h6'>Comentarios:</Text>
          {[...Array(6).keys()].map(val=>
            <View style={{flexDirection:"row", marginVertical:3}} key={val}>
              <AvatarPlaceholder style={styles.profileMiniAvatar}/>
              <Text>Luisa: Excelente servicio!!</Text>
            </View>
          )}
          <View style={{...styles.signInContainer, marginTop:15}}>
            <Logo style={{width:60, height:60, marginRight:20}}/>
            <Button
              style={{backgroundColor: 'rgba(22, 155, 213, 1)', height:30, marginTop:10}}
              onPress={() => setModalVisible(false)}>
              Atras
            </Button>
          </View>
        </Card>
      </Modal>
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
    marginTop: 20,
    width: 200,
    height: 50,
    backgroundColor: 'rgba(22, 155, 213, 1)'
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardContainer: {
    width: '90%',
    borderRadius:4, 
    borderColor:baseBorderColor, 
    borderWidth:1,
    padding: 5
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
  },
  profileMiniAvatar: {
    marginRight: 7,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  select: {
    width:'100%', 
    borderRadius:4, 
    borderColor:baseBorderColor, 
    borderWidth:1
  }
});

