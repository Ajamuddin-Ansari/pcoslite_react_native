import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { black, dark_pink, grey, grey3, grey_Border, white } from '../../../../lib/colors'
import CustomText from '../../../components/CustomText'
import CustomImage from '../../../components/CustomImage'
import { useFocusEffect } from '@react-navigation/native';
import appStrings from '../../../../lib/appStrings'
import { navigationRef } from '../../../../lib/RootNavigation'
import { ScrollView } from 'react-native-gesture-handler'

const PatientHome = () => {

  useFocusEffect(
    React.useCallback(() => {

      return () => false;
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5, marginHorizontal: 20 }}>
          <CustomText style={{ fontSize: 26, color: grey3 }}>Let’s start your journey,</CustomText>

        </View>

        <View style={styles.listItem}>
          <TouchableOpacity activeOpacity={0.7}
            onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.weightScreen)}>
            <View style={{ flexDirection: "row", left: 5 }}>
              <View style={{ backgroundColor: "#332874", height: 120, width: 78, top: -10 }}>
                <View style={{ alignSelf: 'center', top: 10 }}>
                  <CustomImage
                    source={require('../../../../assets/user/w1.png')}
                    resizeMode="contain"
                    style={{ width: 135, height: 140, alignSelf: 'center' }}
                  />
                </View>

              </View>

              <View style={{ left: "25%", width: "70%" }}>
                <CustomText style={styles.title}> Weight {'\n'} Management</CustomText>
                <CustomText style={styles.subtitle}>Here is where you update your weight and add a weekly report.</CustomText>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.listItem}>
          <TouchableOpacity activeOpacity={0.7}
            onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.exercise)}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "65%", left: -10 }}>
                <CustomText style={styles.title}> Daily {'\n'} Exercises</CustomText>
                <CustomText style={styles.subtitle}>Here is where you update the daily workout plan to help in weight loss.</CustomText>
              </View>
              <View style={{ backgroundColor: "#F53677", height: 120, width: 78, left: 25, top: -10 }}>
                <View style={{ alignSelf: 'center', left: -5, top: 10 }}>
                  <CustomImage
                    source={require('../../../../assets/user/e1.png')}
                    resizeMode="contain"
                    style={{ width: 120, height: 140, alignSelf: 'center' }}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.listItem}>
          <TouchableOpacity activeOpacity={0.7}
            onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.dietPlan)}
          >
            <View style={{ flexDirection: "row", left: -10 }}>
              <View style={{ backgroundColor: "#EE940E", height: 90, width: 78, top: -10 }}>
                <View style={{ top: 35, alignSelf: 'center' }}>
                  <CustomImage
                    source={require('../../../../assets/user/d1.png')}
                    resizeMode="contain"
                    style={{ width: 100, height: 100, alignSelf: 'center' }}
                  />
                </View>
              </View>
              <View style={{ left: "35%", width: "60%" }}>
                <CustomText style={styles.title}> Diet Plan</CustomText>
                <CustomText style={styles.subtitle}>Here is where you update the diet plan daily.</CustomText>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.listItem}>
          <TouchableOpacity activeOpacity={0.7}
            onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.calorie)}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "65%", left: -10 }}>
                <CustomText style={styles.title}> Calories Counter</CustomText>
                <CustomText style={styles.subtitle}>Here is a demonstration of the Calories Counter.</CustomText>
              </View>
              <View style={{ backgroundColor: "#14AAFF", height: 90, width: 78, left: 25, top: -10 }}>
                <View style={{ alignSelf: 'center', left: -5, top: 40 }}>
                  <CustomImage
                    source={require('../../../../assets/user/c1.png')}
                    resizeMode="contain"
                    style={{ width: 100, height: 100, alignSelf: 'center' }}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.listItem}>
          <TouchableOpacity activeOpacity={0.7}
            onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.pcoslite)}
          >
            <View style={{ flexDirection: "row", left: -10 }}>
              <View style={{ backgroundColor: "#A6AFFF", height: 100, width: 78, top: -10 }}>
                <View style={{ top: 35, alignSelf: 'center' }}>
                  <CustomImage
                    source={require('../../../../assets/user/diet/day1/6.png')}
                    resizeMode="contain"
                    style={{ width: 100, height: 100, alignSelf: 'center' }}
                  />
                </View>
              </View>
              <View style={{ left: "35%", width: "60%" }}>
                <CustomText style={styles.title}> PCOSLite</CustomText>
                <CustomText style={styles.subtitle}>Here is how to properly take PCOSLite.</CustomText>
              </View>
            </View>
          </TouchableOpacity>
        </View>


        <View style={styles.listItem}>
          <TouchableOpacity activeOpacity={0.7}
            onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.notes)}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "65%", left: -7 }}>
                <CustomText style={styles.title}>Nutritionist's  Notes</CustomText>
                <CustomText style={{ color: grey }}>Here is the correct way to eat.</CustomText>
              </View>
              <View style={{ backgroundColor: "#5AFF88", height: 100, width: 78, left: 25, top: -10 }}>
                <View style={{ alignSelf: 'center', left: -5, top: 35 }}>
                  <CustomImage
                    source={require('../../../../assets/nutritionnotes.png')}
                    resizeMode="contain"
                    style={{ width: 92, height: 106, alignSelf: 'center' }}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: "30%" }}></View>
      </ScrollView>

      {/* <View>
       <FlatList
          data={listData}
          renderItem={RenderHomeList}
          keyExtractor={(item) => item.id}
        />
      </View> */}
    </SafeAreaView>
  )
}

export default PatientHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white

  },
  buttonStyle: {
    width: '50%',
    paddingVertical: 12,
    //height: '40%',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: dark_pink,
  },
  listItem: {
    padding: 10,
    shadowColor: black,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.65,
    elevation: 6,
    backgroundColor: white,
    width: "96%",
    height: 155,
    borderRadius: 15,
    //flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 15,
    marginTop: 15
  },

  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    top: 3,
    right: "60%",
    position: "absolute"
  },
  title: {
    fontSize: 24,
    fontWeight: "700"
  },
  subtitle: {
    color: grey,
    marginLeft: 5,
    fontSize: 15,
    marginTop: 3

  }
})