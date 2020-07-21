import React, { useLayoutEffect, useContext, useState, useEffect } from 'react';
import {Alert, SafeAreaView, FlatList} from 'react-native';
import {color, globalStyle} from '../../utility';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { LogOutUser } from '../../network';
import { clearAsyncStorage } from '../../asyncStorage';
import firebase from '../../firebase/config';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { uuid } from '../../utility/constants';
import { Profile, ShowUsers } from '../../component';
import ImagePicker from 'react-native-image-picker';

const Dashboard = ({navigation}) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;

  const [usrDetail,setUserDetail] = useState({
    id:'',
    name:'',
    profileImg:''
  });

  const {name, profileImg} = setUserDetail;
  const [allUsers, setAllUsers] = useState([]); 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SimpleLineIcon 
          name="logout" 
          size={26} 
          color={color.WHITE}
          style={{right:10}}
          onPress={()=> 
            Alert.alert(
              'logout', 
              'Are you sure to log out',
          [
            {
              text: 'Yes',
              onPress:()=> logout(),
            },
            {
              text: 'No'
            }
          ],{
            cancelabel:false
          }
          )}
          /> 
      ),
    });
  }, [navigation]);

  useEffect(()=>{
    dispatchLoaderAction({
      type: LOADING_START,
    });
    try {
      firebase
      .database()
      .ref('users')
      .on('value',(dataSnapShot)=>{
        let users = [];
        let currentUser = {
          id:'',
          name:'',
          profileImg:'',
        }
        dataSnapShot.forEach((child)=>{
          if(uuid === child.val().uuid){
            currentUser.id = uuid;
            currentUser.name = child.val().name;
            currentUser.profileImg = child.val().profileImg;
          }
          else{
            users.push({
              id: child.val().uuid,
              name: child.val().name,
              profileImg: child.val().profileImg,            
            }) ;          
          }
        });
        setUserDetail(currentUser)
        setAllUsers(users);
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
      });
      
    } catch (error) {
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
      alert(error) 
    }
  },[]);

  //* log out

  const logout = () => {
    LogOutUser()
    .then(()=>{
      clearAsyncStorage()
      .then(()=>{
        navigation.replace('Login');
      })
      .catch((err)=>alert(err));
    })
    .catch((err)=>alert(err));
  };


  return(
    <SafeAreaView style={[globalStyle.flex1,{backgroundColor:color.BLACK}]}>
      <FlatList
      alwaysBounceVertical = {false}
      data = {allUsers}
      keyExtractor = {(_,index)=>index.toString()}
      ListHeaderComponent={
        <Profile
        img = {profileImg}
        name = {name}
        />
      }
      renderItem = {({item})=>(
        <ShowUsers
        name = {item.name}
        img = {item.profileImg}
        />
      )}
      />

    </SafeAreaView>

  );

};

export default Dashboard;