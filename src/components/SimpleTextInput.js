// CustomInput.js
import React from 'react';
import { Input, Icon } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { black, grey, grey_Border } from '../../lib/colors';

const SimpleTextInput = ({ placeholder, editable, disabled, value, keyboardType, onChangeText, maxLength, secureTextEntry, onPress, leftIcon, rightIcon, containerStyle, inputStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon && <Icon name={leftIcon} type="material-community" onPress={onPress} color={grey} style={styles.rightIcon} />}
      <Input
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        editable={editable}
        placeholderTextColor={grey}
        onChangeText={onChangeText}
        inputContainerStyle={[styles.inputInnerContainer, styles.inputContainer]}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
        //leftIcon={leftIcon && <Icon name={leftIcon.name} type={leftIcon.type} />}
        containerStyle={styles.inputContainer}
        inputStyle={[styles.input, inputStyle]}
      />
      {rightIcon && <Icon name={rightIcon} type="material-community" onPress={onPress} color={grey} style={styles.rightIcon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: grey_Border,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  inputInnerContainer: {
    flex: 1,
    position: "relative",
    borderBottomColor: "white",
  },
  inputContainer: {
    flex: 1,

  },
  input: {
    marginTop: 25,
    fontSize: 15,
    color: black,
    marginLeft: -10
  },

});

export default SimpleTextInput;
