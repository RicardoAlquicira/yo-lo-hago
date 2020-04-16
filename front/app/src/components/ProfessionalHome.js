import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Input, Button, Text, Layout, Select, SelectItem } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"
import { FlyContext } from '../lib/flyContext';

const CameraIcon = (style) => (
  <Icon {...style} name='camera-outline'/>
);

const data = [
  'Plomero',
  'Electricista',
  'Carpintero',
  'Técnico electronico',
  'Ayudante de limpieza',
  'Albañil',
  'Hojalatero',
  'Fontanero',
  'Cerrajero',
  'Herrero',
  'Cargador de bultos',
  'Pintor de exteriores',
  'otro...'
];
const expectedTimeData = [
  '24 Hrs. Urgencias todos los dias',
  'Soló fines de semana',
  'Soló entre semana',
  '8 am - 7pm'
];

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

export const ProfessionalHome = () => {

  const {fly, userData, showAlert, forceUpdate} = React.useContext(FlyContext);
  const [userName, setUserName] = React.useState();
  const [userMobile, setUserMobile] = React.useState();
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [expectedTime, setExpectedTime] = React.useState();
  const multilineInputState = useInputState();

  const onSignInButtonPress = () => {
    // navigation && navigation.goBack();
  };

  const renderOption = (title, idx) => (
    <SelectItem title={title} key={idx}/>
  );

  return (
    <Layout style={styles.container} level='1'>
      <Background/>
      <View style={styles.formContainer}>
        <LogoHeader style={{width:"100%", height:100}}/>
        <Text category='h3'>Buenos días {userData.name}!</Text>
        <Text category='h5'>{'{Notificaciones y lista de ordenes}'}</Text>
        <Text>Despliega el menú lateral y ve a la seccion de ordenes</Text>
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

