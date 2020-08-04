import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
} from "react-native";
import { globalStyle, color, appStyle } from "../../utility";
import { FlatList } from "react-native-gesture-handler";
import styles from './styles';
import { InputField, ChatBox } from "../../component";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../../firebase/config';

const Chat = ({ route, navigation }) => {
  const {params} = route;
  const {name,img,imgText,guestUserId,currentUserId} = params;
  const [msgValue,setMsgValue] = useState('');
  const [messages,setMesseges] = useState([]);

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    });
  },navigation);

  useEffect(()=>{
    try {
        firebase
        .database()
        .ref('messages')
        .child(currentUserId)
        .child(guestUserId)
        .on('value',(dataSnapshot)=>{
          let msgs = [];
          dataSnapshot.forEach((child)=>{
            msgs.push({
              sendBy:child.val().messege.sender,
              recievedBy:child.val().messege.reciever,
              msg:child.val().msg,
              img:child.val().img,
            });
          });
          setMesseges(msgs);
        });
    } catch (error) {
        alert(error)
    }
  },[]);

  return (
    <SafeAreaView style={[globalStyle.flex1, {backgroundColor:color.BLACK}]}>      
      <FlatList
      inverted
      data={messages}
      keyExtractor={(_,index)=>index.toString()}
      renderItem={({item})=>(
      <ChatBox
      msg={item.msg}
      userId={item.sendBy}
      img={item.img}
      onImgTap={()=>imgTap(item.img)}
      />
      )}
      />
      {/*Send Messages*/}
        <View style={styles.sendMessageContainer}>
          <InputField
          placeholder="Type Here"
          numberOfLines={10}
          inputStyle={styles.input}
          onChangeText={(text)=>handleOnChange(text)}

          />
          <View style={styles.sendBtnContainer}>
            <MaterialCommunityIcons
            name="camera"
            color={color.WHITE}
            size={appStyle.fieldHeight}
            onPress={()=>handleCamera()}
            />
            <MaterialCommunityIcons
            name="send-circle"
            color={color.WHITE}
            size={appStyle.fieldHeight}
            onPress={()=>handleSend()}
            />
          </View>
        </View>
    </SafeAreaView>
  );
};

export default Chat;
