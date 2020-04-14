import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import Logo from "./Logo"

export const LoginPage = () => {

  const [selectedIndex, setSelectedIndex] = React.useState([
    new IndexPath(0),
    new IndexPath(1),
  ]);

  return (
    <Layout style={styles.container} level='1'>
      <Logo/>
      <Select
        multiSelect={true}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <SelectItem title='Option 1'/>
        <SelectItem title='Option 2'/>
        <SelectItem title='Option 3'/>
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255,255,0,0)"
  }
});

