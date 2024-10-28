import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomTabSwitch from '../../../../components/CustomTabSwitch';
import { green1, white } from '../../../../../lib/colors';
import Veg from './Veg';
import NonVeg from './NonVeg';

const DietPlan = () => {
  const [currentTab, setCurrentTab] = useState('veg'); // State for the current tab

  const handleTabChange = (tab) => {
    setCurrentTab(tab);

  };

  return (
    <View style={styles.container}>
      <CustomTabSwitch onTabChange={handleTabChange} />
      {/* Add conditional rendering based on currentTab */}
      {currentTab === 'veg' ? (
        <View style={styles.tab}>
          <Veg />
        </View>
      ) : (
        <View style={styles.tab}>
          <NonVeg />
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
    flex: 1
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

export default DietPlan;
