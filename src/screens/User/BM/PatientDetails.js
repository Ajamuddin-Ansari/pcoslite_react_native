import { FlatList, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Text, View, LogBox } from 'react-native'
import React, { useState, useEffect } from 'react'
import { black, dark_pink, green1, grey, grey2, white } from '../../../../lib/colors'
import CustomButton from '../../../components/CustomButton'
import appStrings from '../../../../lib/appStrings'
import { navigationRef } from '../../../../lib/RootNavigation'
import CustomTextInput from '../../../components/CustomTextInput'
import { useFocusEffect } from '@react-navigation/native';
import UserAxios from '../../../components/WsHelper/UserAxios'
import CustomText from '../../../components/CustomText'
import CustomImage from '../../../components/CustomImage'
import Image_Url from '../../../components/WsHelper/Image_Url'
import AsyncStorageKeys from '../../../../lib/AsyncStorageKeys'
import AsyncStorage from '../../../components/AsyncStorage'
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader'

const PatientDetails = ({ route }) => {
  const [patientList, setPatientList] = useState([]);
  const [productString, setProductString] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showProgress, setShowProgress] = useState(false);

  const iddata = route.params?.item
  console.log("suggestions)", suggestions.length);


  //AsyncStorage.saveData(AsyncStorageKeys.campId, iddata.tostring());

  const saveIdToAsyncStorage = async (iddata) => {
    try {
      await AsyncStorage.saveData(AsyncStorageKeys.campId, iddata.toString());
      console.log('ID saved successfully');
    } catch (error) {
      console.error('Error saving ID:', error);
    }
  };

  React.useEffect(() => {

    if (iddata) {
      saveIdToAsyncStorage(iddata);

    }
  }, [iddata]);

  useFocusEffect(
    React.useCallback(() => {
      // if (productString.length === 0) {
      //   setVisible(false)
      // }

      PatientList();

      return () => false;
    }, [])
  );


  useEffect(() => {

    const searchApi = async () => {

      try {
        setShowProgress(true);
        let inputParams = {};

        UserAxios.getResponse(
          `${appStrings.screens.api_names.search}${iddata}&query=${productString}`,
          inputParams,
          "get",
          (response, error) => {

            if (!error) {

              if (!response.error) {

                if (response.status === 200) {
                  console.log(response.data);
                  setSuggestions(response.data);

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

      } catch (error) {

      }

    };

    if (productString.length > 1) {
      searchApi();
    } else {
      setSuggestions([]);

    }
  }, [productString]);


  function ProductItem({ item }) {

    return (
      <View>

        <TouchableOpacity
          activeOpacity={0.9}
        //onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.patientDetails)}
        >
          <View style={styles.listItem}>

            <View style={{ flex: 1, marginLeft: '2%' }}>
              <View>
                <CustomText style={{ alignSelf: "center", fontWeight: "500", fontSize: 13, color: grey2, }}>Patient No.{item.id}</CustomText>
              </View>
              <CustomText style={{ fontWeight: "700", fontSize: 20, color: black, marginTop: 5 }}>{item.name}</CustomText>

              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <CustomText style={{ fontWeight: "500", fontSize: 14, color: "#9A9999" }}>Age - </CustomText>
                <CustomText style={{ fontWeight: "500", fontSize: 14, color: "#4A4A4A" }}>{item.age} </CustomText>
              </View>

              <View style={{ flexDirection: "row", marginTop: 10 }}>

                <CustomText style={{ fontSize: 14, color: "#9A9999" }}>Height - </CustomText>
                <CustomText style={{ fontWeight: "400", fontSize: 14, color: "#4A4A4A" }}>{item.height}</CustomText>

                <CustomText style={{ fontSize: 14, color: "#9A9999", marginLeft: 40 }}>Weight - </CustomText>
                <CustomText style={{ fontWeight: "400", fontSize: 14, color: "#4A4A4A" }}>{item.weight}Kg</CustomText>

              </View>

              <View style={{ marginTop: 10, flexDirection: "row", height: 30, width: 130, backgroundColor: '#878787', paddingVertical: 3 }}>
                <CustomText style={{ fontWeight: "500", fontSize: 16, color: white, paddingLeft: 10, fontWeight: "bold" }}>Disease - </CustomText>
                <CustomText style={{ fontWeight: "500", fontSize: 16, color: white, fontWeight: "bold" }}>PCOS </CustomText>
              </View>

              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <CustomText style={{ fontWeight: "500", fontSize: 14, color: "#9A9999" }}>Mobile Number - </CustomText>
                <CustomText style={{ fontWeight: "500", fontSize: 14, color: "#4A4A4A" }}>{item.mobile}</CustomText>
              </View>

              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <View style={{ flex: 0.2 }}>
                  <CustomText style={{ fontWeight: "500", fontSize: 14, color: "#9A9999" }}>Address - </CustomText>
                </View>
                <View style={{ flex: 0.8 }}>
                  <CustomText style={{ fontWeight: "500", fontSize: 14, color: "#4A4A4A" }}>{item.address}</CustomText>
                </View>
              </View>

              <View style={{ alignSelf: "flex-end", bottom: "85%", right: 10 }}>
                <CustomImage
                  source={{ uri: `${Image_Url}${item.image}` }}
                  resizeMode="contain"
                  style={{ width: 110, height: 110, borderRadius: 55, alignSelf: "flex-end" }}
                />
              </View>
              <View style={{ bottom: "75%", right: 0, left: 100 }}>
                <CustomButton
                  title="SMS"
                  buttonStyle={styles.smsbtnStyle}
                />
              </View>


            </View>

          </View>

        </TouchableOpacity>

      </View>

    );
  }

  const PatientList = async () => {
    //setShowProgress(true);

    let inputParams = {
      //camp_id : 80
    };
    UserAxios.getResponse(
      `${appStrings.screens.api_names.patient_list}${iddata}`,
      inputParams,
      "get",
      (response, error) => {

        if (!error) {
          if (!response.error) {
            if (response.status === 200) {

              console.log("response", response.data);

              setPatientList(response.data)

            }


          } else {
            console.log("Error", response.Error);
          }
        }
        else {

          if (error.name != undefined && error.name != null)
            console.log(error.name);
        }
        //setShowProgress(false);
      }
    );
  };


  function RenderPatientList({ item, index }) {

    //const formattedDate = moment(item.created_at).format('DD MMM YYYY');

    return (
      <View style={{ flex: 1 }}>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.patientDetails)}
        >
          <View style={styles.listItem}>

            <View style={{ flex: 1, marginLeft: '2%' }}>
              <View>
                <CustomText style={{ alignSelf: "center", fontWeight: "500", fontSize: 13, color: grey2, right: 10 }}>Patient No.{index + 1}</CustomText>
              </View>
              <CustomText style={{ fontWeight: "700", fontSize: 20, color: black, marginTop: 5 }}>{item.name}</CustomText>

              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <CustomText style={{ fontWeight: "500", fontSize: 14, color: "#9A9999" }}>Age - </CustomText>
                <CustomText style={{ fontWeight: "500", fontSize: 14, color: "#4A4A4A" }}>{item.age} </CustomText>
              </View>

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <CustomText style={{ fontSize: 14, color: "#9A9999" }}>Height - </CustomText>
                <CustomText style={{ fontWeight: "400", fontSize: 14, color: "#4A4A4A" }}>{item.height}</CustomText>

                <CustomText style={{ fontSize: 14, color: "#9A9999", marginLeft: 20 }}>Weight - </CustomText>
                <CustomText style={{ fontWeight: "400", fontSize: 14, color: "#4A4A4A" }}>{item.weight}Kg</CustomText>

              </View>

              <View style={{ marginTop: 10, flexDirection: "row", height: 30, width: 130, backgroundColor: '#878787', paddingVertical: 3 }}>
                <CustomText style={{ fontWeight: "500", fontSize: 16, color: white, paddingLeft: 10, fontWeight: "bold" }}>Disease - </CustomText>
                <CustomText style={{ fontWeight: "500", fontSize: 16, color: white, fontWeight: "bold" }}>PCOS </CustomText>
              </View>

              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <CustomText style={{ fontWeight: "500", fontSize: 14, color: "#9A9999" }}>Mobile Number - </CustomText>
                <CustomText style={{ fontWeight: "500", fontSize: 14, color: "#4A4A4A" }}>{item.mobile}</CustomText>
              </View>

              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <View style={{ flex: 0.2 }}>
                  <CustomText style={{ fontWeight: "500", fontSize: 14, color: "#9A9999" }}>Address - </CustomText>
                </View>
                <View style={{ flex: 0.8 }}>
                  <CustomText style={{ fontWeight: "500", fontSize: 14, color: "#4A4A4A" }}>{item.address}</CustomText>
                </View>


              </View>

              <View style={{ alignSelf: "flex-end", bottom: "70%", right: 10 }}>
                <CustomImage
                  source={{ uri: `${Image_Url}${item.image}` }}
                  resizeMode="contain"
                  style={{ width: 110, height: 110, borderRadius: 55, alignSelf: "flex-end" }}
                />
              </View>
              {/* <View style={{ bottom: "70%", right: 0, left: 100 }}>
                <CustomButton
                  title="SMS"
                  buttonStyle={styles.smsbtnStyle}
                />
              </View> */}


            </View>

          </View>

        </TouchableOpacity>

      </View>

    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>

          {/* <CustomTextInput
                  rightIcon={'search'}
                  color={grey}
                  placeholder="Search Patient"
                  placeholderTextColor={grey}
                  InputStyle={{ top: 5 }}
                  containerStyle={{ height: 50, width: "90%", marginVertical: 10, borderwidth: 1, borderColor: grey, borderRadius: 5 }}
                  value={productString}
                  onChangeText={(text) => setProductString(text)}

                /> */}
          <ScrollView>
            {productString.length > 0 && suggestions.length === 0 ? (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "50%" }}>
                <CustomText style={{ fontSize: 18, color: grey }}>No Data Found.</CustomText>
              </View>
            ) : (
              <FlatList
                data={suggestions}
                renderItem={({ item }) => <ProductItem item={item} />}
                keyExtractor={(item) => item.id.toString()}
              />
            )}

          </ScrollView>
        </View>

        {
          suggestions.length === 0 && productString.length > 0 ? null :

            <View>
              {
                patientList.length > 0 ?
                  (
                    <>

                      <FlatList
                        data={patientList}
                        renderItem={({ item, index }) => <RenderPatientList item={item} index={index} />}
                        keyExtractor={(item) => item.id}
                      />
                    </>
                  ) :
                  <>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "80%" }}>
                      <CustomText style={{ fontSize: 18, color: grey }}>No Patients Found, Please Add Patients.</CustomText>
                    </View>

                  </>
              }

            </View>

        }

        <View style={{ marginBottom: "24%" }}></View>
      </ScrollView>

      <View style={{ bottom: 10, position: "absolute", width: "100%" }}>

        <CustomButton
          title="Add Patient"
          onPress={() => {
            navigationRef.current?.navigate(appStrings.screens.appStrings.addPatient);
          }}
          buttonStyle={styles.buttonStyle}
        />
      </View>
      <Loader showHud={showProgress} />
    </SafeAreaView>
  )
}

export default PatientDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  buttonStyle: {
    width: '90%',
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: dark_pink,

  },

  smsbtnStyle: {
    width: '35%',
    paddingVertical: 3,
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: green1,
    marginBottom: 20
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
    height: 280,
    margin: 10,
    borderRadius: 20,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 15
  },
})