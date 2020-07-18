import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDwLj8OfuhKPJGX87jPg55Nobbmt-JoWnA',
  databaseURL: 'https://mychat-78f51.firebaseio.com/',
  projectId: 'mychat-78f51',
  appId: '1:241964965759:android:c2948c09cf66b86ef1444a', 
}

export default Firebase.initializeApp(firebaseConfig);