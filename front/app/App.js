/**
 * Yo lo hago APP
 */

import React from 'react';
import {
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {LoginPage} from "./src/components/LoginPage"
import {UserForm} from "./src/components/UserForm"
import Background from "./src/components/Background"

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={eva.light}>
      <Background/>
      <UserForm/>
    </ApplicationProvider>
  </>
);
