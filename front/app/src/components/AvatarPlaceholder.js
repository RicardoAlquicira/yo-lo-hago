import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Defs, Mask, Rect, Circle, Ellipse
} from 'react-native-svg';
import { Icon, Button } from '@ui-kitten/components';

const PlusIcon = (style) => (
  <Icon {...style} name='plus'/>
);
const RenderPhotoButton = () => (
  <Button
    style={styles.editAvatarButton}
    size='small'
    accessoryRight={PlusIcon}
    onPress={()=>{
      console.log("upload picture");
    }}
  />
);

export const AvatarPlaceholder = ({style, uploadButton}) => {
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
      {uploadButton && <RenderPhotoButton/>}
    </View>
  );
}
const styles = StyleSheet.create({
  editAvatarButton: {
    ...StyleSheet.absoluteFill,
    width: 32,
    height: 32,
    borderRadius: 16,
    top:60,
    left:60
  }
});