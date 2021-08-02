import React, { useState, useEffect } from 'react';
import BottomDrawer from 'react-native-bottom-drawer-view';
import {Button, TextInput, Paragraph, Dialog, Portal ,FAB, Headline , ActivityIndicator} from 'react-native-paper';
import { KeyboardAvoidingView   } from 'react-native';


// Import all required component
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  BackHandler,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import Contacts from 'react-native-contacts';
import ListItemView from './component/ListItem'
import { ScrollView } from 'react-native';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import instance from './api/connection';
import { callNumber } from './utils/dialNumber';
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

const ContactScreen = function ({ navigation , route }){

  const initialValue = [
    { 
      name: '',
      index: 0,
      isSelected:false,
      statecon:'NO'
    },
  ];
  const [con, setContacts] = useState(initialValue);
  const [isVisible,setIsVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [Num, setNum] = useState('');
  const [data, setData] = useState([]);
  const[email,setEmail]=useState("");
  const[name,setName]=useState("");
  const[contactNo,setContactNo]=useState("");
  const [results,setResults]=useState([]);
  const [description,setDescription]=useState("");
  const [flag,setFlag]=useState(true);
  const mobileNo= route.params.userNo ;
  console.log(mobileNo)
  console.log(flag)

  useEffect(() => {
    getApi();
  }, [flag]);

  // useEffect(() => {
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //     title: 'Contacts',
  //     message: 'This app would like to view your contacts.',
  //     buttonPositive: 'Please accept bare mortal',
  //   });
  //   Contacts.getAll().then(contacts => {
  //     // contacts returned
  //     const modififiedContacts = contacts.map((item, index) => {
  //       const isSelected=false;
  //       const statecon='No';
  //       return { name: item.displayName, index: index, isSelected:isSelected, statecon:statecon };
  //     });
  //     setContacts(modififiedContacts);
  //   });
  // }, []);
  //issue ==>> displays 1
  //console.log('=================================================');
  const selectionHandler = (i)=>{
    let arr=con.map((item)=>{
      if(item.index===i.index){
        if(item.isSelected===false){
          item.isSelected=true;
          item.statecon='YES';
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
  const submitApi= async()=>{
    try{
      const response=await instance.post('/contact',{mobileNo,contactNo,name,email,description})
      .then(setFlag(!flag));
    }catch(err){
      console.log(err);
    }};
  const getApi= async()=>{
    try{
      const response=await instance.post('/alldata',{mobileNo});
      setResults(response.data.user.contacts)
      console.log(results);
    }catch(err){
      console.log(err);
    }};


  
  return (  
    <KeyboardAvoidingView style={style.container}>
      
      
          {!results.length ?   <ActivityIndicator animating={true} />
: 

      ( <View >
          <FlatList
            data={results}
            keyExtractor={(results) => results.id}
            renderItem={({ item }) => (
              <>
              <View style={style.card}>
                <View style={style.headCard}>
              
              <Headline style={style.head}>{item.name}</Headline>
              <Text style={style.colorGreay}>{item.email}</Text>
              <Text style={style.colorGreay}>{item.contactNo}</Text>
              <Text style={style.colorGreay}>{item.description}</Text>
              </View>
             
              <View >
                <FAB icon="phone"style={style.fab1} onPress={()=>callNumber(item.contactNo)}></FAB>
                <FAB icon="delete"style={style.fab2} onPress={()=>callNumber(item.contactNo)}></FAB>
              </View> 
            
                    
              </View>
              </>
            )}
          />
        </View>
      )}
      <FAB small icon="plus" style={style.fab} onPress={()=> setIsVisible(!isVisible)} />
      {/* <Portal>
      <Dialog visible={isVisible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>This is simple dialog</Paragraph>
        </Dialog.Content>
      </Dialog>
    </Portal> */}
  {isVisible && <>
      <BottomDrawer startUP ={false} containerHeight={500} offset={49}>
        <ScrollView>
        <View>
          <Text style={{margin:10,marginLeft:20}}>Add User</Text>
          <TextInput
            placeholder="Name :"
            value={name}
            onChangeText={(text)=>setName(text)}
            autoCorrect={false}
          />
          <TextInput
            placeholder="E-mail  :"
            value={email}
            onChangeText={(text)=>setEmail(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            placeholder="Phone Number :"
            value={contactNo}
            onChangeText={(text)=>setContactNo(text)}
          />
          <TextInput
            placeholder="Description :"
            value={description}
            onChangeText={(text)=>setDescription(text)}
          />
          <Text>Upload By :</Text>
          <View style={style.buttonViewContainer}>
          <Button style={style.roundButton}mode="contained"
          onPress={() => navigation.navigate('CallLogView')}
          >Call Logs</Button>
          <Button style={style.roundButton}mode="contained"
          onPress={() => navigation.navigate('ContactScreen',{"number":mobileNo})}
          >Contacts</Button>
          <Button style={style.roundButton}mode="contained"
          onPress={() => console.log('Pressed')}
          >File</Button>
          </View>

          
          <TouchableOpacity
            style={style.btn}
            onPress={({name,email,mobileNo,contactNo,description})=>submitApi({name,email,mobileNo,contactNo,description})}
          >
            <Text style={style.txt}>Submit</Text>
          </TouchableOpacity>
          </View>
          </ScrollView>
          </BottomDrawer>
          </>
}
    </KeyboardAvoidingView>
    
    
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
  head:{
    color: '#333',
  },
  headCard:{
  marginLeft: 70,
  },
  otherData:{
    color: '#e3e3e3',
    marginTop: '10%',
  },
  colorGreay:{
  color : '#757171',
  },
  card:{
    flexDirection: 'row',
    marginBottom: "5%",
    borderLeftWidth: 5,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingTop: 10,
    marginLeft: 5, 
    borderRadius: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fab1:{
    right:340,
    },
    fab2:{
      bottom:55,
      right:20
      
    },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#e3e3e3',
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
  btn:{
    height:50,
    width:100,
    backgroundColor:'blue',
    justifyContent:'center',
    borderRadius:15,
    alignSelf:'center',
    marginTop:10,
    
    
  },
  txt:{
    textAlign:'center',
    color:'white',
    fontWeight:'bold'
  },
  buttonViewContainer : {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  roundButton: {
    width: 130,
    height: 70,
    justifyContent: 'center',
    // alignSelf: 'flex-start',
    // alignItems: 'center',
    padding: 0,
    borderRadius:30,
    backgroundColor: '#90EE90',
  }


});

export default ContactScreen;

