import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { green1, grey_bg, white } from '../../lib/colors';
import CustomImage from './CustomImage';

const CustomTabSwitch = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState('veg');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'veg' ? styles.selectedTab : styles.unselectedTab,
        ]}
        onPress={() => handleTabChange('veg')}
      >
        <CustomImage
          source={require('../../assets/user/veg.png')}
          resizeMode="contain"
          style={{ width: 45, height: 25, alignSelf: 'center' }}
        />
        <Text style={styles.tabText}>Veg</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'nonveg' ? styles.selectedTab : styles.unselectedTab,
        ]}
        onPress={() => handleTabChange('nonveg')}
      >
        <View>
          <CustomImage
            source={require('../../assets/user/nonveg2.png')}
            resizeMode="contain"
            style={{ width: 50, height: 40, alignSelf: 'center' }}
          />
        </View>

        <Text style={styles.tabText}>Non-Veg</Text>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: grey_bg,
    borderRadius: 20,
    padding: 2,
    margin: 10,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 25,
    paddingVertical: 2,
    borderRadius: 20,
  },
  selectedTab: {
    backgroundColor: green1,
    borderRadius: 20,
  },
  unselectedTab: {
    backgroundColor: grey_bg,
    borderRadius: 20,
  },
  tabText: {
    color: white,
  },
});

export default CustomTabSwitch;
