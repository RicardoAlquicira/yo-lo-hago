import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Text, Layout, Select, SelectItem } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"
import Stars from "./Stars"

const data = [
  {name:'Angel Orozco', age:30, profession:'Plomero', distance:'10 km', experienceTime:5, rate:3.5, fare:0.6},
];

export const ProffesionalSelected = () => {

  const [selectedIndex, setSelectedIndex] = React.useState();

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
          <View style={{backgroundColor:'#F57', flex:6, flexDirection:'row'}}>
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
          <View style={{backgroundColor:'#7A7', flex:5}}>
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
              <Stars progress={0.7}/>
            </View>
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
              <Text>Precio:</Text>
            </View>
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
              <Text>Bajo</Text>
              <Text>Promedio</Text>
              <Text>Alto</Text>
            </View>
          </View>
        </View>
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
  cardContainer: {
    width: '90%',
    height: 200,
    borderWidth: 2,
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
});

