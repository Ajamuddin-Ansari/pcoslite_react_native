import React, { useState,useEffect } from 'react';
import { View, TextInput, Text, Animated, StyleSheet,TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements'
import { black, grey, grey_Border, grey_border, inputgrey} from '../../lib/colors';
const FloatingLabelInput = ({ label, value,keyboardType, onChangeText,rightIcon,onPress,maxlength, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = new Animated.Value(value ? 1 : 0);

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, labelPosition]);

  
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const labelStyle = {
    position: 'absolute',
    paddingHorizontal:5,
    left: 15,
    
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -30],
     
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 18],
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [grey, black],
    }),
  };

  const handleIconPress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={styles.container}>
   
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        style={styles.input}
        value={value}       
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        secureTextEntry={false}
        onFocus={handleFocus}
        maxlength
        onBlur={handleBlur}
       
        {...props}
      />
        {rightIcon && (
          <TouchableOpacity onPress={handleIconPress} style={{ position: 'absolute', right: 15, top: 18 }}>
            <Icon name={rightIcon} type="material-community" color={'grey'} />
          </TouchableOpacity>
        )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:"100%",
    marginVertical: 15,
    alignSelf:"center",
    backgroundColor:"white",
    borderRadius:10,
  },
  
  input: {
    height:55,
    borderWidth: 1,
    borderRadius:13,
    fontSize: 16,
    paddingVertical: 8,
    color:black,
    paddingLeft:10,
    fontSize:20,
    paddingLeft:15,
    borderColor: grey_Border,
  },

  inputFocused: {
    borderColor: black,
     // Change the border color when focused
    
  },

 iconContainer:{
    right:10,
    top:10,
    position:"absolute"
  }
 
});

export default FloatingLabelInput;
