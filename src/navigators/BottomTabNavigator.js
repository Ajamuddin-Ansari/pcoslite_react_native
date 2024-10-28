import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import { getPathDown } from "../components/curve";
import { Svg, Path } from "react-native-svg";
import { scale } from "react-native-size-scaling";
import Profile from "../screens/User/BM/Profile/Profile";
import HomeScreen from "../screens/User/BM/HomeScreen";
import CreateCamp from "../screens/User/BM/CreateCamp";
import HomeSvg from '../../assets/Home.svg';
//import PlusSvg from '../../assets/Plus.svg';
import ProfileSvg from '../../assets/Profile.svg';
import { black, green1, white } from "../../lib/colors";
import { Icon } from "react-native-elements";
import appStrings from "../../lib/appStrings";
import CustomText from "../components/CustomText";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  const [maxWidth, setMaxWidth] = useState(Dimensions.get("window").width);
  const returnpathDown = getPathDown(maxWidth, 60, 50);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          position: "absolute",
          elevation: 0,

        },
        headerStyle: {
          backgroundColor: white,
          elevation: 5,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,

        },
        tabBarActiveTintColor: white,
        tabBarInactiveTintColor: '#696969'
      }}
    >
      <Tab.Screen
        name={appStrings.screens.tabNavigator.homescreen}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: "black",
          },
          tabBarIcon: ({ color }) => (

            <Svg width={36} height={36} color={color} style={{ tintColor: black, left: 2 }}>
              <HomeSvg color={color} />
            </Svg>
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, paddingBottom: 3 }}>Home</Text>
          ),
        }}
      />
      <Tab.Screen
        name={appStrings.screens.tabNavigator.create_camp}
        component={CreateCamp}
        options={{
          headerShown: true,
          unmountOnBlur: false,

          tabBarItemStyle: {
            margin: 0,
            zIndex: -50,
          },
          tabBarIcon: () => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 56,
                width: 56,
                top: 5,
                backgroundColor: green1,
                borderRadius: 35,
              }}
            >

              <CustomText style={{ fontSize: 14, color: white, fontWeight: "bold", textAlign: "center" }}>Create Camp</CustomText>
            </View>
          ),

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginLeft: 10 }}
            >
              <Icon name='arrow-left' type="material-community" color={black} size={25} />

            </TouchableOpacity>
          ),


          tabBarLabel: () => (
            <View>
              <Svg width={maxWidth} height={scale(60)}>
                <Path fill={"black"} {...{ d: returnpathDown }} />
              </Svg>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={appStrings.screens.tabNavigator.profile}
        component={Profile}
        options={{
          headerShown: true,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: "black",
          },

          tabBarIcon: ({ color }) => (

            <Svg width={36} height={36} style={{ tintColor: black }}>
              <ProfileSvg color={color} />
            </Svg>
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, paddingBottom: 3 }}>Profile</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;