
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
