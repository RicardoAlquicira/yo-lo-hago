import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Divider, List, ListItem, Select, SelectItem } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"
import { FlyContext } from '../lib/flyContext';


export const ProfessionalOrders = ({route, navigation}) => {

  const {fly, userData, showAlert, forceUpdate} = useContext(FlyContext);
  const [orderList, setOrderList] = useState();
  const [professionList, setProfessionList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const RenderItemAccessory = (props) => (
    <>
    <Button size='medium' status='info' onPress={()=>{
      navigation.navigate("ServiceAssignment", {order:props.item});
    }}>Ver</Button>
    </>
  );
  const renderItem = ({ item, index }) => (
    <ListItem
      title={item.profession.name}
      description={item.description}
      accessoryRight={()=><RenderItemAccessory item={item}/>}
    />
  );
  const renderOption = (element, idx) => (
    <SelectItem title={element.name} key={idx}/>
  );
  

  useEffect(()=>{
    // fly.get("/orders/opened/" + 1).then(res=>{
    //   setOrderList(res);
    // });
    fly.get("/professions").then(res=>{
      setProfessionList(res);
    });
  },[]);
  
  useEffect(()=>{
    selectedIndex &&
    fly.get("/orders/opened/" + professionList[selectedIndex.row].id).then(res=>{
      setOrderList(res);
    });
  },[selectedIndex]);

  return (
   <View style={styles.container}>
    <Background/>
    <LogoHeader style={{width:"100%", height:100}}/>
    <Text category='h5'>Selecciona una categoría para ver las ordenes abiertas</Text>
    <Select
      style={{width:'100%', marginVertical:7 }}
      placeholder="Selecciona una categoría"
      value={selectedIndex && professionList[selectedIndex.row].name}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      {professionList.map(renderOption)}
    </Select>
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