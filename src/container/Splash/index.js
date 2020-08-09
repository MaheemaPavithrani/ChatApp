import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import { Logo } from '../../component';
import { globalStyle, color } from '../../utility';
import { getAsyncStorage, keys } from '../../asyncStorage';
import { setUniqueValue } from '../../utility/constants';

const Splash = ({navigation}) => {
  useEffect(()=>{
    const redirect = setTimeout(()=>{
      getAsyncStorage(keys.uuid)
      .then((uuid)=>{
        if(uuid){
          setUniqueValue(uuid);
          navigation.replace('Dashboard');

        }
        else{
          navigation.replace('Login');

        }
      })
      .catch((err)=>{
        console.log(err);
        navigation.replace('Login');
      });
    },6000);
    return () => clearTimeout(redirect);
  },[navigation])
  return(
    <View
    style={[globalStyle.containerCentered, {backgroundColor:color.BLACK}]
    }>

      <Logo />
      <Text style={{
            fontSize: 24,
            padding:30,
            fontWeight: 'bold',
            color: color.LIGHT_GREEN,
          }}> Pavithrani D.V.M.</Text>
      <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: color.LIGHT_GREEN,
          }}> 17001242 </Text>
    </View>

  )
}

export default Splash;