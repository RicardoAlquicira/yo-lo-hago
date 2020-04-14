import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Input, Button, Text, Layout, Select, SelectItem } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"

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
      <View style={styles.formContainer}>
        <LogoHeader style={{width:"100%", height:100}}/>
        <Text category='h3'>Buenos días Luis!</Text>
        <Text category='h5'>¿Qué necesitar arreglar?</Text>
        <Select
          style={{width:'100%', marginVertical:7 }}
          placeholder="¿A qué te dedicas?"
          value={selectedIndex && data[selectedIndex.row]}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          {data.map(renderOption)}
        </Select>
        <Input
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder='¿Cuál es tu experiencia?, cuentanos'
          {...multilineInputState}
        />
        <View style={{width:"100%", height:90}}>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{width:"70%"}}>
              <Text>Puedes agregar fotografias sobre tu trabajo!</Text>
              <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight:10}}>Años de experiencia:</Text>
                <Input
                  placeholder="0"
                  keyboardType={'numeric'}
                  value={userName}
                  onChangeText={setUserName}
                />
              </View>
            </View>
            <Icon style={{width:90, height:90}} name='camera-outline'/>
          </View>
        </View>
        <Select
          style={{width:'100%'}}
          placeholder="Horarios en los que prefieres trabajar"
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

