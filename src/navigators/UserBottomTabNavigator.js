import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity } from "react-native";
import HomeSvg from '../../assets/Home.svg';
import DiarySvg from '../../assets/user/diary.svg'
import ProfileSvg from '../../assets/Profile.svg';
import { black, grey, white } from "../../lib/colors";
import { Icon } from "react-native-elements";
import appStrings from "../../lib/appStrings";
import Diary from "../screens/User/Diary/Diary";
import PatientHome from "../screens/User/Home/PatientHome";
import Profile from "../screens/User/UserProfile/Profile";

const Tab = createBottomTabNavigator();

const UserBottomTabNavigator = ({ navigation }) => {

  return (
    <>

      <Tab.Navigator
        initialRouteName={appStrings.screens.patienttabNavigator.patienthome}

        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: white,
            elevation: 5,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,

          },
          presentation: 'fullScreenModal',
          headerTintColor: black,
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          tabBarActiveTintColor: white,
          tabBarInactiveTintColor: grey,

          tabBarActiveBackgroundColor: black,
          tabBarInactiveBackgroundColor: black,
          tabBarLabelStyle: {
            marginBottom: 8,
            fontSize: 16, fontWeight: "400"
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            backgroundColor: white,
            elevation: 5,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          },
        }}
      >
        <Tab.Screen
          name={appStrings.screens.patienttabNavigator.patienthome}
          component={PatientHome}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',

            tabBarIcon: ({ color, size }) => (
              <HomeSvg color={color} height={26} width={26} style={{ top: 2 }} />
            ),

          }}
        />

        {/* <Tab.Screen
          name={appStrings.screens.patienttabNavigator.diary}
          component={Diary}
          options={{
            headerShown: true,

            tabBarLabel: 'Diary',

            tabBarIcon: ({ color }) => (
              <View>
                <DiarySvg color={color} height={26} width={26} style={{ top: 2 }} />
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
          }}
        /> */}

        <Tab.Screen
          name={appStrings.screens.patienttabNavigator.profile}
          component={Profile}
          options={{
            headerShown: true,
            tabBarLabel: 'Profile',

            tabBarIcon: ({ color }) => (
              <View>
                <ProfileSvg color={color} height={26} width={28} />

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
          }}
        />

      </Tab.Navigator>

    </>
  );
};
export default UserBottomTabNavigator