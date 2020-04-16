import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Input, Button, Text, Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import {Logo, LogoHeader} from "./Logo"
import { FlyContext } from '../lib/flyContext';

const CameraIcon = (style) => (
  <Icon {...style} name='camera-outline'/>
);

const useInputState = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  return { value, onChangeText: setValue };
};

export const ProfessionalForm = () => {

  const {fly, userData, showAlert, forceUpdate} =useContext(FlyContext);
  const [years, setYears] = useState();
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [professionList, setProfessionList] = useState([]);
  const [editingJob, setEditingJob] = useState();
  const [userExpertisJob, setUserExpertisJob] = useState([]);
  const [experience, setExperience] = useState('');

  useEffect(()=>{
    fly.get("/professions").then(res=>{
      setProfessionList(res);
      fly.get("/expertis/user/"+userData.id).then(expertises=>{
        let jobsForMe = [];
        let expertiseJob = [];
        expertises.map(expertis=>{
          const profIdx=res.findIndex(profession=>profession.id===expertis.profession.id);
          if(profIdx!==-1){
            jobsForMe.push(new IndexPath(profIdx));
            expertiseJob.push(expertis);
          }
        });
        setSelectedIndex(jobsForMe);
        setUserExpertisJob(expertiseJob);
      });
    });
  }, []);

  const onSignInButtonPress = () => {
    fly.post("/expertis", {id:userExpertisJob[editingJob.row].id, experience, years, user:{id:userExpertisJob[editingJob.row].user.id}}).then(res=>{
      showAlert("Datos actualizados!", null);
    });
  };

  const renderOption = (element) => (
    <SelectItem title={element.name} key={element.id}/>
  );
  
  const groupDisplayValues = selectedIndex.map(index => {
    return professionList[index.row].name;
  });
  const groupSelectedValues = selectedIndex.map(index => {
    return professionList[index.row];
  });
  
  return (
    <Layout style={styles.container} level='1'>
      <Background/>
      <View style={styles.formContainer}>
        <LogoHeader style={{width:"100%", height:100}}/>
        <Text category='h3'>Buenos días {userData.name}!</Text>
        <Select
          multiSelect={true}
          style={{width:'100%'}}
          placeholder="¿A qué te dedicas?"
          value={groupDisplayValues.join(', ')}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          {/* {professionList.concat([{name:'otro...', description:''}]).map(renderOption)} */}
          {professionList.map(renderOption)}
        </Select>
        <Select
          disabled={selectedIndex.length===0}
          style={{width:'100%'}}
          placeholder="Selecciona un trabajo"
          value={editingJob && groupDisplayValues[editingJob.row]}
          selectedIndex={editingJob}
          onSelect={index => {
            setEditingJob(index);
            setExperience(userExpertisJob[index.row].experience);
            setYears(userExpertisJob[index.row].years.toString());
          }}>
          {groupSelectedValues.map(renderOption)}
        </Select>
        <Input
          disabled={!editingJob}
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder='¿Cuál es tu experiencia?, cuentanos'
          value={experience}
          onChangeText={setExperience}
        />
        <View style={{width:"100%", height:90}}>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{width:"70%"}}>
              <Text>Puedes agregar fotografias sobre tu trabajo!</Text>
              <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight:10}}>Años de experiencia:</Text>
                <Input
                  disabled={!editingJob}
                  placeholder="0"
                  keyboardType={'numeric'}
                  value={years}
                  onChangeText={setYears}
                />
              </View>
            </View>
            <Icon style={{width:90, height:90}} name='camera-outline'/>
          </View>
        </View>
        <View style={styles.signInContainer}>
          <Logo style={{width:90, height:90, marginTop:20, marginRight:20}}/>
          <Button
            style={styles.signInButton}
            size='large'
            onPress={onSignInButtonPress}>
            Guardar
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
});

