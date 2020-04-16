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
import {ClientOrders} from "./src/components/ClientOrders"
import {ProfessionalOrders} from "./src/components/ProfessionalOrders"
import {LocationMap} from "./src/components/LocationMap"
import {FlyContextProvider, FlyContext} from "./src/lib/flyContext";

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state, userLogout, userData }) => {
  return (
    <Drawer
      selectedIndex={state.index}
      onSelect={index => {
        if(index.row===9)
          return userLogout();
        return navigation.navigate(state.routeNames[index.row]);
      }}>
      <DrawerItem title='Mi perfil' />
      {userData.isClient && <DrawerItem title='Solicitar reparación' />}
      {userData.isClient && <DrawerItem title='Mis ordenes' />}
      {userData.isClient && <DrawerItem title='Ver propuestas' />}
      {userData.isProfessional && <DrawerItem title='Inicio (Trabajador)' />}
      {userData.isProfessional && <DrawerItem title='Lista de ordenes' />}
      {userData.isProfessional && <DrawerItem title='Perfil (Trabajador)' />}
      {userData.isProfessional && <DrawerItem title='Propuestas de servicio' />}
      {userData.isClient && <DrawerItem title='Pagos' />}
      <DrawerItem title='Logout' />
    </Drawer>
  );
  }

export const DrawerNavigator = () => {
  const {userLogout, userData} = React.useContext(FlyContext);
  return (
    <Navigator drawerContent={props => <DrawerContent {...props} userLogout={userLogout} userData={userData}/>} 
    headerMode="none" animationEnabled={false} initialRouteName={userData.isClient?'ClientOrders':(!userData.experienced?'ProfessionalForm':'ProfessionalHome')}>
      <Screen name="UserForm" component={UserForm} />
      {userData.isClient && <Screen name="ClientHome" component={ClientHome} />}
      {userData.isClient && <Screen name="ClientOrders" component={ClientOrders} />}
      {userData.isClient && <Screen name="ProfessionalSelected" component={ProfessionalSelected} />}
      {userData.isProfessional && <Screen name="ProfessionalHome" component={ProfessionalHome} />}
      {userData.isProfessional && <Screen name="ProfessionalOrders" component={ProfessionalOrders} />}
      {userData.isProfessional && <Screen name="ProfessionalForm" component={ProfessionalForm} />}
      {userData.isProfessional && <Screen name="ServiceAssignment" component={ServiceAssignment} />}
      {userData.isClient && <Screen name="Payment" component={Payment} />}
      <Screen name="LocationMap" component={LocationMap} />
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
