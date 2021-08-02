import React, { useState } from 'react';
import { View, TouchableOpacity, Text ,Alert,BackHandler } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, ThemeProvider, Input } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import connectionApi from '../../api/connection';
BackHandler.addEventListener('hardwareBackPress', function() {
  Alert.alert(
    'Do you want to Exit the APP?',
    'Are You Sure?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
    }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
    }, ], {
        cancelable: false
    }
 )
 return true;
})


const Login = ({ navigation }) => {
  // If null, no SMS has been sent
  //const [confirm, setConfirm] = useState(true);
  const [phoneNumber, addPhoneNumber] = useState('+91');
  const GetOTP = () => {
    if (phoneNumber && phoneNumber.length === 13) {
      navigation.navigate('VOTP', { phoneNumber });
    }
    else { alert('Please enter 10 digit phone number'); }

  };
  return (
    <View style={style.viewContainer}>
      <ThemeProvider>
        <TextInput
          label="enter mobile number"
          mode="outlined"
          value={phoneNumber}
          onChangeText={(text) => {
            addPhoneNumber(text);
          }}
          keyboardType="number-pad"
        />
        <View style={style.btnContainer}>
          <Button
            title="     Get OTP !     "
            onPress={() => {
              console.log('works');
              console.log(phoneNumber);
              GetOTP();
            }}
          />
          
        </View>
      </ThemeProvider>
    </View>
  );
};

const style = StyleSheet.create({

  viewContainer: {
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
    flex: 1,
    justifyContent: 'center',
  },
  btnContainer: {
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf:'center'
  },
  btnText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Login;
