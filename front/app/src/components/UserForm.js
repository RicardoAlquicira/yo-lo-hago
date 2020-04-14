import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Icon, Input, Button, Text, Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"
import ProfileAvatar from "./ProfileAvatar"

const baseColor = '#6C6C6C';

const PersonIcon = (style) => (
  <Icon {...style} name='person'/>
);

const MobileIcon = (style) => (
  <Icon {...style} name='smartphone-outline'/>
);

const PlusIcon = (style) => (
  <Icon {...style} name='plus'/>
);

const renderPhotoButton = () => (
  <Button
    style={styles.editAvatarButton}
    size='small'
    accessoryRight={PlusIcon}
  />
);

const data = [
  '¿Eres técnico especializado?',
  '¿Buscas a un especialista?',
  'Ambas',
];

export const UserForm = () => {

  const [userName, setUserName] = React.useState();
  const [userMobile, setUserMobile] = React.useState();
  const [selectedIndex, setSelectedIndex] = React.useState();

  const onSignInButtonPress = () => {
    // navigation && navigation.goBack();
  };

  const renderOption = (title, idx) => (
    <SelectItem title={title} key={idx}/>
  );

  return (
    <Layout style={styles.container} level='1'>
      <View style={styles.formContainer}>
        <LogoHeader style={{width:"100%", height:100, marginTop:-20, marginBottom:50}}/>
        <ProfileAvatar
          style={styles.profileAvatar}
          source={require('../assets/image-person.png')}
          editButton={renderPhotoButton}
          size="small"
        />
        <Input
          status='control'
          placeholder='Nombre completo'
          placeholderTextColor = {baseColor}
          accessoryRight={PersonIcon}
          value={userName}
          onChangeText={setUserName}
          textStyle={{color:baseColor}}
        />
        <Input
          status='control'
          placeholder='Número de celular (WhatsApp preferente)'
          placeholderTextColor = {baseColor}
          accessoryRight={MobileIcon}
          value={userMobile}
          onChangeText={setUserMobile}
          textStyle={{color:baseColor}}
        />
        <Select
          style={{width:'100%'}}
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
            onPress={onSignInButtonPress}>
            Siguiente
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
  profileAvatar: {
    marginBottom: 20,
    width: 92,
    height: 92,
    borderRadius: 46,
    alignSelf: 'center',
    backgroundColor: '#fff',
    tintColor: baseColor,
  },
  editAvatarButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  }
});

