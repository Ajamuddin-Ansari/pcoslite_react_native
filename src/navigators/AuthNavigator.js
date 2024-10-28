/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import strings from '../../lib/appStrings';
import OtpScreen from '../screens/Auth/OtpScreen';
import { dark_pink, white } from '../../lib/colors';
import BMLogin from '../screens/Auth/BMLogin';
import UserLogin from '../screens/Auth/UserLogin';

const Stack = createStackNavigator();
const AuthNavigator = () => {

  return (
    <Stack.Navigator
      initialRouteName={strings.screens.authNavigator.login}
      screenOptions={{
        headerMode: 'screen',

        headerStyle: {
          backgroundColor: dark_pink,
          elevation: 5,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        },
        presentation: 'fullScreenModal',
        headerTintColor: white,
        headerTitleStyle: {
          fontWeight: 'bold',

        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name={strings.screens.authNavigator.userlogin}
        component={UserLogin}
      />
      
      <Stack.Screen
        options={{ headerShown: false }}
        name={strings.screens.authNavigator.bmlogin}
        component={BMLogin}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={strings.screens.authNavigator.otp}
        component={OtpScreen}
      />



    </Stack.Navigator>
  );
};

export default AuthNavigator;
