/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Button } from 'react-native-elements';

const CustomButton = ({ title, onPress, buttonStyle, titleStyle, icon,iconPosition }) => {
  return (
    <Button
      title={title}
      onPress={onPress}
      buttonStyle={[{  borderRadius: 13 }, buttonStyle]}
      titleStyle={[{ fontSize: 24 }, titleStyle]}
      icon={icon}
      iconPosition={iconPosition}
    />
   
  );
};

export default CustomButton;
