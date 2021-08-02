'use strict';
import React, {PureComponent, useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

export default function Camera(props) {
  const [returnScreen,setreturnScreen]=useState('');
  const [cam, setCam] = useState(RNCamera.Constants.Type.back);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const [client,setClient] = useState('');

  const setScreen =()=>{
    if(props.route.client==="Signup"){
      return("Signup");
    }
  }
  //console.log(returnScreen);
  useEffect(()=>{
    setreturnScreen(setScreen());
  });
  
  const takePicture = async function (camera) {
    const options = {quality: 1, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    const uri = data.uri
    console.log('============')
    console.log(uri+'uri');
    console.log('============')
    props.navigation.navigate(returnScreen,{'data':data.uri});
    
  };

  const toggleFlashlight = () => {
    if (flash == RNCamera.Constants.FlashMode.off) {
      setFlash(RNCamera.Constants.FlashMode.on);
    } else {
      setFlash(RNCamera.Constants.FlashMode.off);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={cam}
        flashMode={flash}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') {
            return <PendingView />;
          }
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 12}}> Snap </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleFlashlight()}
                style={styles.capture}>
                <Text style={{fontSize: 12}}> Flash </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf:'flex-end',
    margin: 40,
  },
});
