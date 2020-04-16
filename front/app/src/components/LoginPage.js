import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Icon, Input, Button, Text, Layout, Modal, Card } from '@ui-kitten/components';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import {Logo, LogoHeader} from "./Logo"

const baseColor = '#6C6C6C';


export const LoginPage = ({fly}) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [loginFail, setLoginFail] = React.useState(false);

  const EmailIcon = (style) => (
    <Icon {...style} fill={baseColor} name='email-outline'/>
  );

  const onSignInButtonPress = () => {
    fly.post("/users/login", {email, password}).then(res=>{
      if(!res)
        setLoginFail(true);
    });
  };

  const onSignUpButtonPress = () => {
  // navigation && navigation.navigate('SignUp4');
  };

  const onForgotPasswordButtonPress = () => {
    // navigation && navigation.navigate('ForgotPassword');
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={()=>setPasswordVisible(oldValue=>!oldValue)}>
      <Icon {...props} fill={baseColor} name={passwordVisible ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.container} level='1'>
      <Background/>
      <View style={styles.formContainer}>
        <LogoHeader style={{width:"100%", height:100, marginTop:-20, marginBottom:50}}/>
        <Input
          status='control'
          placeholder='Email'
          placeholderTextColor = {baseColor}
          textStyle={{color:'#000'}}
          accessoryRight={EmailIcon}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.passwordInput}
          status='control'
          placeholder='Password'
          placeholderTextColor = {baseColor}
          textStyle={{color:'#000'}}
          accessoryRight={renderIcon}
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        />
        <View style={styles.signInContainer}>
          <Logo style={{width:90, height:90, marginTop:20, marginRight:20}}/>
          <Button
            style={styles.signInButton}
            size='large'
            onPress={onSignInButtonPress}>
            Entrar
          </Button>
        </View>
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordButton}
            appearance='ghost'
            status='control'
            onPress={onForgotPasswordButtonPress}>
            ¿Olvidaste tu contraseña?
          </Button>
        </View>
        <GoogleSigninButton
        style={styles.socialAuthButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={()=>{}}/>
        <Button
          style={styles.signUpButton}
          appearance='filled'
          status="basic"
          onPress={onSignUpButtonPress}>
          ¿No tienes una cuenta? Registrate.
        </Button>
      </View>
      <Modal
        visible={loginFail}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={() => setLoginFail(false)}>
        <Card disabled={true}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon style={{width:32, height:32, tintColor:'rgb(0,149,255)', marginRight:20}} name='alert-circle'/>
            <Text style={{marginVertical:20}}>Usuario o contraseña incorrecta.</Text>
          </View>
          <Button onPress={() => setLoginFail(false)}
          status='info'>
            Ok
          </Button>
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
    color:baseColor
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 34
  },
  socialAuthButton: {
    alignSelf: 'center'
  },
});

