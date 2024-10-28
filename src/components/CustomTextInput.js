import React from 'react';
import { Input, Icon } from 'react-native-elements';
import { View, StyleSheet, Text } from 'react-native';
import { grey, grey_Border } from '../../lib/colors';

const CustomTextInput = ({ leftIcon, placeholder, prefix, rightIcon, value, containerStyle, color, InputStyle, inputText, onChangeText, ...props }) => {

    return (
        <View style={[styles.container, containerStyle]}>
            {leftIcon && <Icon name={leftIcon} type="font-awesome" color={color} style={styles.icon} />}

            {prefix && <Text style={{ fontSize: 16 }}> {prefix}</Text>}
            <Input
                containerStyle={styles.inputContainer}
                inputContainerStyle={[styles.inputInnerContainer, InputStyle]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                leftIcon={null}
                rightIcon={null}
                leftIconContainerStyle={styles.iconContainer}
                rightIconContainerStyle={styles.iconContainer}
                inputStyle={styles.inputText}

                {...props}
            />

            {rightIcon && <Icon name={rightIcon} type="font-awesome" color={grey} style={styles.icon} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        marginHorizontal: 10,
        padding: 5,
        borderColor: grey_Border,
        width: '100%',
        height: 55,
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    inputContainer: {
        flex: 1,
        borderBottomWidth: 0,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    inputInnerContainer: {
        flex: 1,
        position: "relative",
        borderBottomColor: "white",
    },
    iconContainer: {
        marginHorizontal: 5,
    },
    icon: {
        marginRight: 10,
        color: grey,
    },
    inputText: {
        alignSelf: "center",
        top: "3%",
        fontSize: 16,
        color: grey,
    },
});

export default CustomTextInput;
