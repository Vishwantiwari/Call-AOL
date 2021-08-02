import React,{useEffect,useState} from 'react';
import {View, Text, StyleSheet,StatusBar,FlatList,TouchableOpacity} from 'react-native';
import ListItemView from './component/ListItem';
import CallLogs from 'react-native-call-log';
import { PermissionsAndroid } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default function CallLogView({route}) {
  const params = route;
  const CallLogView = params;
  const initialValue = [
    {
      index: 0,
      name: '',
      phoneNumber:'',
      duration:0,
      isSelected:false,
      statecon:'NO'
    },
  ];
  const [logs, setLogs] = useState(initialValue);
  useEffect(() => {
    (async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          {
            title: 'Call Log Example',
            message:
              'Access your call logs',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

          //change load()=>loadAll() for loading the entire call logs
          CallLogs.load(10).then(c => {
            console.log(c);
            const modififiedLogs = c.map((item, index) => {
              const isSelected=false;
              const statecon='No';
              return { 
                name: item.name,
                phoneNumber:item.phoneNumber,
                duration:item.duration, 
                index: index, 
                isSelected:isSelected, 
                statecon:statecon };
            });
            console.log(modififiedLogs);
            setLogs(modififiedLogs);
          });
        } else {
          console.log('Call Log permission denied');
        }
      }
      catch (e) {
        console.log(e);
      }
    })()
  }, []);
  console.log('log state ===>  ',logs);
  const selectionLogHandler = (i)=>{
    let arr=logs.map((item)=>{
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
    setLogs(arr);
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
        data={logs}
        keyExtractor={item => item.index}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity 
            style={style.touchstyle}
            onPress={()=>{
              selectionLogHandler(item);
              }}
            >
              <Text style={style.title}>
                {item.index}={item.phoneNumber}
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
