import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Input, Button, Text, Layout, CheckBox, SelectItem } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"
import { FlyContext } from '../lib/flyContext';

const baseBorderColor = '#08f';

export const ServiceAssignment = ({route, navigation}) => {

  const {fly, userData, showAlert, forceUpdate} =React.useContext(FlyContext);
  const [fareByService, setFareByService] = React.useState();
  const [timeEstimated, setTimeEstimated] = React.useState();
  const [warranty, setWarranty] = React.useState(false);
  const [notes, setNotes] = React.useState('');

  const onSignInButtonPress = () => {
    fly.post("/proposal", {professional:{id:userData.id}, task:{id:route.params.order.id}, notes, warranty, fare:fareByService, estimatedTime:timeEstimated}).then(res=>{
      showAlert("Propuesta enviada!", null);
      navigation.navigate("ProfessionalHome");
    });
  };

  return (
    <Layout style={styles.container} level='1'>
      <Background/>
      <View style={styles.formContainer}>
        <LogoHeader style={{width:"100%", height:100}}/>
        <Text category='h3'>Buenos días {userData.name}!</Text>
        <Text category='h5'>Asignación de servicio:</Text>
        <Input
          style={styles.select}
          multiline={true}
          textStyle={{ minHeight: 64 }}
          value={route.params.order.description}
        />
        <View style={{width:"100%", height:110}}>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{width:"70%"}}>
              <Text style={{marginVertical:5}}>Costo recomendado: $230.00</Text>
              <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight:10}}>Costo por reparación:</Text>
                <Input
                  editable={false}
                  style={styles.select}
                  size='small'
                  accessoryLeft={()=><Text>$</Text>}
                  placeholder="0"
                  keyboardType={'numeric'}
                  value={fareByService}
                  onChangeText={setFareByService}
                />
              </View>
              <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight:10}}>Tiempo estimado:</Text>
                <Input
                  style={styles.select}
                  size='small'
                  accessoryRight={()=><Text>dias</Text>}
                  placeholder="0"
                  keyboardType={'numeric'}
                  value={timeEstimated}
                  onChangeText={setTimeEstimated}
                />
              </View>
            </View>
            <Icon style={{width:90, height:90}} name='camera-outline'/>
          </View>
        </View>
        <Input
          style={styles.select}
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder='Comentarios: Incluye material!!!!'
          onChangeText={setNotes}
          value={notes}
        />
        <CheckBox
          style={{alignSelf:'flex-start', padding:4}}
          checked={warranty}
          onChange={nextChecked => setWarranty(nextChecked)}>
          Incluye garantía de 30 dias
        </CheckBox>
        <View style={styles.signInContainer}>
          <Logo style={{width:90, height:90, marginTop:20, marginRight:20}}/>
          <Button
            style={styles.signInButton}
            size='large'
            onPress={onSignInButtonPress}>
            Enviar propuesta
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
  select: {
    borderColor:baseBorderColor
  }
});

