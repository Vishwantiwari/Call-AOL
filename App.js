import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
// import type {Node} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import Camera from './src/Camera';
import LoginScreen from './src/Screens/auths/Login';
import VerifyOTP from './src/Screens/auths/VerifyOTP';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Dashboard from './src/Dashboard';
import ContactScreen from './src/ContactScreen';
import CallLogView from './src/CallLogView';
import Sidedrawer from './src/Sidedrawer';
const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
             <Stack.Screen name="Login" component={LoginScreen} />
             <Stack.Screen name="VOTP" component={VerifyOTP} options={{headerLeft: () => null}} />
             <Stack.Screen name="Home" component={HomeScreen} options={{headerLeft: () => null}} />
             <Stack.Screen name="Camera" component={Camera}  />
             
             <Stack.Screen name="Dashboard" component={Dashboard} options={{headerLeft: () => null}} />
             <Stack.Screen name="CallLogView" component={CallLogView}  />
             <Stack.Screen name="ContactScreen" component={ContactScreen}  />
             
            
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default App;
