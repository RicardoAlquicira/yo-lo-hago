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
import {ServiceAssignment} from "./src/components/ServiceAssignment"
import {Payment} from "./src/components/Payment"
import {FlyContextProvider, FlyContext} from "./src/lib/flyContext";

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => {
  const {userLogout} = React.useContext(FlyContext);
  return (
    <Drawer
      selectedIndex={state.index}
      onSelect={index => {
        if(state.routeNames.length===index.row)
          return userLogout();
        return navigation.navigate(state.routeNames[index.row]);
      }}>
      <DrawerItem title='UserForm' />
      <DrawerItem title='ClientHome' />
      <DrawerItem title='ProfessionalSelected' />
      <DrawerItem title='ProfessionalHome' />
      <DrawerItem title='ServiceAssignment' />
      <DrawerItem title='Payment' />
      <DrawerItem title='Logout' />
    </Drawer>
  );
  }

export const DrawerNavigator = () => (
  <Navigator drawerContent={props => <DrawerContent {...props}/>} 
  headerMode="none" animationEnabled={false} initialRouteName="UserForm">
    <Screen name="UserForm" component={UserForm} />
    <Screen name="ClientHome" component={ClientHome} />
    <Screen name="ProfessionalSelected" component={ProfessionalSelected} />
    <Screen name="ProfessionalHome" component={ProfessionalHome} />
    <Screen name="ServiceAssignment" component={ServiceAssignment} />
    <Screen name="Payment" component={Payment} />
  </Navigator>
);

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
