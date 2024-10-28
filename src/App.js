/* eslint-disable prettier/prettier */
import { StatusBar,Alert} from 'react-native';
import React,{useEffect,useState} from 'react';
import RootNavigator from './navigators/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../lib/RootNavigation';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const subscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);

    });

    return () => {
      subscription();
    }
  }, []);

  useEffect(() => {
    if (isOffline) {
      showAlert();
    }
  }, [isOffline]);
  
  const showAlert = () => {
    Alert.alert(
      '',
      'Please check your internet connection!',
      [{ text: 'OK' }],
      { cancelable: false }
    );
  };

  return (
    <>
     <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <NavigationContainer ref={navigationRef}> 
         <RootNavigator />
      </NavigationContainer>   
    </>
  );
};

export default () => {
  return ( 
      <App />      
  );
};




