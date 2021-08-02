import React from 'react';
import { StyleSheet, View } from 'react-native';
import Rem from './component/Rem';

const ReminderScreen = function () {
  return (
    <View>
      <Rem title="reminder 1" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});

export default ReminderScreen;
