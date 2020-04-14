import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Text, Layout, Select, SelectItem, Modal, Card } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"
import Stars from "./Stars"
import PriceBar from "./PriceBar"

const data = [
  {name:'Angel Orozco', age:30, profession:'Plomero', distance:'10 km', experienceTime:5, rate:3.5, fare:0.6},
];

export const ProffesionalSelected = () => {

  const [selectedIndex, setSelectedIndex] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);

  const onSignInButtonPress = () => {
    // navigation && navigation.goBack();
  };

  const renderOption = (element, idx) => (
    <SelectItem title={element.name} key={idx}/>
  );

  return (
    <Layout style={styles.container} level='1'>
      <View style={styles.formContainer}>
        <LogoHeader style={{width:"100%", height:100}}/>
        <Text category='h3'>Buenos días Andres!</Text>
        <Text category='h5'>Estos son los plomeros más cercanos:</Text>
        <Select
          style={{width:'100%', marginVertical:7 }}
          placeholder="Selecciona uno de la lista"
          value={selectedIndex && data[selectedIndex.row].name}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          {data.map(renderOption)}
        </Select>
        <View style={styles.cardContainer}>
          <View style={{flex:6, flexDirection:'row'}}>
            <View style={{flex:3}}>
              <Avatar source={require('../assets/image-person.png')} style={styles.profileAvatar}/>
            </View>
            <View style={{flex:7}}>
              <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:2}}>
                  <Text>Angel Orozco</Text>
                  <Text>Oficio: Plomero</Text>
                </View>
                <View style={{flex:1}}>
                  <Text>30 años</Text>
                  <Text>10 km</Text>
                </View>
              </View>
              <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:2}}>
                  <Text>Años de experiencia:</Text>
                  <Text>Evaluación:</Text>
                </View>
                <View style={{flex:1}}>
                  <Text>5</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{flex:5}}>
            <Stars progress={0.7} style={{marginVertical:2, flex:1, flexDirection:'row', justifyContent:'space-around'}}/>
            <View style={{marginTop:8, flex:1, flexDirection:'row', justifyContent:'space-between'}}>
              <Text>Precio:</Text>
              <PriceBar progress={0.6}/>
            </View>
            <View style={{marginLeft:50, flex:1, flexDirection:'row', justifyContent:'space-between'}}>
              {['Bajo', 'Promedio', 'Alto'].map(val=><Text style={{fontSize:12}} key={val}>{val}</Text>)}
            </View>
          </View>
        </View>
        <Button
          style={{backgroundColor: 'rgba(22, 155, 213, 1)', marginTop:10}}
          size='medium'
          onPress={() => setModalVisible(true)}>
          Leer comentarios
        </Button>
        <View style={styles.signInContainer}>
          <Logo style={{width:90, height:90, marginTop:20, marginRight:20}}/>
          <Button
            style={styles.signInButton}
            size='large'
            onPress={onSignInButtonPress}>
            Contratar
          </Button>
        </View>
      </View>
      <Modal visible={modalVisible}>
        <Card disabled={true} style={{borderRadius:20}}>
          <Text style={{marginBottom:15}} category='h6'>Comentarios:</Text>
          {[...Array(5).keys()].map(val=>
            <View style={{flexDirection:"row", marginVertical:3}} key={val}>
              <Avatar source={require('../assets/image-person.png')} style={styles.profileMiniAvatar}/>
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
    marginTop: 40,
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
    height: 200,
    borderWidth: 1,
    padding: 5,
    flex:0.6,
    flexDirection:'column'
  },
  profileAvatar: {
    marginBottom: 20,
    width: 75,
    height: 75,
    borderRadius: 37.5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    tintColor: '#6C6C6C',
  },
  profileMiniAvatar: {
    marginRight: 7,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(22, 155, 213, 1)',
    tintColor: '#fff',
  },
});

