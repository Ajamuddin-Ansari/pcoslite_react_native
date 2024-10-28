/* eslint-disable prettier/prettier */
import React from 'react';
import { Image } from 'react-native-elements';

const CustomImage = ({ source, style,resizeMode, ...rest }) => {
  return <Image 
  resizeMode={resizeMode}
  source={source} 
  style={[{ borderRadius: 8}, style]} {...rest} />;
};

export default CustomImage;
