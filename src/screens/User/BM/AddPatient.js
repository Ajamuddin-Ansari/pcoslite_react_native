/* eslint-disable prettier/prettier */
import { View, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import CustomButton from '../../../components/CustomButton';
import appStrings from '../../../../lib/appStrings';
import AsyncStorage from '../../../components/AsyncStorage';
import AsyncStorageKeys from '../../../../lib/AsyncStorageKeys';
import { black, dark_pink, green, grey, grey_Border, primary, red, white } from '../../../../lib/colors';
import Loader from '../../../components/Loader';
import { navigationRef } from '../../../../lib/RootNavigation';
import CustomImage from '../../../components/CustomImage';
import { launchImageLibrary } from 'react-native-image-picker';
import UserAxios from '../../../components/WsHelper/UserAxios';
import { useFocusEffect } from '@react-navigation/native';
import SimpleTextInput from '../../../components/SimpleTextInput';
import CustomText from '../../../components/CustomText';


const AddPatient = ({ route }) => {
    const [patientName, setPatientName] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [showProgress, setShowProgress] = useState(false);
    const [imageURI, setImageURI] = useState(null);
    const [bmi, setBmi] = useState('');
    const [message, setMessage] = useState('');
    const [campId, setCampId] = useState('');
    const [body_fat_percentage, setBodyfatPercentage] = useState('');
    const [muscle_rate, setMuscleRate] = useState('');
    const [moisture, setMoisture] = useState('');
    const [bone_mass, setBoneMass] = useState('');
    const [bmr, setBMR] = useState('');
    const [protein_rate, setProteinRate] = useState('');
    const [body_age, setBodyAge] = useState('');
    const [visceral_fat_index, setVisceralFatIndex] = useState('');
    const [subcutaneous_fat, setSubcutaneousFat] = useState('');







    const userdata = async () => {
        const Cid = await AsyncStorage.getData(AsyncStorageKeys.campId);
        // console.log("username", Cid);
        setCampId(Cid)
    }

    useFocusEffect(
        React.useCallback(() => {
            userdata();
            return () => false;
        }, [])
    );

    // console.log("CampID", campId);

    useEffect(() => {
        calculateBMI();
    }, [height, weight]);

    const calculateBMI = () => {
        if (height && weight) {
            const heightInMeters = parseFloat(height) / 100;
            const weightInKg = parseFloat(weight);
            if (!isNaN(heightInMeters) && !isNaN(weightInKg) && heightInMeters > 0 && weightInKg > 0) {
                const bmiValue = weightInKg / (heightInMeters * heightInMeters);
                setBmi(bmiValue.toFixed(2));
                determineBMICategory(bmiValue);
            } else {
                setBmi(null);
                setMessage('');
            }
        } else {
            setBmi(null);
            setMessage('');
        }
    };

    const determineBMICategory = (bmi) => {
        if (bmi < 18.5) {
            setMessage('You are underweight.');
        } else if (bmi >= 18.5 && bmi < 24.9) {
            setMessage('You have a normal weight.');
        } else if (bmi >= 25 && bmi < 29.9) {
            setMessage('You are overweight.');
        } else {
            setMessage('You are obese.');
        }
    };

    // useFocusEffect(
    //     React.useCallback(() => {

    //       doctorList();

    //       return () => false;
    //     }, [])
    //   );

    //   const doctorList = async () => {
    //     try {
    //       const inputParams = {};
    //       UserAxios.getResponse(
    //         `${appStrings.screens.api_names.doctor_list}`,
    //         inputParams,
    //         "get",
    //         (response, error) => {

    //           if (!error) {
    //             if (!response.error) {
    //               const doctorOptions = response.doctors.map((doctor) => ({
    //                 label: doctor.name,
    //                 value: doctor.id,
    //               }));
    //               setDoctorName(doctorOptions);
    //             } else {
    //               console.log("Error", response.Error);
    //             }

    //           }
    //           else {

    //             if (error.name != undefined && error.name != null)
    //               console.log("........", error.name);
    //           }

    //         }
    //       )
    //     } catch (error) {
    //       console.error('Error creating camp:', error);
    //     }
    //   };


    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 1000,
            maxHeight: 1000,
            quality: 0.7,
        };

        // Launch the image picker
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            // Handle different scenarios
            if (response.didCancel) {
                alert('User cancelled image picker');
                return;
            } else if (response.errorCode) {
                alert(`Error: ${response.errorCode}`);
                return;
            } else if (response.assets && response.assets.length > 0) {
                // Set the image URI from the response
                setImageURI(response.assets[0].uri);
            } else {
                alert('Unexpected response from image picker');
            }
        });
    };


    const addPatient = async () => {

        const ID = await AsyncStorage.getData(AsyncStorageKeys.customer_id);
        const user_id = JSON.parse(ID) || [];
        setShowProgress(true);
        // Create a new FormData object
        const formData = new FormData();

        // Add patient data
        formData.append('name', patientName);
        formData.append('mobile', mobile);
        formData.append('address', address);
        formData.append('age', age);
        formData.append('weight', weight);
        formData.append('height', height);
        formData.append('doctor_id', 0);
        formData.append('camp_id', campId);
        formData.append('user_id', user_id);
        formData.append('bmi', bmi);

        ///// other measures ///
        formData.append('body_fat_percentage', body_fat_percentage);
        formData.append('muscle_rate', muscle_rate);
        formData.append('moisture', moisture);
        formData.append('bone_mass', bone_mass);
        formData.append('bmr', bmr);
        formData.append('protein_rate', protein_rate);
        formData.append('body_age', body_age);
        formData.append('visceral_fat_index', visceral_fat_index);
        formData.append('subcutaneous_fat', subcutaneous_fat);

        // Add image data
        if (imageURI) {
            // Determine the file name and type (extension) of the image
            const fileName = imageURI.split('/').pop();
            const fileType = fileName.split('.').pop();

            // Append the image file to the FormData object
            formData.append('image', {
                uri: Platform.OS === 'ios' ? imageURI : 'file://' + imageURI,
                name: fileName,
                type: `image/${fileType}`,
            });
        }

        console.log("Form Data====",formData)

        //Send a POST request with the form data
        UserAxios.getResponse(
            `${appStrings.screens.api_names.add_patient}`,
            formData,
            "post",
            (response, error) => {


                if (!error) {
                    if (!response.error) {

                        if (response.status === 200) {
                            Toast.show(response.message)
                            navigationRef.current?.navigate(appStrings.screens.appStrings.patientDetails)

                        } else if (response.status === 401) {
                            const errorMessage =
                                (response.message.name && response.message.name[0]) ||
                                (response.message.mobile && response.message.mobile[0]) ||
                                (response.message.age && response.message.age[0]) ||
                                (response.message.height && response.message.height[0]) ||
                                (response.message.weight && response.message.weight[0]) ||

                                'An unknown error occurred';
                            // console.log("hello");
                            Toast.show(errorMessage);
                        }


                    } else {

                        console.log("Error", response.error);
                    }

                }
                else {

                    if (error.name != undefined && error.name != null)
                        console.log("........", error.name);
                }
                setShowProgress(false);
            }
        )

    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
           <KeyboardAvoidingView style={{ flex: 1}} behavior='padding' >
            <View style={styles.view}>
                <ScrollView>
                    <View style={{ alignSelf: 'center' }}>
                        <CustomImage
                            source={imageURI ? { uri: `${imageURI}` } : require('../../../../assets/profile.png')}
                            resizeMode="contain"
                            style={{ width: 110, height: 110, borderRadius: 55, borderWidth: 0.3, borderColor: grey_Border, alignSelf: 'center' }}
                        />
                        <TouchableOpacity
                            onPress={() => chooseFile('photo')}
                            style={{ bottom: 0, right: 0, position: "absolute" }}>
                            <CustomImage
                                source={require('../../../../assets/photo.png')}
                                resizeMode="contain"
                                style={{ width: 40, height: 40, alignSelf: 'flex-end' }}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{ marginTop: 10 }}>

                        <SimpleTextInput
                            placeholder="Enter name*"
                            containerStyle={{ height: 50, width: "92%", marginLeft: 12 }}
                            value={patientName}
                            inputStyle={styles.input}
                            onChangeText={(text) => {
                                setPatientName(text);
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 3 }}>

                        <SimpleTextInput
                            placeholder="Enter Mobile Number*"
                            containerStyle={{ height: 50, width: "92%", marginLeft: 12 }}
                            value={mobile}
                            keyboardType={"numeric"}
                            maxLength={10}
                            inputStyle={styles.input}
                            onChangeText={(text) => {
                                setMobile(text);
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 3 }}>

                        <SimpleTextInput
                            placeholder="Enter Local Address"
                            containerStyle={{ height: 50, width: "92%", marginLeft: 12 }}
                            value={address}
                            inputStyle={styles.input}
                            onChangeText={(text) => {
                                setAddress(text);
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>

                        <SimpleTextInput
                            placeholder="Enter Age*"
                            containerStyle={{ height: 50, width: "92%", marginLeft: 12 }}
                            value={age}
                            inputStyle={styles.input}
                            keyboardType={"numeric"}
                            onChangeText={(text) => {
                                setAge(text);
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ marginTop: 3 }}>

                            <SimpleTextInput
                                placeholder="Enter Height*(cm)"
                                keyboardType={"numeric"}
                                containerStyle={{ height: 50, width: 149, marginLeft: 12 }}
                                value={height}
                                inputStyle={styles.input}
                                onChangeText={(text) => {
                                    setHeight(text);
                                }}
                            />
                        </View>

                        <View style={{ marginTop: 3 }}>
                            <SimpleTextInput
                                placeholder="Enter Weight*(Kg)"
                                keyboardType={"numeric"}
                                inputStyle={styles.input}
                                containerStyle={{ height: 50, width: 149, marginRight: 18 }}
                                value={weight}
                                onChangeText={(text) => {
                                    setWeight(text);
                                }}
                            />
                        </View>

                    </View>

                    <View style={{ marginTop: 3 }}>
                        <View style={styles.bmi}>
                            {
                                bmi ? (
                                    <CustomText style={{ fontSize: 14, marginLeft: 15 }}>BMI : {bmi} kg/m2</CustomText>
                                ) :
                                    <CustomText style={{ fontSize: 14, marginLeft: 15, color: grey }}>BMI </CustomText>
                            }

                        </View>

                        <CustomText style={{ fontSize: 14, marginLeft: 15, fontWeight: "bold" }}>{message}</CustomText>
                    </View>


                    <View style={{  }}>

                        <SimpleTextInput
                            placeholder="Enter Body fat percentage"
                            containerStyle={{ height: 50, width: "92%", marginLeft: 12 }}
                            value={body_fat_percentage}
                            inputStyle={styles.input}
                            keyboardType={"numeric"}
                            onChangeText={(text) => {
                                setBodyfatPercentage(text);
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>

                        <SimpleTextInput
                            placeholder="Enter Muscle rate"
                            containerStyle={{ height: 50, width: "92%", marginLeft: 12 }}
                            value={muscle_rate}
                            inputStyle={styles.input}
                            keyboardType={"numeric"}
                            onChangeText={(text) => {
                                setMuscleRate(text);
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>

                        <SimpleTextInput
                            placeholder="Enter Moisture"
                            containerStyle={{ height: 50, width: "92%", marginLeft: 12 }}
                            value={moisture}
                            inputStyle={styles.input}
                            keyboardType={"numeric"}
                            onChangeText={(text) => {
                                setMoisture(text);
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>

                        <SimpleTextInput
                            placeholder="Enter Bone mass"
                            containerStyle={{ height: 50, width: "92%", marginLeft: 12 }}
                            value={bone_mass}
                            inputStyle={styles.input}
                            keyboardType={"numeric"}
                            onChangeText={(text) => {
                                setBoneMass(text);
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>

                        <SimpleTextInput
                            placeholder="Enter BMR"
                            containerStyle={{ height: 50, width: "92%", marginLeft: 12 }}
                            value={bmr}
                            inputStyle={styles.input}
                            keyboardType={"numeric"}
                            onChangeText={(text) => {
                                setBMR(text);
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>

                        <SimpleTextInput
                            placeholder="Enter Protein rate"
                            containerStyle={{ height: 50, width: "92%", marginLeft: 12 }}
                            value={protein_rate}
                            inputStyle={styles.input}
                            keyboardType={"numeric"}
                            onChangeText={(text) => {
                                setProteinRate(text);
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>

                        <SimpleTextInput
                            placeholder="Enter Body age"
                            containerStyle={{ height: 50, width: "92%", marginLeft: 12 }}
                            value={body_age}
                            inputStyle={styles.input}
                            keyboardType={"numeric"}
                            onChangeText={(text) => {
                                setBodyAge(text);
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>

                        <SimpleTextInput
                            placeholder="Enter Visceral fat index"
                            containerStyle={{ height: 50, width: "92%", marginLeft: 12 }}
                            value={visceral_fat_index}
                            inputStyle={styles.input}
                            keyboardType={"numeric"}
                            onChangeText={(text) => {
                                setVisceralFatIndex(text);
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>

                        <SimpleTextInput
                            placeholder="Enter Subcutaneous fat"
                            containerStyle={{ height: 50, width: "92%", marginLeft: 12 }}
                            value={subcutaneous_fat}
                            inputStyle={styles.input}
                            keyboardType={"numeric"}
                            onChangeText={(text) => {
                                setSubcutaneousFat(text);
                            }}
                        />
                    </View>



                </ScrollView>
            </View>
             
            </KeyboardAvoidingView>
            <View style={{ bottom: 0, position: "absolute", width: "100%" }}>

                <CustomButton
                    title="Add"
                    onPress={() => addPatient()}
                    buttonStyle={styles.buttonStyle}
                />
            </View>

            <Loader showHud={showProgress} />
        </SafeAreaView>
    );
};

export default AddPatient;

const styles = StyleSheet.create({
    buttonStyle: {
        width: '90%',
        paddingVertical: 12,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: dark_pink,
        marginBottom: 20
    },
    placeholderStyle: {
        color: green,
        fontSize: 14,
        fontFamily: "regular",
    },
    dropdown: {
        borderBottomWidth: 1,
        borderColor: primary,
        marginTop: 8,
        paddingBottom: 3,

    },
    input: {
        fontSize: 14,
        paddingLeft: -8
    },
    selectedTextStyle: {
        fontSize: 14,
        fontFamily: "regular",
        color: "#4F4F4F",

    },
    inputSearchStyle: {
        fontSize: 14,
        color: "#4F4F4F",
        fontFamily: "regular",
    },
    itemTextStyle: {
        fontSize: 14,
        color: "#4F4F4F",
        fontFamily: "regular"
    },
    labelStyle: {
        marginTop: 25,
        fontSize: 16,
        color: black,
    },
    labelErrorStyle: {
        marginTop: 25,
        fontSize: 16,
        color: red,
    },
    view: {
        margin: 10,
        padding: 10,
        shadowColor: black,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.65,
        elevation: 6,
        backgroundColor: white,
        width: "94%",
        height: "86%",
        borderRadius: 30,
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingBottom: 15
    },
    bmi: {
        marginVertical: 10,
        borderWidth: 1,
        marginLeft: 12,
        borderRadius: 10,
        borderColor: grey_Border,
        height: 55,
        width: "91%",
        flexDirection: 'row',
        alignItems: 'center',

    }
});