/* eslint-disable prettier/prettier */
import React from 'react';
import { Text } from 'react-native-elements';

const CustomText = ({ children, style, ...rest }) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Text style={[{ fontSize: 16 }, style]} {...rest}>
      {children}
    </Text>
  );
};

export default CustomText;
