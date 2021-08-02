import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Rem = function (props) {
    //const [dateswitch ,setDateSwitch]=useState(true)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    //button state
    const [b1, setBl] = useState(false);
    const [b2, setB2] = useState(false);
    //date state
    const [b1date, setb1Date] = useState('');
    const [b2date, setb2Date] = useState('');

    //============== showDatePicker ==================

    //get item from storage
    const gettime = async () => {
        try {
            const value1 = await AsyncStorage.getItem('b1');
            if (value1 !== null) {
                // value previously stored
                setb1Date(value1);
            }
            const value2 = await AsyncStorage.getItem('b2');
            if (value2 !== null) {
                // value previously stored
                setb2Date(value2);
            }
        } catch (e) {
            // error reading value
        }
    };
    gettime();
    const b1showDatePicker = () => {
        setBl(true);
        setDatePickerVisibility(true);
    };
    const b2showDatePicker = () => {
        setB2(true);
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    //date time formatter

    const FormatDate = (data) => {
        let dateTimeString =
            data.getDate() +
            '-' +
            (data.getMonth() + 1) +
            '-' +
            data.getFullYear() +
            ' ' +
            data.getHours() +
            ':' +
            data.getMinutes();
        return dateTimeString;
    };

    //
    const handleConfirm = async (date) => {
        const d = FormatDate(date);
        console.log(d);
        if (b1 === true) {
            try {
                //console.warn('A date has been picked: ', d);
                await AsyncStorage.setItem('b1', d);
                setb1Date(d);
                setBl(false);
                hideDatePicker();
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                //console.warn('A date has been picked: ', d);
                await AsyncStorage.setItem('b2', d);
                setb2Date(d);
                setB2(false);
                hideDatePicker();
            } catch (err) {
                console.log(err);
            }
        }
    };



    return (
        <View >
            <View style={styles.button_container}>
                <TouchableOpacity onPress={b1showDatePicker}>
                    <Text style={styles.button}>reminder 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={b2showDatePicker}>
                    <Text style={styles.button}>reminder 2</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>{b1date}</Text>
            <Text style={styles.text}>{b2date}</Text>
            <DateTimePickerModal
                is24Hour={true}
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );

}
const styles = StyleSheet.create({
    button_container: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'space-between',
    },
    text: { fontSize: 24 },
    button: {
        fontSize: 18,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        //alignSelf: 'flex-start',
        marginHorizontal: '1%',
        marginBottom: 6,
        backgroundColor: '#3483eb',
        width: 150,
        height: 40,
        color: 'white',
        textAlign: 'center',
    },

})

export default Rem;

