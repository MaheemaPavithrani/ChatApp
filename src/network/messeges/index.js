import firebase from '../../firebase/config';

export const senderMsg = async (msgValue,currentUserId,guestUserId,img) => {
  try {
    return await firebase
    .database()
    .ref('messeges/'+currentUserId)
    .child(guestUserId)
    .push({
      messeges:{
        sender:currentUserId,
        receiver:guestUserId,
        msg:msgValue,
        img:img
      }
      
    })
    
  } catch (error) {
    return error;
    
  }

};

export const recieverMsg = async (msgValue,currentUserId,guestUserId,img) => {
  try {
    return await firebase
    .database()
    .ref('messeges/'+guestUserId)
    .child(currentUserId)
    .push({
      messeges:{
        sender:currentUserId,
        receiver:guestUserId,
        msg:msgValue,
        img:img
      }
      
    })
    
  } catch (error) {
    return error;
    
  }

};