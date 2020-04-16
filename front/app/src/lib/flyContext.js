import React, {useState, useEffect} from "react";
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {LoginPage} from "../components/LoginPage"
import {Button, Icon, Text, Modal, Card } from '@ui-kitten/components';

const FlyContext = React.createContext();

function FlyContextProvider(props) {
    const [flyState, setFlyState] = useState(null);
    const [isLoggedIn, setLogged] = useState(false);
    const [userData, setUserData] = useState(null);
    const [notification, setNotification] = useState({message:null, okText:null, timer:2000});
    const [showNotification, setShowNotification] = useState(false);

    const userLogout = ()=>{
      AsyncStorage.removeItem('@MyApp_user');
      AsyncStorage.removeItem('@MyApp_token');
      setLogged(false);
      setUserData(null);
      // flyState.post("/logout");
    }

    const getMyValue = async (fly) => {
      try {
        const user = await AsyncStorage.getItem('@MyApp_user');
        const token = await AsyncStorage.getItem('@MyApp_token');
        if(user && token){
          fly.post("/users/login", {email:user, password:token}).then(res=>{
            if(!res){
              AsyncStorage.removeItem('@MyApp_user');
              AsyncStorage.removeItem('@MyApp_token');
              setLogged(false);
              setUserData(null);
            }
            else {
              setLogged(true);
              setUserData(res);
            }
            // console.log("token", res);
          });
        }
      } catch(e) {
        console.log("error",e);
      }
    }

    const showAlert = (message="", okText="ok", timer=2000) => {
      setNotification({message, okText, timer});
    }
    
    useEffect(()=>{
      var fly = require("flyio");
      var baseURL =  "http://192.168.15.9:8080";
      fly.baseURL = baseURL;
      fly.interceptors.request.use((request) => {
        // console.log("request", request);
        request.baseURL = baseURL;
        if (!request.headers["Content-Type"])
          request.headers["Content-Type"] = "application/json";
        return request;
      });
      fly.interceptors.response.use(
        (response) => {
          // console.log(response.request.url);
          if(response.request.url==="/users/login"){
            if(!response.data)
              return Promise.resolve(false);
            else {
              AsyncStorage.setItem('@MyApp_user', response.request.body.email);
              AsyncStorage.setItem('@MyApp_token', response.request.body.password);
              setLogged(true);
              setUserData(response.data);
            }
          }
          return Promise.resolve(response.data)
        },
        (err) => {
          console.log("err", err.status, err.message);
          if(err.status === 401){
            AsyncStorage.removeItem('@MyApp_user');
            AsyncStorage.removeItem('@MyApp_token');
            setLogged(false);
            setUserData(null);
          }
          return Promise.resolve({err:true, status:err.status, message:err.message})
        }
      );
      setFlyState(fly);
      getMyValue(fly);
      console.log("fly initialized")
    }, []);

    useEffect(()=>{
      if(notification.message!==null){
        setShowNotification(true);
        const timer = setTimeout(() => {
          setShowNotification(false);
        }, notification.timer);
        return () => {
          setShowNotification(false);
          clearTimeout(timer);
        };
      }
    }, [notification]);
    
    // console.log(isLoggedIn, userData, flyState===null);

    return (
      flyState!==null &&
      <FlyContext.Provider value={{fly:flyState, isLoggedIn, userData, setLogged, userLogout, showAlert}}>
      {
        isLoggedIn && userData ?
        props.children :
        <LoginPage fly={flyState} showAlert={showAlert}/>
      }
      <Modal
        visible={showNotification}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={() => setShowNotification(false)}>
        <Card disabled={true}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon style={{width:32, height:32, tintColor:'rgb(0,149,255)', marginRight:20}} name='alert-circle'/>
            <Text style={{marginVertical:20}}>{notification.message}</Text>
          </View>
          {notification.okText!==null &&
            <Button onPress={() => setShowNotification(false)}
            status='info'>
              {notification.okText}
            </Button>
          }
        </Card>
      </Modal>
      </FlyContext.Provider>
    )
}

export {FlyContextProvider, FlyContext}
