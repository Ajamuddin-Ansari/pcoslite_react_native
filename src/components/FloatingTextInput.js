import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const FloatingTextInput = ({ label, value, keyboardType, onChangeText, rightIcon, onPress, textStyle, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = new Animated.Value(value ? 1 : 0);

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, labelPosition]);

  const handleIconPress = () => {
    if (onPress) {
      onPress();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };



  const labelStyle = {
    position: 'absolute',
    left: 5,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -15],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', 'grey'],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        style={styles.input}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        textStyle={textStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {rightIcon && (
        <TouchableOpacity onPress={handleIconPress} style={{ position: 'absolute', right: 10, top: 8 }}>
          <Icon name={rightIcon} type="material-community" color={'grey'} />
        </TouchableOpacity>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 10,
    alignSelf: "center"
  },

  input: {
    borderBottomWidth: 1,
    padding: 5,
    fontSize: 16,
    paddingVertical: 8,
    paddingBottom: -5,
    color: "black",

  },

});

export default FloatingTextInput;
