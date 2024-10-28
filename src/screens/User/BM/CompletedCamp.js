import { SafeAreaView, ScrollView, StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { white, grey, grey2, dark_pink, orange, black, green1 } from '../../../../lib/colors'
import CustomText from '../../../components/CustomText'
import { useFocusEffect } from '@react-navigation/native';
import appStrings from '../../../../lib/appStrings';
import UserAxios from '../../../components/WsHelper/UserAxios';
import Loader from '../../../components/Loader';
import CustomImage from '../../../components/CustomImage';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '../../../components/AsyncStorage';
import AsyncStorageKeys from '../../../../lib/AsyncStorageKeys';


const CompletedCamp = ({ route }) => {
  const [data, setData] = useState([]);


  const [showProgress, setShowProgress] = useState(false);
  console.log("data", data.length);
  const createdId = route.params?.id;
  console.log("createdId", createdId);

  useFocusEffect(
    React.useCallback(() => {
      CompletedCampListApi();

      return () => false;
    }, [])
  );

  const CompletedCampListApi = async () => {
    const id = await AsyncStorage.getData(AsyncStorageKeys.customer_id);
    const user_id = JSON.parse(id) || [];
    console.log("user_id", user_id);
    setShowProgress(true);
    let inputParams = {};

    UserAxios.getResponse(
      `${appStrings.screens.api_names.completed_camp_list}${user_id}`,
      inputParams,
      "get",
      (response, error) => {
        if (!error) {
          if (!response.error) {
            if (response.status === 200) {
              console.log("response", response);
              setData(response.data)

            } else if (response.status === 400) {
              setData(0);
              Toast.show(response.message)

            }


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

  function RenderCampList({ item }) {

    return (
      <View>

        <TouchableOpacity activeOpacity={1}>
          <View style={[styles.listItem]}>
            <View style={{ flex: 1, marginLeft: '2%' }}>
              <View style={{ flexDirection: "row" }}>

                <View style={{ width: 75, height: 25, backgroundColor: item.status === 'Pending' ? orange : item.status === 'Approved' ? green1 : item.status === 'Rejected' ? red : null, borderBottomRightRadius: 6, borderBottomLeftRadius: 6, top: -10, right: 0, position: "absolute" }}>
                  <CustomText style={{ fontWeight: "500", fontSize: 13, color: grey2, alignSelf: "center", color: white, paddingVertical: 2 }}>{item.status}</CustomText>

                </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>

                <View style={{ width:'50%'}}>
                  <CustomText style={styles.campTitle}>Camp Title</CustomText>
                  <CustomText numberOfLines={2} ellipsizeMode={'tail'} style={styles.titleData}>{item.title}</CustomText>
                </View>
                <View style={{ right: 10,  }}>
                  <CustomText style={[styles.campTitle, { marginRight: 36 }]}>Camp Date</CustomText>
                  <CustomText style={styles.titleData}>{item.camp_date}</CustomText>
                </View>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                  <CustomText style={styles.campTitle}>Camp Location</CustomText>
                  <CustomText style={styles.titleData}>{item.location}</CustomText>
                </View>
                <View style={{ right: 10 }}>
                  <CustomText style={styles.campTitle}>Camp Timing</CustomText>
                  <CustomText style={styles.titleData}>{item.start.slice(0, 5)}am - {item.end.slice(0, 5)}pm</CustomText>
                </View>
              </View>

              <View>
                <CustomText style={[styles.campTitle, { marginRight: 15 }]}>Doctor Name</CustomText>
                <CustomText style={styles.titleData}>{item.doctor_name} ({item.doctor_code})</CustomText>
              </View>

            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {
          data.length > 0 ?
            (
              <>
                <View>
                  <FlatList
                    inverted
                    data={data}
                    renderItem={RenderCampList}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </>
            ) :
            <>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "70%" }}>
                <CustomText style={{ fontSize: 18, color: grey }}>No Completed Camp Found!</CustomText>

              </View>
            </>

        }



        <View style={{ marginBottom: "15%" }}></View>
      </ScrollView>
      <Loader showHud={showProgress} />
    </SafeAreaView>
  )
}

export default CompletedCamp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,

  },
  buttonStyle: {
    width: '50%',
    paddingVertical: 12,
    //height: '40%',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: dark_pink,
  },
  triggerText: {
    fontSize: 16,
    color: 'blue',
  },
  listItem: {
    padding: 10,
    margin: 10,
    top: 5,
    shadowColor: black,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.65,
    elevation: 6,
    backgroundColor: white,
    width: "92%",
    height: 220,
    borderRadius: 20,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 15,

  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    top: 3,
    color: black,
    right: "57%",
    position: "absolute"
  },
  campTitle: {
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 30,
    color: grey2,
    marginTop: 10
  },
  titleData: {
    fontWeight: "700",
    fontSize: 14,
    color: "#9A9999",
  }
})