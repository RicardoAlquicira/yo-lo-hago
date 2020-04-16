import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Button, Text } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"


export const LocationMap = ({route, navigation}) => {

  const [coords, setCoords] = useState(route.params.coords);

  useEffect(()=>{
    Geolocation.getCurrentPosition(info => {
      // console.log(info);
      setCoords({latitude:info.coords.latitude, longitude:info.coords.longitude});
    });
  }, []);

  return (
   <View style={styles.container}>
    <Background/>
    { coords &&
      <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
      <Marker draggable
        coordinate={coords}
        onDragEnd={(e) => setCoords(e.nativeEvent.coordinate) }
      />
    </MapView>
    }
    <Text category='h6' style={{textAlign:'center', marginTop:15, backgroundColor:'#fff8'}}>Manten presionado el marcador para moverlo</Text>
    <View style={{flex:1, justifyContent:'flex-end', marginBottom:30}}>
      <View style={styles.signInContainer}>
        <Logo style={{width:90, height:90, marginTop:20, marginRight:20}}/>
        <Button
          style={styles.signInButton}
          size='large'
          onPress={()=>{navigation.navigate('ClientHome', {coords})}}>
          Seleccionar
        </Button>
      </View>
    </View>
   </View>
  )
};


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  signInButton: {
    marginTop: 40,
    width: 200,
    height: 50,
    backgroundColor: 'rgba(22, 155, 213, 1)'
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
 });