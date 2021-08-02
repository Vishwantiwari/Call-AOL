import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function TempView({navigation}) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.row}>
        <Button
          title="Go Home"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        />
        <Button
          title="Go Home"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        />
        <Button
          title="Go Home"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
});
