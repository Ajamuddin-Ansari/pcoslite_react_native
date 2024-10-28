/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import strings from '../../lib/appStrings';
import { StatusBar, TouchableOpacity } from 'react-native';
import AuthNavigator from './AuthNavigator';
import Splash from '../screens/Splash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { black, dark_pink, white } from '../../lib/colors';
import DrawerModal from '../components/DrawerModal';
import appStrings from '../../lib/appStrings';
import BottomTabNavigator from './BottomTabNavigator';
import AddPatient from '../screens/User/BM/AddPatient';
import PatientDetails from '../screens/User/BM/PatientDetails';
import ViewProfile from '../screens/User/BM/Profile/ViewProfile';
import ContactUs from '../screens/User/BM/Profile/ContactUs';
import PrivacyPolicy from '../screens/User/BM/Profile/PrivacyPolicy';
import TermsCondition from '../screens/User/BM/Profile/TermsCondition';
import AboutUs from '../screens/User/BM/Profile/AboutUs';
import AddWeight from '../screens/User/Home/Weight/AddWeight';
import UpdateWeight from '../screens/User/Home/Weight/UpdateWeight';
import DietPlan from '../screens/User/Home/Diet/DietPlan';
import VegDiet from '../screens/User/Home/Diet/VegDiet';
import NonVegDiet from '../screens/User/Home/Diet/NonVegDiet';
import Exercise from '../screens/User/Home/Exercise/Exercise';
import AsyncStorage from '../components/AsyncStorage';
import AsyncStorageKeys from '../../lib/AsyncStorageKeys';
import EditCamp from '../screens/User/BM/EditCamp';
import Profile from '../screens/User/UserProfile/Profile';
import WeightManagement from '../screens/User/Home/Weight/WeightManagement';
import CalorieCounter from '../screens/User/CalorieCounter/CalorieCounter';
import AddBodyDetails from '../screens/User/Home/Weight/AddBodyDetails';
import VegCalorie from '../screens/User/CalorieCounter/VegCalorie';
import UserBottomTabNavigator from './UserBottomTabNavigator';
import ExerciseSteps from '../screens/User/Home/Exercise/ExerciseSteps';
import CompletedCamp from '../screens/User/BM/CompletedCamp';
import UpdateBodyDetails from '../screens/User/Home/Weight/UpdateBodyDetails';
import AddSnack from '../screens/User/Diary/AddSnack';
import MyProfile from '../screens/User/UserProfile/MyProfile';
import PcosLite from '../screens/User/Home/Pcoslite/PcosLite';
import Notes from '../screens/User/Home/Notes/Notes';

const Stack = createStackNavigator();
const RootNavigator = () => {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
   
    const toggleDrawer = () => {
        setIsDrawerVisible(!isDrawerVisible);
    };

    const closeDrawer = () => {

        setIsDrawerVisible(false);
    };


    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

            <Stack.Navigator
                screenOptions={{
                    headerShown: true,
                    headerMode: 'screen',
                    // headerStatusBarHeight: top,

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
                }}
            >
                <Stack.Screen
                    name={appStrings.screens.appStrings.splash}
                    component={Splash}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={strings.screens.navigators.authNavigator}
                    component={AuthNavigator}
                />

                <Stack.Screen
                    options={{ headerShown: false }}
                    name={strings.screens.navigators.bottomTabNavigator}
                    component={BottomTabNavigator}
                />

                <Stack.Screen
                    options={{ headerShown: false }}
                    name={strings.screens.navigators.userbottomTabNavigator}
                    component={UserBottomTabNavigator}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.weightScreen}
                    component={WeightManagement}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.addWeight}
                    component={AddWeight}
                /> 

                 <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.updateweight}
                    component={UpdateWeight}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.updatebodydetails}
                    component={UpdateBodyDetails}
                />
                  <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.bodydetails}
                    component={AddBodyDetails}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.addsnack}
                    component={AddSnack}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.dietPlan}
                    component={DietPlan}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.vegDiet}
                    component={VegDiet}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.nonvegDiet}
                    component={NonVegDiet}
                />
                

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.calorie}
                    component={CalorieCounter}
                />

               <Stack.Screen
                  
                    name={strings.screens.appStrings.vegCalorie}
                    component={VegCalorie}
                    options={({ route }) => ({ 
                        title: route.params.productTitle, 
                        headerShown: true 
                    })} 
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.exercise}
                    component={Exercise}
                />
                <Stack.Screen
                   
                    name={strings.screens.appStrings.exerciseStep}
                    component={ExerciseSteps}
                    options={({ route }) => ({ 
                        title: route.params.productTitle, 
                        headerShown: true 
                    })}
                />

                 <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.pcoslite}
                    component={PcosLite}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.notes}
                    component={Notes}
                />

                <Stack.Screen
                    options={{ 
                        headerShown: true,
                        headerTitle:"Profile Details"

                    }}
                    
                    name={strings.screens.appStrings.myProfile}
                    component={MyProfile}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.patientDetails}
                    component={PatientDetails}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.addPatient}
                    component={AddPatient}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.edit_camp}
                    component={EditCamp}
                />

                <Stack.Screen
                    options={{ 
                        headerShown: true,
                         
                    }}
                    name={strings.screens.appStrings.viewProfile}
                    component={ViewProfile}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.aboutUs}
                    component={AboutUs}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.terms}
                    component={TermsCondition}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.privacy_policy}
                    component={PrivacyPolicy}
                />

                <Stack.Screen
                    options={{ headerShown: true }}
                    name={strings.screens.appStrings.contactUS}
                    component={ContactUs}
                />

                <Stack.Screen
                    options={{ 
                        headerShown: true
                    }}
                    name={strings.screens.appStrings.userProfile}
                    component={Profile}
                />

                <Stack.Screen
                    options={{ 
                        headerShown: true
                    }}
                    name={strings.screens.appStrings.completed}
                    component={CompletedCamp}
                />
           
            </Stack.Navigator>
            {isDrawerVisible && (
                <DrawerModal isVisible={isDrawerVisible} onRequestClose={closeDrawer} onClose={toggleDrawer} />
            )}
        </SafeAreaProvider>
    );
};

export default RootNavigator;
