import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Divider, List, ListItem } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"
import { FlyContext } from '../lib/flyContext';


export const ClientOrders = ({route, navigation}) => {

  const {fly, userData, showAlert, forceUpdate} = useContext(FlyContext);
  const [orderList, setOrderList] = useState();
  const RenderItemAccessory = (props) => (
    <>
    <Button size='small' status='info' onPress={()=>{
      navigation.navigate("ProfessionalSelected", {order:props.item});
    }}>Ver</Button>
    <Button size='small' status='danger' disabled={true}>Eliminar</Button>
    </>
  );
  const renderItem = ({ item, index }) => (
    <ListItem
      title={item.profession.name}
      description={item.description}
      accessoryRight={()=><RenderItemAccessory item={item}/>}
    />
  );

  useEffect(()=>{
    fly.get("/orders/made/" + userData.id).then(res=>{
      setOrderList(res);
    });
  },[]);

  return (
   <View style={styles.container}>
    <Background/>
    <LogoHeader style={{width:"100%", height:100}}/>
    <List
      style={styles.container}
      data={orderList}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
   </View>
  )
};


const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255,255,0,0)",
    flex: 1
  },
 });