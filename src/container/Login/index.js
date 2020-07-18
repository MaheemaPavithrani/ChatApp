import React, { useState } from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {globalStyle, color} from '../../utility';
import {Logo, InputField, RoundCornerButton} from '../../component';

const Login = ({navigation}) => {
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
      alert(JSON.stringify(credentials));

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