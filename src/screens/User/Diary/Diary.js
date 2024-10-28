import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '../../../components/AsyncStorage';
import AsyncStorageKeys from '../../../../lib/AsyncStorageKeys';
import appStrings from '../../../../lib/appStrings';
import UserAxios from '../../../components/WsHelper/UserAxios';
import CustomText from '../../../components/CustomText';
import { black, grey, grey1, white } from '../../../../lib/colors';
import CustomImage from '../../../components/CustomImage';
import Loader from '../../../components/Loader';
import { navigationRef } from '../../../../lib/RootNavigation';

const Diary = () => {
  const [list, setList] = useState([]);
  const [showProgress, setShowProgress] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      SnackList();

      return () => false;
    }, [])
  );

  const SnackList = async () => {

    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patient_id = JSON.parse(id) || [];
    console.log('patient_id', patient_id);

    setShowProgress(true);
    let inputParams = {};

    UserAxios.getResponse(
      `${appStrings.screens.api_names.snack_list}${patient_id}`,
      inputParams,
      "get",
      (response, error) => {
        if (!error) {
          if (!response.error) {
            console.log("response", response);
            setList(response.snacks)

          } else {
            console.log("Error", response.Error);
          }
        }
        else {

          if (error.name != undefined && error.name != null)
            console.log(error.name);
        }
        setShowProgress(false);
      }
    );
  };

  function RenderWeightDataList({ item }) {
    const formatTime = (time) => {
      let [hour, minute] = time.split(':');
      hour = parseInt(hour, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      // hour = hour % 12 || 12; // Convert hour to 12-hour format
      return `${hour}:${minute} ${ampm}`;
    };

    return (
      <View>

        <TouchableOpacity
          activeOpacity={0.9}
        //onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.patientDetails)}
        >
          <View style={styles.listItem}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                <CustomText style={styles.datetime}>{formatTime(item.start_time)} - {formatTime(item.end_time)}</CustomText>
                <CustomText style={[styles.datetime, { position: "absolute", right: 58 }]}>{item.date}</CustomText>
              </View>

              <View style={styles.data}>
                <CustomText style={styles.text}>Place :<CustomText style={styles.textvalue}> {item.place} </CustomText></CustomText>
                <CustomText style={styles.text1}>With : <CustomText style={styles.textvalue}>{item.with}</CustomText> </CustomText>
              </View>

              <View style={styles.data}>
                <CustomText style={styles.text}>Activity : <CustomText style={styles.textvalue}>{item.activity}</CustomText></CustomText>
                <CustomText style={styles.text1}>Mood : <CustomText style={styles.textvalue}>{item.mood}</CustomText></CustomText>
              </View>

              <View style={styles.data}>
                <CustomText style={styles.text}>Hunger : <CustomText style={styles.textvalue}>{item.hunger_level}</CustomText></CustomText>
                <CustomText style={styles.text1}>Amount : <CustomText style={styles.textvalue}>{item.amount}</CustomText></CustomText>
              </View>

              <View style={styles.data}>
                <CustomText style={styles.text}>Snack food : <CustomText style={styles.textvalue}>{item.snack_food}</CustomText></CustomText>
                <CustomText style={styles.text1}>Calories : <CustomText style={styles.textvalue}>{item.calories}</CustomText></CustomText>
              </View>

              <View style={styles.data}>
                <CustomText style={styles.text}>Fullness : <CustomText style={styles.textvalue}>{item.fullness}</CustomText></CustomText>
                <CustomText style={styles.text1}>Filled out :<CustomText style={styles.textvalue}> {item.filled_out}</CustomText></CustomText>
              </View>
            </View>
          </View>

        </TouchableOpacity>

      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        list.length > 0 ?
          <>
            <FlatList
              data={list}
              renderItem={RenderWeightDataList}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 180 }}
            />
          </> :
          <>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <CustomText style={{ fontSize: 16, color: grey }}>No data Found, Please add snack details.</CustomText>

            </View>
          </>
      }


      <View style={{ bottom: "10%", position: "absolute", alignSelf: "center" }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.addsnack)}
          style={{ alignSelf: 'center' }}>
          <CustomImage
            source={require('../../../../assets/user/addweight.png')}
            resizeMode="contain"
            style={{ width: 60, height: 75 }}
          />
        </TouchableOpacity>
        <CustomText style={{ fontSize: 16, fontWeight: "bold" }}>Add Snack</CustomText>
      </View>
      <Loader showHud={showProgress} />
    </SafeAreaView>
  )
}

export default Diary

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  datetime: {
    fontSize: 14,
    fontWeight: "bold",
    color: black
  },
  textvalue: {
    fontSize: 15,
    color: grey1,

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
    height: 200,
    borderRadius: 15,
    flex: 1,
    alignSelf: "center",
    paddingLeft: 15,
    //justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 50,
    marginTop: 20,

  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,

  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,


  },
  text: {
    color: black,
    fontSize: 15,
    fontWeight: "bold"
  },
  text1: {
    color: black,
    fontSize: 15,
    fontWeight: "bold",
    width: "37%",

  }

})