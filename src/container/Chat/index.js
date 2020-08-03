import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
} from "react-native";
import { globalStyle, color, appStyle } from "../../utility";
import { FlatList } from "react-native-gesture-handler";
import styles from './styles';
import { InputField } from "../../component";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Chat = ({ route, navigation }) => {
  const {params} = route;
  const {name,img,imgText,guestUserId,currentUserId} = params;

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    })
  },navigation)
  return (
    <SafeAreaView style={[globalStyle.flex1, {backgroundColor:color.BLACK}]}>      
      <FlatList
      inverted
      data={[1,2,3]}
      keyExtractor={(_,index)=>index.toString()}
      renderItem={({item})=>(
      <Text style={{color: color.WHITE}}>{name}</Text>
      )}
      />
      {/*Send Messages*/}
        <View style={styles.sendMessageContainer}>
          <InputField
          placeholder="Type Here"
          numberOfLines={10}
          inputStyle={styles.input}
          />
          <View style={styles.sendBtnContainer}>
            <MaterialCommunityIcons
            name="camera"
            color={color.WHITE}
            size={appStyle.fieldHeight}
            />
            <MaterialCommunityIcons
            name="send-circle"
            color={color.WHITE}
            size={appStyle.fieldHeight}
            />
          </View>
        </View>
    </SafeAreaView>
  );
};

export default Chat;
