import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Rect,
  RadialGradient,
  Stop,
  Defs
} from 'react-native-svg';

export default Background = ({color="white"}) => {
  return (
    <View style={[
      StyleSheet.absoluteFill
    ]}>
      <Svg height="100%" width="100%">
        <Defs>
          <RadialGradient
            id="grad"
            cx="50%"
            cy="65%"
            fx="50%"
            fy="65%"
            rx="400"
            ry="450"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#ffffff" stopOpacity="1" />
            <Stop offset="1" stopColor="#015478" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    </View>
  );
}