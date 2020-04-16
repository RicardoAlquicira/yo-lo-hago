import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Rect,
  LinearGradient,
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
          <LinearGradient
            id="grad"
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#015478" stopOpacity="0.18" />
            <Stop offset="0.8" stopColor="#ffffff" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    </View>
  );
}