import React, {useState, useEffect} from "react";
import AsyncStorage from '@react-native-community/async-storage';
import {LoginPage} from "../components/LoginPage"

const FlyContext = React.createContext();

function FlyContextProvider(props) {
    const [flyState, setFlyState] = useState(null);
    const [isLoggedIn, setLogged] = useState(false);
    const [userData, setUserData] = useState(null);

    const userLogout = ()=>{
      AsyncStorage.removeItem('@MyApp_user');
      AsyncStorage.removeItem('@MyApp_token');
      setLogged(false);
      setUserData(null);
      flyState.post("/logout");
    }

    const getMyValue = async (fly) => {
      try {
        const user = await AsyncStorage.getItem('@MyApp_user');
        const token = await AsyncStorage.getItem('@MyApp_token');
        if(user && token){
          fly.post("/users/login", {email:user, password:token}).then(res=>{
            setLogged(true);
            setUserData(res);
            // console.log("token", res);
          });
        }
      } catch(e) {
        console.log("error",e);
      }
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
          console.log(err.status, err.message);
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
    
    // console.log(isLoggedIn, userData, flyState===null);

    return (
      flyState!==null &&
      <FlyContext.Provider value={{fly:flyState, isLoggedIn, userData, setLogged, userLogout}}>
      {
        isLoggedIn ?
        props.children :
        <LoginPage fly={flyState}/>
      }
      </FlyContext.Provider>
    )
}

export {FlyContextProvider, FlyContext}
