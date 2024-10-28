import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { black, grey, grey_Border, light_grey, primary } from "../../lib/colors";


const screenWidth = Dimensions.get("screen").width;
const DateTextView = ({ date, text, vStyle, onPress, iconSize, icon }) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[styles.viewStyle, vStyle]}
      >
        <Icon
          style={styles.iconStyle}
          name={icon ? icon : "clock-outline"}
          color={grey}
          size={iconSize ? iconSize : 20}
        ></Icon>
        <View>
          <Text style={styles.textStyle}>{text}</Text>
          <Text style={styles.dateStyle}>
            {date}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: grey,
    borderWidth: 1,
    justifyContent: "center",
  },
  iconStyle: {
    marginEnd: 5,
  },
  textStyle: {
    fontSize: 12,
    opacity: 0.5,
    color: "#000",
    fontWeight: "bold"
  },
  dateStyle: {
    fontSize: 12,
    color: black,
    fontWeight: "bold"
  },
});

export default DateTextView;
