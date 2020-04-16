import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Icon, Input, Button, Text, Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"
import {AvatarPlaceholder} from "./AvatarPlaceholder"
import { FlyContext } from '../lib/flyContext';

const baseColor = '#6C6C6C';
const baseBorderColor = '#08f';

const PersonIcon = (style) => (
  <Icon {...style} fill={baseColor} name='person'/>
);

const MobileIcon = (style) => (
  <Icon {...style} fill={baseColor} name='smartphone-outline'/>
);

const EmailIcon = (style) => (
  <Icon {...style} fill={baseColor} name='email-outline'/>
);

const data = [
  '¿Eres técnico especializado?',
  '¿Buscas a un especialista?',
  'Ambas',
];

export const UserForm = () => {

  const {fly, userData, showAlert} = React.useContext(FlyContext);
  const [age, setAge] = React.useState(userData.age.toString());
  const [email, setEmail] = React.useState(userData.email);
  const [userName, setUserName] = React.useState(userData.name);
  const [userMobile, setUserMobile] = React.useState(userData.phone);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(userData.isProfessional?(userData.isClient?2:0):(userData.isClient?1:2)));
  
  const onSignUpButtonPress = () => {
    let user = {...userData, age, email, name:userName, phone:userMobile};
    if(selectedIndex){
      switch(selectedIndex.row){
        case 0:
          user.isClient=false;
          user.isProfessional=true;
          break;
        case 1:
          user.isClient=true;
          user.isProfessional=false;
          break;
        default:
          user.isClient=true;
          user.isProfessional=true;
      }
    }
    fly.post("/users", user).then(res=>{
      // console.log(res);
      showAlert("Perfil guardado!", null);
    });
  };

  const renderOption = (title, idx) => (
    <SelectItem title={title} key={idx}/>
  );

  return (
    <Layout style={styles.container} level='1'>
      <Background/>
      <View style={styles.formContainer}>
        <LogoHeader style={{width:"100%", height:100}}/>
        <View flexDirection="row">
          <View style={{flex:1}}/>
          <AvatarPlaceholder uploadButton={true} style={{width:90, height:90, marginVertical:20}}/>
          <View style={{flex:1, flexDirection:"row", justifyContent:"flex-end"}}>
            <Input
              style={{borderColor:baseBorderColor, flex:0.65, alignSelf:'flex-end'}}
              status='control'
              accessoryRight={()=><Text>años</Text>}
              placeholder="0"
              placeholderTextColor = {baseColor}
              keyboardType={'numeric'}
              value={age}
              onChangeText={setAge}
              textStyle={{color:'#000'}}
            />
          </View>
        </View>
        <Input
          style={{borderColor:baseBorderColor}}
          status='control'
          placeholder='Nombre completo'
          placeholderTextColor = {baseColor}
          accessoryRight={PersonIcon}
          value={userName}
          onChangeText={setUserName}
          textStyle={{color:'#000'}}
        />
        <Input
          style={{borderColor:baseBorderColor}}
          status='control'
          placeholder='Email'
          placeholderTextColor = {baseColor}
          textStyle={{color:'#000'}}
          accessoryRight={EmailIcon}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={{borderColor:baseBorderColor}}
          status='control'
          placeholder='Número de celular (WhatsApp preferente)'
          placeholderTextColor = {baseColor}
          accessoryRight={MobileIcon}
          value={userMobile}
          onChangeText={setUserMobile}
          keyboardType={'numeric'}
          textStyle={{color:'#000'}}
        />
        <Select
          style={styles.select}
          placeholder="Selecciona una opción"
          value={selectedIndex && data[selectedIndex.row]}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          {data.map(renderOption)}
        </Select>
        <View style={styles.signInContainer}>
          <Logo style={{width:90, height:90, marginTop:20, marginRight:20}}/>
          <Button
            style={styles.signInButton}
            size='large'
            onPress={onSignUpButtonPress}>
            Aceptar
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
  signInLabel: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
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
  forgotPasswordContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
    
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 34
  },
  socialAuthButton: {
    alignSelf: 'center'
  },
  select: {
    width:'100%', 
    borderRadius:4, 
    borderColor:baseBorderColor, 
    borderWidth:1
  }
});

