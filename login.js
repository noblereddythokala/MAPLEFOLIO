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



// Login function
function login() {
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

// Validate input
if (!validate_email(email) || !validate_password(password)) {
  alert('Invalid Email or Password!');
  return;
}

// Log the user in
auth.signInWithEmailAndPassword(email, password)
  .then(() => {
    alert('Login Successful');
    window.location.href = 'dashboard.html';  
  })
  .catch(error => alert(error.message));
}

// Validation functions
function validate_email(email) {
const expression = /^[^@]+@\w+(\.\w+)+\w$/;
return expression.test(email);
}

function validate_password(password) {
return password.length >= 6;
}

function validate_field(field) {
return field && field.length > 0;
}
