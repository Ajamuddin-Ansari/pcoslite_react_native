import { SafeAreaView, StyleSheet, TextInput, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { black, dark_pink, grey, grey_Border, white } from '../../../../../lib/colors'
import CustomImage from '../../../../components/CustomImage'
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../../../components/CustomButton'
import { Dropdown } from 'react-native-element-dropdown';
import SimpleTextInput from '../../../../components/SimpleTextInput';
import moment from 'moment/moment';
import appStrings from '../../../../../lib/appStrings';
import UserAxios from '../../../../components/WsHelper/UserAxios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '../../../../components/AsyncStorage';
import AsyncStorageKeys from '../../../../../lib/AsyncStorageKeys';
import { navigationRef } from '../../../../../lib/RootNavigation';
import Loader from '../../../../components/Loader';
import { useFocusEffect } from '@react-navigation/native';

const UpdateBodyDetails = ({ route }) => {
    const [chest, setChest] = useState("");
    const [arm, setArm] = useState("");
    const [wrist, setWrist] = useState("");
    const [hip, setHip] = useState("");
    const [thigh, setThigh] = useState("");
    const [calf, setCalf] = useState("");
    const [weight, setWeight] = useState("");
    const [date, setDate] = useState(new Date());
    const [value, setValue] = useState(null);
    const [note, setNote] = useState('');
    const [id, setId] = useState('');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showProgress, setShowProgress] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        var seldate = moment(currentDate).format("YYYY-MM-DD");
        setDatePickerVisible(Platform.OS === 'ios');
        setDate(seldate);
        setSelectedDate(selectedDate);

    };

    const data = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },

    ];

    const userdata = async () => {
        try {
            const bodyDetails = route.params?.item;
            setDate(bodyDetails.date);
            setChest(bodyDetails.chest);
            setArm(bodyDetails.arm);
            setWrist(bodyDetails.wrist);
            setHip(bodyDetails.hip);
            setThigh(bodyDetails.thigh);
            setCalf(bodyDetails.calf);
            setWeight(bodyDetails.weight);
            setNote(bodyDetails.note);
            setValue(bodyDetails.week);
            setId(bodyDetails.id);



        } catch (error) {
            console.error("Error retrieving user data:", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            userdata();


            return () => false;
        }, [])
    );


    const updatebodydetails = async () => {

        try {
           
            const inputParams = {
                chest: chest,
                arm: arm,
                wrist: wrist,
                hip: hip,
                thigh: thigh,
                calf: calf,
                weight: weight,
                note: note

            };
            UserAxios.getResponse(
                `${appStrings.screens.api_names.update_body_details}/${id}`,
                inputParams,
                "post",
                (response, error) => {

                    if (!error) {
                        if (!response.error) {
                            console.log("resssss", response);
                            Toast.show(response.message)
                            navigationRef.current?.navigate(appStrings.screens.appStrings.weightScreen)
                        }
                    }
                    else {

                        if (error.name != undefined && error.name != null)
                            console.log("........", error.name);
                    }
                }
            )
        } catch (error) {
            console.error('Error editing weight:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>

                <View style={styles.view}>
                    <ScrollView>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 7 }}>


                            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', borderColor: grey_Border, borderWidth: 1, borderRadius: 10, width: "46%", height: 45 }}>
                                {/* Calendar Icon */}
                                <TouchableOpacity activeOpacity={1}
                                    onPress={() => {
                                        setDatePickerVisible(false)

                                    }}>
                                    <View style={{ left: 10 }}>
                                        <CustomImage
                                            source={require('../../../../../assets/date.png')}
                                            resizeMode="contain"
                                            style={{ width: 23, height: 23, borderRadius: 0 }}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TextInput
                                    value={date} // Format the date for display
                                    editable={false}
                                    placeholderTextColor={grey}
                                    placeholder='Select Date'
                                    placeholderStyle={{ color: grey_Border }}
                                    style={{ flex: 1, color: black, paddingLeft: 20, fontSize: 16 }}
                                />
                                {isDatePickerVisible && (
                                    <DateTimePicker
                                        value={selectedDate}
                                        disabled={true}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange}

                                    />
                                )}

                            </View>

                            <Dropdown
                                style={styles.dropdown}
                                disable={true}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={data}
                                labelField="label"
                                valueField="value"
                                placeholder={value ? value : 'Select Week'}
                                value={value}
                                onChange={(item) => {
                                    setValue(item.value);

                                }}
                            />

                        </View>

                        <View style={{ flexDirection: "row" }}>


                            <View style={{ width: "70%" }}>
                                <View style={{ marginTop: 10 }}>
                                    <SimpleTextInput
                                        placeholder="Chest (In inc)"
                                        containerStyle={{ height: 45, width: "65%", marginLeft: 5 }}
                                        value={chest}
                                        onChangeText={(text) => {
                                            setChest(text);
                                        }}
                                        keyboardType={"numeric"}

                                    />

                                </View>
                                <View>
                                    <SimpleTextInput
                                        placeholder="Arm (In inc)"
                                        containerStyle={{ height: 45, width: "65%", marginLeft: 5 }}
                                        value={arm}
                                        onChangeText={(text) => {
                                            setArm(text);
                                        }}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                                <View>
                                    <SimpleTextInput
                                        placeholder="Wrist (In inc)"
                                        containerStyle={{ height: 45, width: "65%", marginLeft: 5 }}
                                        value={wrist}
                                        onChangeText={(text) => {
                                            setWrist(text);
                                        }}
                                        keyboardType={"numeric"}

                                    />
                                </View>

                                <View>
                                    <SimpleTextInput
                                        placeholder="Hip (In inc)"
                                        containerStyle={{ height: 45, width: "65%", marginLeft: 5 }}
                                        value={hip}
                                        keyboardType={"numeric"}
                                        onChangeText={(text) => {
                                            setHip(text);
                                        }}

                                    />
                                </View>
                                <View>
                                    <SimpleTextInput
                                        placeholder="Thigh (In inc)"
                                        containerStyle={{ height: 45, width: "65%", marginLeft: 5 }}
                                        value={thigh}
                                        keyboardType={"numeric"}
                                        onChangeText={(text) => {
                                            setThigh(text);
                                        }}

                                    />
                                </View>
                                <View>
                                    <SimpleTextInput
                                        placeholder="Calf (In inc)"
                                        containerStyle={{ height: 45, width: "65%", marginLeft: 5 }}
                                        value={calf}
                                        keyboardType={"numeric"}
                                        onChangeText={(text) => {
                                            setCalf(text);
                                        }}

                                    />
                                </View>


                            </View>

                            <View style={{ marginTop: "10%" }}>
                                <CustomImage
                                    source={require('../../../../../assets/user/bodytrack.png')}
                                    resizeMode="contain"
                                    style={{ width: 87, height: 321 }}
                                />
                                <View>
                                    <SimpleTextInput
                                        placeholder="Weight (In Kg)"
                                        containerStyle={{ height: 45, width: "156%", right: 40 }}
                                        value={weight}
                                        onChangeText={(text) => {
                                            setWeight(text);
                                        }}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                            </View>
                        </View>

                        <SimpleTextInput
                            placeholder="Note"
                            containerStyle={{ height: 100, width: "94%", marginLeft: 7 }}
                            inputStyle={{ marginTop: -30 }}
                            value={note}
                            onChangeText={(text) => {
                                setNote(text);
                            }}

                        />
                    </ScrollView>
                </View>

            </View>
            <View style={{ bottom: 0, left: 0, right: 0, position: "absolute" }}>
                <CustomButton
                    title="Update"
                    onPress={() => updatebodydetails()}
                    buttonStyle={styles.buttonStyle}
                />
            </View>
            <Loader showHud={showProgress} />
        </SafeAreaView>

    )
}

export default UpdateBodyDetails

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
    view: {
        margin: 10,
        padding: 10,
        shadowColor: black,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.65,
        elevation: 6,
        backgroundColor: white,
        width: "92%",
        height: "90%",
        borderRadius: 30,
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingBottom: 15,
        marginTop: '4%'
    },
    dropdown: {
        height: 45,
        width: '46%',
        borderColor: grey_Border,
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 5,
        marginTop: 10,
        paddingHorizontal: 10,
        alignItems: "center",

    },
    placeholderStyle: {
        color: grey,
    },
    selectedTextStyle: {
        color: 'black',
    },
})
