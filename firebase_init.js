// Firebase config and initialization
const firebaseConfig = {
    apiKey: "AIzaSyCVByCKv3eWtlD1ge3yvTywYwX0obogrCU",
    authDomain: "maplemarkets.firebaseapp.com",
    projectId: "maplemarkets",
    storageBucket: "maplemarkets.appspot.com",
    messagingSenderId: "222165195474",
    appId: "1:222165195474:web:88b61b17e1ee7501f26b0b"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Initialize variables
  const auth = firebase.auth();
  const database = firebase.database();
  
 

  
  