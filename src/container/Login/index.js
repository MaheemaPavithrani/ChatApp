import React, { useState, useContext } from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {globalStyle, color} from '../../utility';
import {Logo, InputField, RoundCornerButton} from '../../component';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { LoginRequest } from '../../network';
import { setUniqueValue } from '../../utility/constants';
import { setAsyncStorage, keys } from '../../asyncStorage';


const Login = ({navigation}) => {

  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const {email,password} = credentials;

  onLoginPress = () =>{
    if (!email){
      alert('Email is required');
    }
    else if(!password){
      alert('Password is required');
    }
    else{
      dispatchLoaderAction({
        type: LOADING_START,
      });
      LoginRequest(email,password)
      .then((res)=>{
        setAsyncStorage(keys.uuid, res.user.uid);
        setUniqueValue(res.user.uid);
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
        navigation.replace("Dashboard");
      })
      .catch((err)=>{
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
        alert(err); 
      })
    }
  };

  const handleOnChange = (name, value) =>{
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return(
    <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.BLACK}]
    }>
      <View style={[globalStyle.containerCentered]}>
        <Logo />
      </View>
      
      <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
        <InputField placeholder="Enter email" value={email}
          onChangeText={(text)=>handleOnChange('email', text)} 
        />
        <InputField placeholder="Enter password" secureTextEntry={true} value={password }
          onChangeText={(text)=>handleOnChange('password', text)}
         /> 
        <RoundCornerButton title="Login" onPress={()=> onLoginPress()} />
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: color.LIGHT_GREEN,
          }}
          onPress={() => navigation.navigate('SignUp')}>
            Sign Up

        </Text>
      </View>
    </SafeAreaView>

  );

};

export default Login;