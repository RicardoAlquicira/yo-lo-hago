import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Ellipse,
  Line,
  Text
} from 'react-native-svg';

export default Logo = ({color="white"}) => {
  return (
    <View style={{width:"100%", height:100, marginTop:20}} >
      <Svg height="100%" width="100%" viewBox="0 0 450 120">
        <Ellipse cx="50" cy="50" rx="33" ry="29" stroke="black" strokeWidth="4" fill="white" />
        <Ellipse cx="70" cy="80" rx="19" ry="10.5" fill="black" />
        <Ellipse cx="68" cy="43" rx="7.5" ry="10.5" fill="black" />
        <Ellipse cx="70" cy="40" rx="3" ry="5" fill="white" />
        <Line x1="18" y1="52" x2="83" y2="15" stroke="black" strokeWidth="4"/>
        <Line x1="0" y1="100" x2="450" y2="100" stroke={color} strokeWidth="4"/>
        <Line x1="100" y1="10" x2="100" y2="100" stroke={color} strokeWidth="4"/>
        <Text fill={color} fontSize="48" fontWeight="400" x="130" y="70">
          Yo lo hago!!!
        </Text>
      </Svg>
    </View>
  );
}