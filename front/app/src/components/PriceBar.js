import React from 'react';
import { View } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Rect,
  Stop
} from 'react-native-svg';

export default PriceBar = ({progress=0.0}) => {
  return (
    <View style={{marginTop:10, marginRight:15}}>
      <Svg height={8} width={250}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="-3%" stopColor="rgb(129, 211, 248)" stopOpacity="1" />
            <Stop offset="51%" stopColor="rgb(2, 125, 180)" stopOpacity="1" />
            <Stop offset="100%" stopColor="rgb(99, 0, 191)" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="250" height="8" fill="url(#grad)" />
      </Svg>
    </View>
  );
}