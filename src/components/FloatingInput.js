import React, { useState, useEffect } from 'react';
import { View, TextInput, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { black, grey_Border, inputgrey } from '../../lib/colors';

const FloatingInput = ({ label, value, keyboardType, onChangeText, rightIcon, onPress, maxlength, ...props }) => {
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
    paddingHorizontal: 3,
    left: 5,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -25],

    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 14],
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [inputgrey, inputgrey],
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
        <TouchableOpacity onPress={handleIconPress} style={{ position: 'absolute', right: 15, top: 10 }}>
          <Icon name={rightIcon} type="material-community" color={'grey'} />
        </TouchableOpacity>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '92%',
    marginVertical: 15,
    alignSelf: "center",
    backgroundColor: "white",

  },

  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    paddingVertical: 8,
    paddingLeft: 10,
    color: black,
    borderColor: grey_Border,
  },

  inputFocused: {
    borderColor: black, // Change the border color when focused
  },

  iconContainer: {
    right: 10,
    top: 10,
    position: "absolute"
  }

});

export default FloatingInput;