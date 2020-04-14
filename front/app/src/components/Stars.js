import React from 'react';
import { View } from 'react-native';
import Svg, {
  Use,
  Defs,
  G,
  Path,
  ClipPath,
  Rect
} from 'react-native-svg';

const baseColor = "#027DB4";

export default Stars = ({progress=0.0, style}) => {
  return (
    <View style={style}>
      <Svg height={50} width={210}>
        <Defs>
        <Path d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118l11.547-1.2L16.026,0.6L20.388,10.918z"
        id="fill-star"/>
          <G id="star">
            <Path d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118l11.547-1.2L16.026,0.6L20.388,10.918z"
              fill="transparent" stroke={baseColor} strokeWidth="3" strokeLinejoin="round"/>
          </G>
        </Defs>
        <ClipPath id="filledStar">
          {[...Array(5).keys()].map(val=>
            <Use href="#fill-star" x={(val*40+10).toString()} y="0" fillRule="nonzero" key={val}/>
          )}
        </ClipPath>
        <Rect clipPath="url(#filledStar)" width={200*progress} height="50" x="8" fill={baseColor} />
        {[...Array(5).keys()].map(val=>
          <Use href="#star" x={(val*40+10).toString()} y="0" key={val}/>
        )}
      </Svg>
    </View>
  );
}