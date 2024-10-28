import { StyleSheet, Text, View, FlatList, ScrollView, Pressable, RefreshControl, TouchableOpacity, Modal, Alert, SafeAreaView, LogBox, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { black, dark_pink, green1, grey2, grey, grey_Border, orange, primary, red, white } from '../../../../lib/colors'
import CustomText from '../../../components/CustomText'
import CustomImage from '../../../components/CustomImage'
import appStrings from '../../../../lib/appStrings'
import UserAxios from '../../../components/WsHelper/UserAxios'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '../../../components/AsyncStorage'
import AsyncStorageKeys from '../../../../lib/AsyncStorageKeys'
import { navigationRef } from '../../../../lib/RootNavigation'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader'
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Icon } from 'react-native-elements'
import Share from 'react-native-share'
import images from '../../../../lib/imagesBase64'
import Base_Url from '../../../components/WsHelper/Base_Url'
import uuid from 'react-native-uuid';
import RNFetchBlob from 'rn-fetch-blob'

const HomeScreen = () => {
  const [campData, setCampData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [secondmodalVisible, setSecondModalVisible] = useState(false);
  const [endtimemodalVisible, setEndtimeModalVisible] = useState(false);
  const [endtimesecondmodalVisible, setEndtimeSecondModalVisible] = useState(false);
  const [imageURI, setImageURI] = useState(null);
  const [endimageURI, setEndImageURI] = useState(null);
  const [showProgress, setShowProgress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [id, setId] = useState('');
  const [timers, setTimers] = useState({});
  const [currentTimestart, setCurrentTimeStart] = useState('');
  const [currentTimeend, setCurrentTimeEnd] = useState('');
  const [campUrl, setCampUrl] = useState('');
  const [startTime,setStartTime]=useState('');
  const [endTime,setEndTime]=useState('');


  // useEffect(() => {
  //   const updateTime = () => {
  //     console.log("Inside Effect 1111")
  //     const now = new Date();
  //     const hours = now.getHours();
  //     const minutes = now.getMinutes();
  //     const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}`;
  //     setCurrentTimeStart(formattedTime);
  //     setCurrentTimeEnd(formattedTime)
  //   };

  //   const formatTime = (time) => (time < 10 ? `0${time}` : time);

  //   updateTime(); // Set initial time
  //   const intervalId = setInterval(updateTime, 1000); // Update time every second

  //   return () => clearInterval(intervalId); // Clean up the interval on component unmount
  // }, []);


  useEffect(() => {
    console.log("Inside Effect 222")
    const loadTimers = async () => {
      console.log("Inside Effect 222111")
      try {
        const savedTimers = await AsyncStorage.getData(AsyncStorageKeys.timer);
        if (savedTimers) {
          const parsedTimers = JSON.parse(savedTimers);
          Object.keys(parsedTimers).forEach((id) => {
            if (parsedTimers[id].isRunning) {
              const startTime = parsedTimers[id].startTime;
              parsedTimers[id].intervalId = setInterval(() => {
                setTimers((prevTimers) => ({
                  ...prevTimers,
                  [id]: {
                    ...prevTimers[id],
                    time: Math.floor((new Date().getTime() - startTime) / 1000),
                  },
                }));
              }, 1000);
            }
          });
          setTimers(parsedTimers);
        }
      } catch (error) {
        console.error('Failed to load timers', error);
      }
    };

    loadTimers();
  }, []);


  // useEffect(() => {
  //   // Save timers to AsyncStorage whenever they change
  //   console.log("Inside Effect 33333");
  //   const saveTimers = async () => {
  //     try {
  //       console.log("Inside Effect 333111")
  //       await AsyncStorage.saveData(AsyncStorageKeys.timer, JSON.stringify(timers));
  //     } catch (error) {
  //       console.error('Failed to save timers', error);
  //     }
  //   };

  //   saveTimers();
  // }, [timers]);

  // Function to start a timer for an item
  const startTimer = async (id) => {
    if (timers[id] && timers[id].isRunning) {
      // If the timer is already running, do nothing
      return;
    }

    const startTime = Date.now();
    // Create a new timer
    const newTimer = {
      time: 0,
      startTime,
      isRunning: true,
      intervalId: setInterval(() => {
        setTimers((prevTimers) => ({
          ...prevTimers,
          [id]: {
            ...prevTimers[id],
            time: prevTimers[id].time + 1,
          },
        }));
      }, 1000),
    };

    // Update the timers state
    setTimers((prevTimers) => ({
      ...prevTimers,
      [id]: newTimer,
    }));

    // Save the updated timers to AsyncStorage
    try {
      const updatedTimers = {
        ...timers,
        [id]: newTimer
      };
      await AsyncStorage.saveData(AsyncStorageKeys.timer, JSON.stringify(updatedTimers));
    } catch (error) {
      console.error('Failed to save timers', error);
    }
  };


  // Function to stop a timer for an item
  const stopTimer = async (id) => {
    if (!timers[id]) {
      // If the timer is not running, do nothing
      return;
    }
    // setIsTimerActive(true);

    // Get the current time
    // const currentTime = new Date().getTime();

    // // Calculate the time completed
    // const timeCompleted = currentTime - timers[id].startTime;

    // Clear the interval
    clearInterval(timers[id].intervalId);

    // Update the timer in the state to include the time completed
    setTimers((prevTimers) => {
      const updatedTimers = { ...prevTimers };
      updatedTimers[id].isRunning = false; // Mark the timer as stopped
      updatedTimers[id].intervalId = null; // Clear the intervalId
      updatedTimers[id].timeCompleted = new Date().getTime() - updatedTimers[id].startTime; // Store time completed
      return updatedTimers;
    });
    // Save the updated timers to AsyncStorage
    try {
      const updatedTimers = {
        ...timers,
        [id]: {
          ...timers[id],
          isRunning: false,
          intervalId: null,
          timeCompleted: new Date().getTime() - timers[id].startTime
        }
      };
      await AsyncStorage.saveData(AsyncStorageKeys.timer, JSON.stringify(updatedTimers));
    } catch (error) {
      console.error('Failed to save timers', error);
    }
  }
  // Function to format time in "hh:mm:ss" format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const onRefresh = () => {
    setRefreshing(true);
    CampList();
    setRefreshing(false);
  };


  const closeModal = () => {
    setModalVisible(false);
    setImageURI(null);
  };

  const closeModalendtime = () => {
    setEndtimeModalVisible(false);
    setEndImageURI(null);
  };

  const handlecloseModal = () => {
    setSecondModalVisible(false);
  };

  const handleendtimecloseModal = () => {
    setEndtimeSecondModalVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      CampList();

      return () => false;
    }, [])
  );


  const OnClickShare = async (campId) => {
    setShowProgress(true)
    let inputParams = {};
    UserAxios.getResponse(
      `${appStrings.screens.api_names.share_camp}/${campId}`,
      inputParams,
      "get",
      async (response, error) => {
       setShowProgress(true);
        if (!error) {
          if (!response.error) {
            if (response.status === 200) {
              const filePath = await dowloadPdf(response.download_link)
              setShowProgress(false)
              ShareCampPdf(filePath);

            } else if (response.status === 400) {
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

  const dowloadPdf = async (url) => {
    console.log('download pdf url',url)
    try {
      const dirs = RNFetchBlob.fs.dirs;
      const path = `${dirs.DocumentDir}/PCOS_PDF${uuid.v4()}.pdf`;
  
      const res = await RNFetchBlob.config({
        path: path,
        fileCache: true,
      }).fetch('GET', url);
  
      if (res.info().status === 200) {
        console.log('PDF downloaded successfully');
        return path;
      } else {
        console.error('Failed to download PDF');
        return null;
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      return null;
    }
  }

  const ShareCampPdf=async(filePath)=>{

    try {
      await Share.open({
        url: `file://${filePath}`,
        type: 'application/pdf',
        title: 'Share PDF',
        social: Share.Social.WHATSAPP,
      });
      console.log('PDF shared successfully');
    } catch (error) {
      console.error('Error sharing PDF:', error);
    }
    
  }

  const CampList = async () => {

    const id = await AsyncStorage.getData(AsyncStorageKeys.customer_id);
    const user_id = JSON.parse(id) || [];
    console.log("user_id", user_id);
    setShowProgress(true);
    let inputParams = {};
    UserAxios.getResponse(
      `${appStrings.screens.api_names.camp_list}/${user_id}`,
      inputParams,
      "get",
      (response, error) => {
        if (!error) {
          if (!response.error) {
            if (response.status === 200) {
              console.log("response", response);
              setCampData(response.data);
              setStartTime(response.data.start);
              setEndTime(response.data.end);
              
            } else if (response.status === 400) {
              setCampData(0)
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




  const CaptureStartTimeImage = async (item) => {

    try {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formatTime = (time) => (time < 10 ? `0${time}` : time);
      const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}`;
      setCurrentTimeStart(formattedTime);
      // setShowProgress(true);
      const formData = new FormData();

      if(formattedTime){
        // Add patient data
        formData.append('camp_id', item.id);
        formData.append('start', formattedTime);
  
        // Add image data
        if (imageURI) {
          // Determine the file name and type (extension) of the image
          const fileName = imageURI.split('/').pop();
          const fileType = fileName.split('.').pop();
  
          // Append the image file to the FormData object
          formData.append('start_time_image', {
            uri: Platform.OS === 'ios' ? imageURI : 'file://' + imageURI,
            name: fileName,
            type: `image/${fileType}`,
          });
          UserAxios.getResponse(
            `${appStrings.screens.api_names.capture_start_image}`,
            formData,
            "post",
            (response, error) => {
              if (!error) {
                if (!response.error) {
                    setSecondModalVisible(true);
                    console.log("response...........////", response);
                    Toast.show(response.message);
                    CampList();
                } else if(response.status == 400) {
                  console.log("400 Error", response.message);
                  Toast.show(response.message)
                }
                else{
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
    
        }
        else{
          Toast.show("Image field is required.")
        }
       
      }
      else{
          
        Toast.show("The start field is required.")
      }
     

    } catch (error) {

    }

  };

  const CaptureEndTimeImage = async (item) => {
    // setShowProgress(true);
    try {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formatTime = (time) => (time < 10 ? `0${time}` : time);
      const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}`;
      setCurrentTimeStart(formattedTime);
      setShowProgress(true);
      

      if(formattedTime){
      const formData = new FormData();
      // Add patient data
      formData.append('camp_id', item.id);
      formData.append('end', formattedTime);

      // Add image data
      if (endimageURI) {
        // Determine the file name and type (extension) of the image
        const fileName = endimageURI.split('/').pop();
        const fileType = fileName.split('.').pop();

        // Append the image file to the FormData object
        formData.append('end_time_image', {
          uri: Platform.OS === 'ios' ? endimageURI : 'file://' + endimageURI,
          name: fileName,
          type: `image/${fileType}`,
        });

        console.log("formData====",formData)
  
        UserAxios.getResponse(
          `${appStrings.screens.api_names.capture_end_image}`,
          formData,
          "post",
          (response, error) => {
            if (!error) {
              if (!response.error) {
                setEndtimeSecondModalVisible(true);
                console.log("response...........////", response);
                Toast.show(response.message)
                CampList();
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
      }
      else{
        Toast.show("Image field is required.")
      }
    }
    else{
        
       Toast.show("The End field is required.")
    }
    } catch (error) {

    }

  };

  function RenderCampList({ item }) {
    //  console.log("item====",item)
    //const formattedDate = moment(item.camp_date).format('DD-MMM-YYYY');
    const timerTime = timers[item.id]?.time || 0;
    const startTime = item.start_time.slice(0, 5)
    const endTime = item.end_time.slice(0, 5)
    const created_id = item.created_by;
    setId(created_id);
    return (
      <View>

        <TouchableOpacity activeOpacity={1}>
          <View pointerEvents={item.end != null ? 'none' : 'auto'} style={styles.listItem}>
            <View style={{ flex: 1, marginLeft: '2%' }}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.patientDetails, { "item": item.id })}
                  style={{ height: 30, width: 100, backgroundColor: dark_pink, borderRadius: 10 }}>
                  <CustomText style={{ fontWeight: "700", fontSize: 13, color: grey2, alignSelf: "center", paddingVertical: 5, color: white }}>Add Patients</CustomText>
                </TouchableOpacity>

                <View style={{ width: 75, height: 25, backgroundColor: item.status === 'Pending' ? orange : item.status === 'Approved' ? green1 : item.status === 'Rejected' ? red : null, borderBottomRightRadius: 6, borderBottomLeftRadius: 6, top: -10, right: 0, position: "absolute" }}>
                  <CustomText style={{ fontWeight: "500", fontSize: 13, color: grey2, alignSelf: "center", color: white, paddingVertical: 2 }}>{item.status}</CustomText>

                </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", width:'100%' }}>

                <View style={{width:'60%',marginBottom:12}}>
                  <CustomText style={styles.campTitle}>Camp Title</CustomText>
                  <CustomText numberOfLines={3} ellipsizeMode={'tail'} style={styles.titleData}>{item.title}</CustomText>
                  <CustomText style={[styles.campTitle, ]}>Camp Date</CustomText>
                  <CustomText style={styles.titleData}>{item.camp_date}</CustomText>
                 
                </View>
                <View style={{ right: 10 ,width:'40%',alignItems:'center'}}>
                
                  <View style={{width:80,height:80}}>
                  {
                   item.doctor_image &&
                   <CustomImage source={{uri: `${Base_Url}/storage/${item.doctor_image}`}} style={{with:'100%',height:'100%',borderRadius:8}} resizeMode={'contain'}/>
                  }
                   </View>
                
                
                 <CustomText style={styles.titleData}>Dr. {item.doctor_name}</CustomText>
                 <CustomText style={styles.titleData}>{item.doctor_code}</CustomText>
                 <View style={{width:'100%',alignItems:'flex-end'}}>
               
                
                </View>
                </View>
              </View>

              <View style={{flex:1, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{flex:0.5}}>
                  <CustomText style={styles.campTitle}>Camp Location</CustomText>
                  <CustomText style={styles.titleData}>{item.location}</CustomText>
                </View>
                <View style={{flex:0.5,alignItems:'flex-end',right:12}}>
                { item.doctor_mobile &&
                <>
                 <CustomText style={styles.campTitle}>Doctor Mobile</CustomText>
                 <CustomText style={styles.titleData}>{item.doctor_mobile}</CustomText>
                 </>
                 }
                </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
              <CustomText style={styles.campTitle}>Camp Timing</CustomText>
              <CustomText style={styles.titleData}>{startTime}am - {endTime}pm</CustomText>
              </View>
              <View style={{alignItems:'flex-end',right:10,marginBottom:10}}>
              {
                  item.headquater &&
                  <>
                  <CustomText style={styles.campTitle}>Headquarter</CustomText>
                  <CustomText style={styles.titleData}>{item.headquater}</CustomText>
                 </>
                }
              </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
              <CustomText style={styles.campTitle}>Start Time</CustomText>
              <CustomText style={styles.titleData}>{item.start ? item.start : "00:00:00"}</CustomText>
              </View>
              <View style={{alignItems:'flex-end',right:10,marginBottom:10}}>
                  <>
                  <CustomText style={styles.campTitle}>End time</CustomText>
                  <CustomText style={styles.titleData}>{item.end ? item.end : "00:00:00"}</CustomText>
                 </>
              </View>
              </View>
              <View pointerEvents={item.end != null ? 'none' : 'auto'} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                {
                  item.status === 'Approved' ?(
                    <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between" }}>

                  <Pressable
                    disabled={item.start != null ? true : false}
                    onPress={() => {
                      setModalVisible(true);

                    }}
                    style={({ pressed }) => [
                      { opacity: pressed ? 0.5 : 1.0, height: 33, width: 70, backgroundColor: item.start != null ? grey : green1, borderRadius: 7 },
                    ]}>
                    <CustomText style={{ alignSelf: "center", paddingVertical: 5, color: white }}>Start</CustomText>
                  </Pressable>
                  {/* <View>
                    <Text style={styles.timerText}>{formatTime(timerTime)}</Text>
                  </View> */}

                  <View style={{ marginRight: 20 }}>
                    {
                      item.end != null ? (
                        <Pressable

                          disabled={true}

                          onPress={() => {
                            setEndtimeModalVisible(true);

                          }}

                          style={({ pressed }) => [
                            { opacity: pressed ? 0.5 : 1.0, height: 33, width: 70, backgroundColor: grey, borderRadius: 7 },
                          ]}>

                          <CustomText style={{ alignSelf: "center", paddingVertical: 5, color: white }}>End</CustomText>
                        </Pressable>
                      ) :
                        <>
                          <Pressable

                            disabled={item.start === null ? true : false}

                            onPress={() => {
                              setEndtimeModalVisible(true);

                            }}

                            style={({ pressed }) => [
                              { opacity: pressed ? 0.5 : 1.0, height: 33, width: 70, backgroundColor: item.start === null ? grey : red, borderRadius: 7 },
                            ]}>

                            <CustomText style={{ alignSelf: "center", paddingVertical: 5, color: white }}>End</CustomText>
                          </Pressable>
                        </>

                    }

                  </View>
                </View>
                  ):
                  <View style={{ flex: 0.8}}>
                  </View>
                }
              
                <View style={{ flex: 0.2, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>

                  <View style={{ flex: 0.5 }}>
                    <TouchableOpacity onPress={()=> OnClickShare(item.id)}>
                      <View>
                        <CustomImage
                          source={require('../../../../assets/share.png')}
                          resizeMode="contain"
                          style={{ width: 25, height: 25 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    {
                   ( item.start === null  )? 
                    <Pressable
                    onPress={() => {
                      navigationRef.current?.navigate(appStrings.screens.appStrings.edit_camp, { "item": item })
                    }}
                   >
                    <CustomImage
                      source={require('../../../../assets/edit.png')}
                      resizeMode="contain"
                      style={{ width: 25, height: 25 }}
                    />
                  </Pressable>
                  :<></>
                    
                  }
                    
                  </View>
                </View>
              </View>
            </View>

          </View>

        </TouchableOpacity>

        {/* Modal Popup */}
        <Modal visible={modalVisible} transparent={true} onRequestClose={closeModal}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>

            <View style={{
              width: '90%',
              height: "40%",
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>

              <TouchableOpacity onPress={closeModal}
                style={{ left: "95%", top: -30, zIndex: 2 }}>
                <CustomImage
                  source={require('../../../../assets/close.png')}
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
              <View style={{ marginTop: -25, height: "70%", width: "100%", borderColor: grey_Border, borderWidth: 1, borderStyle: "dashed", borderRadius: 10 }}>
                {
                  imageURI ? (
                    <CustomImage
                      source={{ uri: imageURI }}
                      resizeMode="cover"
                      style={{ width: "92%", height: "92%", left: "4%", marginTop: 10 }}
                    />
                  ) :
                    <>
                      <CustomText style={{ alignSelf: "center", marginTop: "25%", color: grey_Border }}>Add Image to the camp</CustomText>

                    </>
                }
              </View>
              {
                imageURI ? (
                  <TouchableOpacity onPress={() => {
                    setImageURI(null)
                    CaptureStartTimeImage(item);
                    setModalVisible(false);
                  }}
                    style={{ height: "18%", width: "60%", backgroundColor: green1, borderRadius: 7, alignSelf: "center", marginTop: 15 }}>
                    <CustomText style={{ alignSelf: "center", paddingVertical: 8, color: white, fontSize: 24, fontWeight: "bold" }}>Send</CustomText>
                  </TouchableOpacity>
                ) :
                  <>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                      <TouchableOpacity onPress={openCamera}>
                        <CustomImage
                          source={require('../../../../assets/camera.png')}
                          resizeMode="contain"
                          style={{ width: 40, height: 40 }}
                        />
                      </TouchableOpacity>

                      {/* <TouchableOpacity onPress={openImageLibrary}>
                        <CustomImage
                          source={require('../../../../assets/file.png')}
                          resizeMode="contain"
                          style={{ width: 40, height: 40 }}
                        />
                      </TouchableOpacity> */}

                    </View>
                  </>

              }

            </View>
          </View>
        </Modal>

        {/* Second Modal Popup */}
        <Modal visible={secondmodalVisible} transparent={true} onRequestClose={handlecloseModal}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>

            <View style={{
              width: '75%',
              height: "35%",
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
              <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <CustomText style={{ fontSize: 18, fontWeight: "500" }}>Image sent successfully to the admin.</CustomText>
              </View>
              <TouchableOpacity onPress={() => {
                handlecloseModal()
                // startTimer(item.id)

              }}
                style={{ height: "20%", width: "80%", backgroundColor: green1, borderRadius: 7, alignSelf: "center", marginTop: 15 }}>
                <CustomText style={{ alignSelf: "center", paddingVertical: 7, color: white, fontSize: 24, fontWeight: "bold" }}>Done</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Popup */}
        <Modal visible={endtimemodalVisible} transparent={true} onRequestClose={closeModalendtime}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>

            <View style={{
              width: '90%',
              height: "40%",
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>

              <Pressable onPress={closeModalendtime}
                style={{ left: "95%", top: -30, zIndex: 2 }}>
                <CustomImage
                  source={require('../../../../assets/close.png')}
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                />
              </Pressable>
              <View style={{ marginTop: -25, height: "70%", width: "100%", borderColor: grey_Border, borderWidth: 1, borderStyle: "dashed", borderRadius: 10 }}>
                {
                  endimageURI ? (
                    <CustomImage
                      source={{ uri: endimageURI }}
                      resizeMode="cover"
                      style={{ width: "92%", height: "92%", left: "4%", marginTop: 10 }}
                    />
                  ) :
                    <>
                      <CustomText style={{ alignSelf: "center", marginTop: "25%", color: grey_Border }}>Add Image of end time to the camp</CustomText>

                    </>
                }
              </View>
              {
                endimageURI ? (
                  <Pressable onPress={() => {
                    setEndImageURI(null)
                    CaptureEndTimeImage(item)
                    setEndtimeModalVisible(false)
                  }}
                    style={({ pressed }) => [
                      { opacity: pressed ? 0.5 : 1.0, height: "18%", width: "60%", backgroundColor: green1, borderRadius: 7, alignSelf: "center", marginTop: 15 },
                    ]}>
                    <CustomText style={{ alignSelf: "center", paddingVertical: 8, color: white, fontSize: 24, fontWeight: "bold" }}>Send</CustomText>
                  </Pressable>
                ) :
                  <>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                      <Pressable onPress={endTimeopenCamera}
                        style={({ pressed }) => [
                          { opacity: pressed ? 0.5 : 1.0 },
                        ]}>
                        <CustomImage
                          source={require('../../../../assets/camera.png')}
                          resizeMode="contain"
                          style={{ width: 40, height: 40 }}
                        />
                      </Pressable>

                      {/* <Pressable onPress={endTimeopenImageLibrary}
                        style={({ pressed }) => [
                          { opacity: pressed ? 0.5 : 1.0 },
                        ]}>
                        <CustomImage
                          source={require('../../../../assets/file.png')}
                          resizeMode="contain"
                          style={{ width: 40, height: 40 }}
                        />
                      </Pressable> */}

                    </View>
                  </>

              }

            </View>
          </View>
        </Modal>

        {/* Second end time Modal Popup */}
        <Modal visible={endtimesecondmodalVisible} transparent={true} onRequestClose={handleendtimecloseModal}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>

            <View style={{
              width: '75%',
              height: "35%",
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
              <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <CustomText style={{ fontSize: 18, fontWeight: "500" }}>Image sent successfully to the admin.</CustomText>
              </View>
              <TouchableOpacity onPress={() => {
                handleendtimecloseModal()
                // stopTimer(item.id)
              }}
                style={{ height: "20%", width: "80%", backgroundColor: green1, borderRadius: 7, alignSelf: "center", marginTop: 15 }}>
                <CustomText style={{ alignSelf: "center", paddingVertical: 7, color: white, fontSize: 24, fontWeight: "bold" }}>Done</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>

    );
  }

  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  // Function to handle picking an image from the camera
  const openCamera = () => {
    launchCamera(options, (response) => {

      if (response.didCancel) {
        Alert.alert('Camera', 'User cancelled image capture');

      } else if (response.errorCode) {
        Alert.alert('Camera', 'Error: ' + response.errorMessage);
      } else {

        console.log('Camera response:', response);
        setImageURI(response.assets[0].uri);

      }
    });
  };

  const endTimeopenCamera = () => {
    launchCamera(options, (response) => {

      if (response.didCancel) {
        Alert.alert('Camera', 'User cancelled image capture');

      } else if (response.errorCode) {
        Alert.alert('Camera', 'Error: ' + response.errorMessage);
      } else {

        console.log('Camera response:', response);
        setEndImageURI(response.assets[0].uri);

      }
    });
  };

  const openImageLibrary = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Image Library', 'User cancelled image selection');
      } else if (response.errorCode) {
        Alert.alert('Image Library', 'Error: ' + response.errorMessage);
      } else {
        console.log('Image library response:', response);
        setImageURI(response.assets[0].uri);


      }
    });
  };

  const endTimeopenImageLibrary = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Image Library', 'User cancelled image selection');
      } else if (response.errorCode) {
        Alert.alert('Image Library', 'Error: ' + response.errorMessage);
      } else {
        console.log('Image library response:', response);
        setEndImageURI(response.assets[0].uri);


      }
    });
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[primary]}
          />
        }
        style={{ flexGrow: 1 }}
      >
        <View style={{ flexDirection: "row" }}>
          <CustomText style={{ fontSize: 22, fontWeight: "bold", margin: 15, color: black }}>Manage Camp Here,</CustomText>

          <MenuProvider>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Menu style={{ marginTop: 16, marginLeft: "65%" }}>
                <MenuTrigger>
                  <Icon name="more-vert" type="material" color="#000" size={28} />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                  <MenuOption onSelect={() => navigationRef.current?.navigate(appStrings.screens.appStrings.completed, { "id": id })} text='Completed Camp' />
                 
                </MenuOptions>
              </Menu>
            </View>
          </MenuProvider>

        </View>
        {
          campData.length > 0 ?
            (
              <>

                <View>
                  <FlatList
                    inverted
                    data={campData}
                    renderItem={RenderCampList}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </>
            ) :
            <>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "70%" }}>
                <CustomText style={{ fontSize: 18, color: grey }}>No Camp Found,Please Create Camp.</CustomText>

              </View>
            </>

        }

        <View style={{ marginBottom: "15%" }}></View>
      </ScrollView>

      <Loader showHud={showProgress} />
    </SafeAreaView>
  )
}

const optionsStyles = {
  optionsContainer: {
    marginTop: 0, // Adjust this to position the menu below the icon
    padding: 5,
    width: "120%",
    borderRadius: 5,
    elevation: 5,

  },
  optionWrapper: {
    padding: 10,

  },
  optionText: {
    fontSize: 16,
  },
};

export default HomeScreen

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
  triggerText: {
    fontSize: 16,
    color: 'blue',
  },
  listItem: {
    margin: 12,
    padding: 10,
    shadowColor: black,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.65,
    elevation: 6,
    backgroundColor: white,
    width: "95%",
    // height: 360,
    borderRadius: 20,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    //flexDirection: "row",

  },

  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: black,

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