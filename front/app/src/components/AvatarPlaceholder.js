import React from 'react';
import { View } from 'react-native';
import Svg, {
  Defs, Mask, Rect, Circle, Ellipse
} from 'react-native-svg';

export const AvatarPlaceholder = (style) => {
  return (
    <View {...style} >
      <Svg height="100%" width="100%" viewBox="0 0 200 200">
        <Defs>
          <Mask id="border">
            <Circle r="95" cx="100" cy="100" stroke="white" strokeWidth="20"/>
            <Circle r="45" cx="100" cy="70" stroke="white" strokeWidth="10"/>
          </Mask>
          <Mask id="hole">
            <Rect width="100%" height="100%" fill="white"/>
            <Circle r="45" cx="100" cy="70" fill="black"/>
            <Ellipse
              cx="100"
              cy="145"
              rx="60"
              ry="50"
              fill="black"
            />
          </Mask>
        </Defs>
        <Circle r="100" cx="100" cy="100" mask="url(#hole)" fill="rgba(1,84,120,18)"/>
        <Circle r="100" cx="100" cy="100" mask="url(#border)" fill="rgba(1,84,120,18)"/>
      </Svg>
    </View>
  );
}