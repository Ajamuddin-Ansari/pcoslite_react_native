import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { black, dark_pink, grey_Border, white } from '../../lib/colors';

const CustomTabWeight = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState('WeightTracker');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'WeightTracker' ? styles.selectedTab : styles.unselectedTab,
        ]}
        onPress={() => handleTabChange('WeightTracker')}
      >
        <Text style={{ color: selectedTab === 'WeightTracker' ? white : black }}>Weight Tracker</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'BodyTracker' ? styles.selectedTab : styles.unselectedTab,
        ]}
        onPress={() => handleTabChange('BodyTracker')}
      >
        <Text style={{ color: selectedTab === 'BodyTracker' ? white : black }}>Body Tracker</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: grey_Border,
    borderRadius: 20,
    padding: 2,
    margin: 5,
    width: "80%",
    alignSelf: "center"
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  selectedTab: {
    backgroundColor: dark_pink,
    borderRadius: 20,
  },
  unselectedTab: {
    backgroundColor: grey_Border,
    borderRadius: 20,
  },
  tabText: {
    color: white,
  },
});

export default CustomTabWeight;
