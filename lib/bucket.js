import * as firebase from 'firebase/app'
import 'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyCb7WbDx5M2cRpD4Vg5FBCF7J-s-E9XhPQ",
    authDomain: "plover-bd67b.firebaseapp.com",
    projectId: "plover-bd67b",
    storageBucket: "plover-bd67b.appspot.com",
    messagingSenderId: "213824338827",
    appId: "1:213824338827:web:903bdb14af07ce3aa00d8e",
    measurementId: "G-JMS1VYTPEZ"
  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage().ref()
export {storage, firebase as default}
