import React, { useLayoutEffect } from 'react';
import {View, Text, Alert} from 'react-native';
import {color} from '../../utility';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { LogOutUser } from '../../network';
import { clearAsyncStorage } from '../../asyncStorage';

const Dashboard = ({navigation}) => {
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
    <View>
      <Text>Dashboard</Text>
    </View>

  );

};

export default Dashboard;