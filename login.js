
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
    const user = auth.currentUser;
    // Wait for the Promise to resolve
    console.log('User UID:', user.uid);
    return database.ref('users/' + user.uid).once('value');
  })
  .then(snapshot => {
    if (snapshot.exists()) {
      const userData = snapshot.val(); // Get the actual data
      const username = userData.username; // Access the username from the data
      console.log(`Welcome back, ${username}!`);
      localStorage.setItem("retrieved_username", username);  //saves the username retrieved from the database to the browser storage
      window.location.href = 'dashboard.html';
    } else {
      alert('User data not found!');
    }  
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

