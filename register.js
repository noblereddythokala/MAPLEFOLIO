
 // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVByCKv3eWtlD1ge3yvTywYwX0obogrCU",
    authDomain: "maplemarkets.firebaseapp.com",
    projectId: "maplemarkets",
    storageBucket: "maplemarkets.appspot.com",
    messagingSenderId: "222165195474",
    appId: "1:222165195474:web:88b61b17e1ee7501f26b0b"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
 
 // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    user = document.getElementById('user').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false || validate_user(user)==false ){
      alert('Email or Password or username is not following conventions!!')
      return
      // Don't continue running the code
    }
    
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        user : user,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })

  }

   // Validate Functions
   function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }

  function validate_user(password) {
    // Firebase only accepts lengths greater than 6
    if (user < 6) {
      return false
    } else {
      return true
    }
  }


  