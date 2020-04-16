/**
 * Yo lo hago APP
 */

import React from 'react';
import {
  ApplicationProvider,
  IconRegistry,
  Drawer, DrawerItem
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import Background from "./src/components/Background"
import {UserForm} from "./src/components/UserForm"
import {ClientHome} from "./src/components/ClientHome"
import {ProfessionalSelected} from "./src/components/ProfessionalSelected"
import {ProfessionalHome} from "./src/components/ProfessionalHome"
import {ProfessionalForm} from "./src/components/ProfessionalForm"
import {ServiceAssignment} from "./src/components/ServiceAssignment"
import {Payment} from "./src/components/Payment"
import {FlyContextProvider, FlyContext} from "./src/lib/flyContext";

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state, userLogout, userData }) => {
  return (
    <Drawer
      selectedIndex={state.index}
      onSelect={index => {
        if(state.routeNames.length===index.row)
          return userLogout();
        return navigation.navigate(state.routeNames[index.row]);
      }}>
      <DrawerItem title='Mi perfil' />
      {userData.isClient && <>
        <DrawerItem title='ClientHome' />
        <DrawerItem title='ProfessionalSelected' />
        <DrawerItem title='Payment' />
      </>}
      {userData.isProfessional && <>
        <DrawerItem title='ProfessionalHome' />
        <DrawerItem title='ProfessionalForm' />
        <DrawerItem title='ServiceAssignment' />
      </>}
      <DrawerItem title='Logout' />
    </Drawer>
  );
  }

export const DrawerNavigator = () => {
  const {userLogout, userData} = React.useContext(FlyContext);
  return (
    <Navigator drawerContent={props => <DrawerContent {...props} userLogout={userLogout} userData={userData}/>} 
    headerMode="none" animationEnabled={false} initialRouteName={userData.isProfessional?(!userData.profession?'ProfessionalForm':'ProfessionalHome'):'ClientHome'}>
      <Screen name="UserForm" component={UserForm} />
      {userData.isClient && <>
        <Screen name="ClientHome" component={ClientHome} />
        <Screen name="ProfessionalSelected" component={ProfessionalSelected} />
        <Screen name="Payment" component={Payment} />
      </>}
      {userData.isProfessional && <>
        <Screen name="ProfessionalHome" component={ProfessionalHome} />
        <Screen name="ProfessionalForm" component={ProfessionalForm} />
        <Screen name="ServiceAssignment" component={ServiceAssignment} />
      </>}
    </Navigator>
  );
}

export const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={eva.light}>
      <FlyContextProvider>
        <NavigationContainer>
          <DrawerNavigator/>
        </NavigationContainer>
      </FlyContextProvider>
    </ApplicationProvider>
  </>
);
