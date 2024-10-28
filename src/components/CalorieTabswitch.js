import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { green1, grey_bg, white } from '../../lib/colors';
import CustomImage from './CustomImage';

const CalorieTabswitch = ({ onTabChange }) => {
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
        {
          selectedTab === 'veg' ?
            (
              <View style={{ marginLeft: -10 }}>
                <CustomImage
                  source={require('../../assets/user/veg.png')}
                  resizeMode="contain"
                  style={{ width: 50, height: 30, alignSelf: 'center' }}
                />
              </View>

            ) : null
        }

        <Text style={styles.tabText}>Veg</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'nonveg' ? styles.selectedTab : styles.unselectedTab,
        ]}
        onPress={() => handleTabChange('nonveg')}
      >
        {
          selectedTab === 'nonveg' ?
            (
              <View style={{ marginLeft: -10 }}>
                <CustomImage
                  source={require('../../assets/user/nonveg2.png')}
                  resizeMode="contain"
                  style={{ width: 50, height: 30, alignSelf: 'center' }}
                />
              </View>

            ) : null
        }
        <Text style={styles.tabText}>Non-Veg</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'other' ? styles.selectedTab : styles.unselectedTab,
        ]}
        onPress={() => handleTabChange('other')}
      >
        {
          selectedTab === 'other' ?
            (
              <View style={{ marginLeft: -10 }}>
                <CustomImage
                  source={require('../../assets/user/other.png')}
                  resizeMode="contain"
                  style={{ width: 50, height: 30, alignSelf: 'center' }}
                />
              </View>

            ) : null
        }
        <Text style={styles.tabText}>Other</Text>
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
    paddingVertical: 7,
    borderRadius: 20,

  },
  selectedTab: {
    backgroundColor: green1,
    borderRadius: 20,
  },
  unselectedTab: {
    backgroundColor: grey_bg,
    borderRadius: 20,
    height: 45
  },
  tabText: {
    color: white,
    fontSize: 15
  },
});

export default CalorieTabswitch;
