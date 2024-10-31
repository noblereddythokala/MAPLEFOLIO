
// Register function
function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value;
  

  // Validate input
  if (!validate_email(email) || !validate_password(password)) {
    alert('Invalid Email or Password!');
    return;
  }
  if (!validate_field(username)) {
    alert('Username cannot be empty!');
    return;
  }

  // Register user in Firebase Auth and Database
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = auth.currentUser;
      const user_data = {
        email: email,
        username: username,
        password:password,
        last_login: Date.now()
      };

      database.ref('users/' + user.uid).set(user_data);
      alert('User Registered!');
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
