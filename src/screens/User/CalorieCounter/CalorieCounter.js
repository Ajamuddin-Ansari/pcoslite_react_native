import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Cveg from './Cveg';
import Cnonveg from './Cnonveg';
import Other from './Other';
import CalorieTabswitch from '../../../components/CalorieTabswitch';
import { green1, white } from '../../../../lib/colors';

const CalorieCounter = () => {
  const [currentTab, setCurrentTab] = useState('veg'); // State for the current tab

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <View style={styles.container}>
      <CalorieTabswitch onTabChange={handleTabChange} />
      {/* Add conditional rendering based on currentTab */}
      {currentTab === 'veg' ? (
        <View style={styles.tab}>
          <Cveg />
        </View>
      ) : currentTab === 'nonveg' ? (
        <View style={styles.tab}>
          <Cnonveg />
        </View>
      ) : (
        <View style={styles.tab}>
          <Other />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 10,
  },
  tab: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: green1,
    fontSize: 18,
  },
});

export default CalorieCounter;
