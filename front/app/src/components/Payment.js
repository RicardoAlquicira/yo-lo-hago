import React from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import {
  Datepicker,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  Icon,
  Text,
  Button,
  Tab, 
  TabView
} from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"

export const EyeIcon = (style) => (
  <Icon {...style} name='eye'/>
);

export const EyeOffIcon = (style) => (
  <Icon {...style} name='eye-off'/>
);

export const Payment = () => {

  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [number, setNumber] = React.useState();
  const [name, setName] = React.useState();
  const [date, setDate] = React.useState();
  const [cvv, setCVV] = React.useState();
  const [cvvVisible, setCVVVisible] = React.useState(false);

  const CVVIcon = (props) => (
    <TouchableWithoutFeedback onPress={()=>setCVVVisible(oldValue=>!oldValue)}>
      <Icon {...props} name={cvvVisible ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  return (
    <Layout
      style={styles.form}
      level='1'>
      <Background/>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Tab title='Openpay'>
          <Layout style={styles.tabContainer}>
          <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center'}}>
            <Text category='h5'>Powered by:</Text>
            <Image
              style={styles.logo}
              source={require('../assets/openpay_color.png')}
            />
          </View>
          <Input
            style={styles.input}
            label='Número de tarjeta'
            placeholder='1234 3456 5677 8907'
            keyboardType='numeric'
            maxLength={19}
            value={number}
            onChangeText={setNumber}
          />
          <View style={styles.middleContainer}>
            <Input
              style={[styles.input, styles.middleInput]}
              label='Fecha de expiración'
              placeholder='09 / 20'
              keyboardType='numeric'
              value={date}
              onChangeText={(value)=>{setDate(oldVal=>(value.length==2 && oldVal.length==1)?value+" / ":value)}}
            />
            <Input
              style={[styles.input, styles.middleInput]}
              label='Código de seguridad'
              keyboardType='numeric'
              placeholder='***'
              maxLength={3}
              value={cvv}
              secureTextEntry={!cvvVisible}
              accessoryRight={CVVIcon}
              onChangeText={setCVV}
            />
          </View>
          <Input
            style={styles.input}
            label='Nombre del titular'
            placeholder='Ingresar nombre como aparece en la tarjeta'
            value={name}
            onChangeText={setName}
          />
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <Image style={{width:100, height:50}} source={require('../assets/visa.png')} />
            <Image style={{width:75, height:58, marginHorizontal:12.5}} source={require('../assets/masterCard.png')} />
            <Image style={{width:55, height:55, marginHorizontal:22.5}} source={require('../assets/americanExpress.png')} />
          </View>
          </Layout>
        </Tab>
        <Tab title='paynet'>
          <Layout style={styles.tabContainer}>
            <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center'}}>
              <Text category='h5'>Powered by:</Text>
              <Image
                style={styles.logo}
                source={require('../assets/paynet/logo_paynet1.png')}
              />
            </View>
            <Text category='h4' style={{alignSelf: 'center', marginVertical:10}}>Cadenas afiliadas</Text>
            <View style={{marginVertical:10, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
              <Image style={{width:120, height:30}} source={require('../assets/paynet/Walmart.png')} />
              <Image style={{width:120, height:40}} source={require('../assets/paynet/Bodega-Aurrera.png')} />
              <Image style={{width:120, height:45}} source={require('../assets/paynet/Farmacias-del-Ahorro.png')} />
            </View>
            <View style={{marginVertical:10, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
              <Image style={{width:80, height:80, marginHorizontal:20}} source={require('../assets/paynet/Sams-Club.png')} />
              <Image style={{width:80, height:80, marginHorizontal:20}} source={require('../assets/paynet/7eleven.png')} />
              <Image style={{width:120, height:40}} source={require('../assets/paynet/Extra.png')} />
            </View>
            <View style={{marginVertical:10, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
              <Image style={{width:80, height:70, marginHorizontal:20}} source={require('../assets/paynet/Waldos.png')} />
              <Image style={{width:120, height:45}} source={require('../assets/paynet/Circle-K.jpg')} />
              <Image style={{width:120, height:25}} source={require('../assets/paynet/Superama.png')} />
            </View>
          </Layout>
        </Tab>
      </TabView>
      <View style={styles.signInContainer}>
        <Logo style={{width:90, height:90, marginTop:20, marginRight:20}}/>
        <Button
          style={styles.signInButton}
          size='large'
          onPress={()=>{}}>
          Pagar
        </Button>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,0,0)",
  },
  tabContainer: {
    marginTop: 10,
    backgroundColor: "rgba(255,255,0,0)",
  },
  form: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 24,
    backgroundColor: "rgba(255,255,0,0)",
  },
  input: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  middleContainer: {
    flexDirection: 'row',
  },
  middleInput: {
    width: 128,
  },
  addButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  logo: {
    width: 197,
    height: 60,
    marginLeft:20
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
