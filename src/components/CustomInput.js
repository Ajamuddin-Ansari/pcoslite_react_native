import React, { useState } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { Input } from 'react-native-elements';

const CustomInput = () => {
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.prefixContainer}>
                    <Text style={styles.prefixText}>+91</Text>
                </View>
                <Input
                    placeholder="Enter your phone number"
                    inputContainerStyle={[styles.inputInnerContainer]}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    containerStyle={styles.input}
                    keyboardType="phone-pad"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 5,
        width: '80%',
    },
    inputInnerContainer: {
        flex:1,
        position:"relative",
        borderBottomColor:"white"
       },
    prefixContainer: {
        paddingHorizontal: 10,
    },
    prefixText: {
        fontSize: 16,
        color: '#000',
    },
    input: {
        flex: 1,
    },
});

export default CustomInput;
