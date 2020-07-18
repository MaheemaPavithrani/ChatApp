import React, { useLayoutEffect } from 'react';
import {View, Text, Alert} from 'react-native';
import {color} from '../../utility';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

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
              onPress:()=>alert('logged out')
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
  return(
    <View>
      <Text>Dashboard</Text>
    </View>

  );

};

export default Dashboard;