import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Icon, Input, Button, Text, Layout, Modal, Card } from '@ui-kitten/components';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import {Logo, LogoHeader} from "./Logo"

const baseColor = '#6C6C6C';
const baseBorderColor = '#08f';

const PersonIcon = (style) => (
  <Icon {...style} fill={baseColor} name='person'/>
);
const EmailIcon = (style) => (
  <Icon {...style} fill={baseColor} name='email-outline'/>
);

export const LoginPage = ({fly, showAlert}) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState("");
  const [repassword, setRepassword] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [userName, setUserName] = React.useState();
  const [registering, setRegistering] = React.useState(false);

  const onSignInButtonPress = () => {
    if(registering) {
      if(password!==repassword)
        return showAlert("Las contraseñas ingresadas no coinciden.", null);
      if(password.length < 5)
        return showAlert("Las contraseña debe ser mínimo de 5 caracteres.", null);
      let user = {name:userName, email, password};
      fly.post("/users", user).then(res=>{
        showAlert("Registro exitoso!, Se enviará un link de confirmación al correo ingresado.", null, 10000);
        setRegistering(oldVal=>!oldVal);
      });
    }
    fly.post("/users/login", {email, password}).then(res=>{
      if(!res)
        showAlert("Usuario o contraseña incorrecta.", "Ok");
    });
  };

  const onSignUpButtonPress = () => {
    setRegistering(oldVal=>!oldVal);
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
        <LogoHeader style={{width:"100%", height:100}}/>
        <Text category='h2'>{registering?'Registrarse':'Iniciar sesión'}</Text>
        <View style={{width:"100%", flex:0.8, justifyContent:'space-around'}}>
          { registering && 
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
          }
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
            placeholder='Password'
            placeholderTextColor = {baseColor}
            textStyle={{color:'#000'}}
            accessoryRight={renderIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
          />
          {registering &&
            <Input
            style={{borderColor:baseBorderColor}}
            status='control'
            placeholder='Repetir password'
            placeholderTextColor = {baseColor}
            textStyle={{color:'#000'}}
            value={repassword}
            secureTextEntry={true}
            onChangeText={setRepassword}
          />
          }
          <View style={styles.signInContainer}>
            <Logo style={{width:90, height:90, marginTop:20, marginRight:20}}/>
            <Button
              style={styles.signInButton}
              size='large'
              onPress={onSignInButtonPress}>
              {registering?'Registrarse':'Entrar'}
            </Button>
          </View>
          {!registering && <>
            <View style={styles.forgotPasswordContainer}>
              <Button
                appearance='ghost'
                status='control'
                onPress={onForgotPasswordButtonPress}>
                <Text style={{color:"rgb(163,0,20)"}}>¿Olvidaste tu contraseña?</Text>
              </Button>
            </View>
            <GoogleSigninButton
            style={styles.socialAuthButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={()=>{}}/>
          </>}
          <Button
            style={styles.signUpButton}
            appearance='filled'
            status="basic"
            onPress={onSignUpButtonPress}>
            {registering?'¿Ya tienes una cuenta? Inicia sesión.':'¿No tienes una cuenta? Registrate.'}
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
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 34
  },
  socialAuthButton: {
    alignSelf: 'center'
  },
});

