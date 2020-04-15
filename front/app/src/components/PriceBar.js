import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Rect,
  Stop
} from 'react-native-svg';

export default PriceBar = ({progress=0.0}) => {
  return (
    <View style={[
      StyleSheet.absoluteFill,
      { height:14, width:"75%", marginLeft:60, marginTop:4 },
    ]}>
      <Svg height={14} width="100%">
        <Defs>
          <LinearGradient id="grad" x1="0" y1="2" x2="1" y2="2">
            <Stop offset="-3%" stopColor="rgb(129, 211, 248)" stopOpacity="1" />
            <Stop offset="51%" stopColor="rgb(2, 125, 180)" stopOpacity="1" />
            <Stop offset="100%" stopColor="rgb(99, 0, 191)" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="3" width="100%" height="8" fill="url(#grad)" />
        <Rect x={`${progress*100}%`} y="0" width="7" height="14" stroke="gray" fill="white" />
      </Svg>
    </View>
  );
}