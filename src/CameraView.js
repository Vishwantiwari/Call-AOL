import React from 'react';
import {View, Text, Button} from 'react-native';

export default function CameraView({navigation}) {
  return (
    <View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 30}}>This is the home screen!</Text>
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Open Modal"
        />
      </View>
    </View>
  );
}
