import React, { useState, useContext } from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {globalStyle, color} from '../../utility';
import {Logo, InputField, RoundCornerButton} from '../../component';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { SignUpRequest, AddUser } from '../../network';
import { setAsyncStorage, keys } from '../../asyncStorage';
import { setUniqueValue } from '../../utility/constants';
import firebase from '../../firebase/config';

const SignUp = ({navigation}) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {name,email,password,confirmPassword} = credentials;

  onSignUpPress = () =>{
    if(!name){
      alert('Name is required');
    }
    else if (!email){
      alert('Email is required');
    }
    else if(!password){
      alert('Password is required');
    }
    else if(password!==confirmPassword){
      alert('Password did not match');
    }
    else{
      dispatchLoaderAction({
        type: LOADING_START,
      });
      SignUpRequest(email, password)
      .then(()=>{
        let uid = firebase.auth().currentUser.uid;
        let profileImg = '';
        AddUser(name, email, uid, profileImg)
        .then(()=>{
          setAsyncStorage(keys.uuid,uid);
          setUniqueValue(uid);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          navigation.navigate('Dashboard');
        })
        .catch((err)=>{
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });

      })
      .catch((err)=>{
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
        alert(err);
      });

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
      <InputField placeholder="Enter name" value={name}
          onChangeText={(text)=>handleOnChange('name', text)} 
        />
        <InputField placeholder="Enter email" value={email}
          onChangeText={(text)=>handleOnChange('email', text)} 
        />
        <InputField placeholder="Enter password" secureTextEntry={true} value={password }
          onChangeText={(text)=>handleOnChange('password', text)}
         /> 
         <InputField placeholder="Confirm Password" secureTextEntry={true} value={confirmPassword}
          onChangeText={(text)=>handleOnChange('confirmPassword', text)} 
        />

        <RoundCornerButton title="SignUp" onPress={()=> onSignUpPress()} />
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: color.LIGHT_GREEN,
          }}
          onPress={() => navigation.navigate('Login')}>
            Login

        </Text>
      </View>
    </SafeAreaView>

  );

};

export default SignUp;