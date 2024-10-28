import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { black, grey, grey_Border, white } from '../../../../../lib/colors'
import CustomText from '../../../../components/CustomText';
import CustomImage from '../../../../components/CustomImage';
import { navigationRef } from '../../../../../lib/RootNavigation';
import appStrings from '../../../../../lib/appStrings';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '../../../../components/AsyncStorage';
import AsyncStorageKeys from '../../../../../lib/AsyncStorageKeys';
import UserAxios from '../../../../components/WsHelper/UserAxios';
import Loader from '../../../../components/Loader';

const BodyTracker = () => {
  const [list, setList] = useState([]);
  const [showProgress, setShowProgress] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      BodyDetailList();
      return () => false;
    }, [])
  );

  const BodyDetailList = async () => {


    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patient_id = JSON.parse(id) || [];
    console.log('patient_id', patient_id);

    setShowProgress(true);
    let inputParams = {};

    UserAxios.getResponse(
      `${appStrings.screens.api_names.body_measurements_list}${patient_id}`,
      inputParams,
      "get",
      (response, error) => {
        if (!error) {
          if (!response.error) {
            console.log("response", response);
            setList(response.body_measurements)

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
    return (

      <TouchableOpacity style={styles.listItem} activeOpacity={0.9}>
        <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
         <View style={{flex:0.8}}>
         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <CustomText style={styles.week}>Week {item.week}</CustomText>
            <CustomText style={styles.week}>{item.date}</CustomText>
            <View style={{left:-40}}>
            <TouchableOpacity
              onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.updatebodydetails, { "item": item })}>
              <CustomImage
                source={require('../../../../../assets/user/edit.png')}
                resizeMode="contain"
                style={{ width: 21, height: 21}}
              />
            </TouchableOpacity>
            </View>
          </View>

          <View>
            <CustomText style={{ color: "#B6B6B6", fontSize: 13, width: 200 }}>Here is your Weight report for For this date.</CustomText>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <CustomText style={{ fontSize: 16, color: '#646464', top: -2 }}>Chest</CustomText>
            <View style={{ borderRadius: 5, borderWidth: 1, borderColor: grey_Border, width: 50, height: 22, marginLeft: 10 }}>
              <CustomText style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold" }}>{item.chest}</CustomText>
            </View>

            <View style={{ marginLeft: 20, flexDirection: "row" }}>
              <CustomText style={{ fontSize: 16, color: '#646464', top: -2 }}>Arm</CustomText>
              <View style={{ borderRadius: 5, borderWidth: 1, borderColor: grey_Border, width: 50, height: 22, marginLeft: 10 }}>
                <CustomText style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold" }}>{item.arm}</CustomText>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <CustomText style={{ fontSize: 16, color: '#646464', top: -2 }}>Wrist</CustomText>
            <View style={{ borderRadius: 5, borderWidth: 1, borderColor: grey_Border, width: 50, height: 22, marginLeft: 13 }}>
              <CustomText style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold" }}>{item.wrist}</CustomText>
            </View>

            <View style={{ marginLeft: 20, flexDirection: "row" }}>
              <CustomText style={{ fontSize: 16, color: '#646464', top: -2 }}>Hip</CustomText>
              <View style={{ borderRadius: 5, borderWidth: 1, borderColor: grey_Border, width: 50, height: 22, marginLeft: 17 }}>
                <CustomText style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold" }}>{item.hip}</CustomText>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <CustomText style={{ fontSize: 16, color: '#646464', top: -2 }}>Thigh</CustomText>
            <View style={{ borderRadius: 5, borderWidth: 1, borderColor: grey_Border, width: 50, height: 22, marginLeft: 10 }}>
              <CustomText style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold" }}>{item.thigh}</CustomText>
            </View>

            <View style={{ marginLeft: 18, flexDirection: "row" }}>
              <CustomText style={{ fontSize: 16, color: '#646464', top: -2 }}>Calf</CustomText>
              <View style={{ borderRadius: 5, borderWidth: 1, borderColor: grey_Border, width: 50, height: 22, marginLeft: 14 }}>
                <CustomText style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold" }}>{item.calf}</CustomText>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <CustomText>Note: {item.note}</CustomText>
          </View>
          </View>

          <View style={{ flex:0.2}}>
            <CustomImage
              source={require('../../../../../assets/user/bodytrack.png')}
              resizeMode="contain"
              style={{ width: 42, height: 152 }}
            />
            <View style={{alignSelf:"center"}}>
              <CustomText style={{ right:15,top: 5, fontWeight: "bold" }}>{item.weight} Kg</CustomText>
            </View>
          </View>
        </View>
      </TouchableOpacity>

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
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          </> :
          <>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <CustomText style={{ fontSize: 16, color: grey }}>No data Found, Please add body details.</CustomText>

            </View>
          </>
      }


      <View style={{ bottom: 0, position: "absolute", alignSelf: "center" }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.bodydetails)}
          style={{ alignSelf: 'center' }}>
          <CustomImage
            source={require('../../../../../assets/user/addweight.png')}
            resizeMode="contain"
            style={{ width: 60, height: 75 }}
          />
        </TouchableOpacity>
        <CustomText style={{ fontSize: 16, fontWeight: "bold" }}>Add Week</CustomText>
      </View>
      <Loader showHud={showProgress} />
    </SafeAreaView>
  )
}

export default BodyTracker

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  week:{
    fontSize: 16, 
    color: black, 
    fontWeight: '700'
  },
  listItem: {

    padding: 10,
    shadowColor: black,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.65,
    elevation: 6,
    backgroundColor: white,
    width: "94%",
    height: 250,
    borderRadius: 15,
    flex: 1,
    alignSelf: "center",
    paddingLeft: 20,
    //justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 50,
    marginTop: 20,

  },

})