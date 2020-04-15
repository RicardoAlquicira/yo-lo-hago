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
import {ClientHome} from "./src/components/ClientHome"
import {ProfessionalSelected} from "./src/components/ProfessionalSelected"
import {ProfessionalHome} from "./src/components/ProfessionalHome"
import {ServiceAssignment} from "./src/components/ServiceAssignment"
import {Payment} from "./src/components/Payment"
import Background from "./src/components/Background"

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={eva.light}>
      <Background/>
      <Payment/>
    </ApplicationProvider>
  </>
);
