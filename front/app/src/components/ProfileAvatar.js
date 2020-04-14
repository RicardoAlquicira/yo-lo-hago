import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from '@ui-kitten/components';

export default ProfileAvatar = (props) => {

  const renderEditButtonElement = () => {
    const buttonElement = props.editButton();

    return React.cloneElement(buttonElement, {
      style: [buttonElement.props.style, styles.editButton],
    });
  };

  const { style, editButton, ...restProps } = props;

  return (
    <View style={style}>
      <Avatar
        style={[style, styles.avatar]}
        {...restProps}
      />
      {editButton && renderEditButtonElement()}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    top: 10
  },
  editButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
  },
});

