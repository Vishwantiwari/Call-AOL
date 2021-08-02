import React from 'react';
import {FlatList, Text, View} from 'react-native';

const ListItemView = function ({data}) {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={key => key.id}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.title}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ListItemView;
