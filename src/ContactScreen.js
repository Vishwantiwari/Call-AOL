import React, { useState, useEffect } from 'react';

// Import all required component
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import Contacts from 'react-native-contacts';
import instance from './api/connection';
import ListItemView from './component/ListItem'
const ContactScreen = function ({navigation,route}) {
  var contactNo="";
  var name="";
  const mobileNo=route.params.number;
  const submitApi= async()=>{
    try{
      const response=await instance.post('/contact',{mobileNo,contactNo,name});
      console.log(response);
    }catch(err){
      console.log(err);
    }};
  const initialValue = [
    {
      name: '',
      index: 0,
      isSelected:false,
      statecon:'NO'
    },
  ];
  const [con, setContacts] = useState(initialValue);
  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    });
    Contacts.getAll().then(contacts => {
      // contacts returned
      const modififiedContacts = contacts.map((item, index) => {
        const isSelected=false;
        const statecon='No';
        return { name: item.displayName, index: index, isSelected:isSelected, statecon:statecon ,contact: item.phoneNumbers };
      });
      setContacts(modififiedContacts);
    });
  }, []);
  //issue ==>> displays 1
  //console.log('=================================================');
  const selectionHandler = (i)=>{
    let arr=con.map((item)=>{
      if(item.index===i.index){
        if(item.isSelected===false){
          item.isSelected=true;
          item.statecon='YES';
          if(!item.contact.length){
            console.log("Please Manually Enter this Contact There was Some Error");
          }else{
            contactNo=(item.contact[0].number);
            contactNo = contactNo.replace(/ +/g, "");
            contactNo=contactNo.slice(3,);
            name=item.name;
            console.log(name,contactNo,mobileNo);
            submitApi({mobileNo,contactNo,name});
          }
          return({...item});
        }else{
          item.isSelected=true;
          item.statecon='NO';
          return({...item});
        }
      }
      return({...item});
    })
    setContacts(arr);
    //console.log('con=> ',con);
  }
  
  return (
    <View style={style.container}>
      {/**uncomment the below code if you dont want to use flatlist */}
      {/**<ListItemView
      data={con}
      key={{item => item.index}}
      display={{item.name}={item.index}}
    /> */}
      <FlatList
        data={con}
        keyExtractor={item => item.index}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity 
            style={style.touchstyle}
            onPress={()=>{
              selectionHandler(item);
              }}
            >
              <Text style={style.title}>
                {item.name}={item.index}
              </Text>
              <Text style={style.title}>{item.statecon}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  touchstyle:{
    marginTop:'5%',
    marginLeft:'10%',
    marginRight:'10%',
    height:50,
    width:'80%',
    borderRadius:4,
    backgroundColor:'green',
    justifyContent:'space-between',
    paddingHorizontal:25,
    flexDirection:'row',
    alignItems:'center',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color:'white',
    fontSize: 18,
  },
});

export default ContactScreen;
