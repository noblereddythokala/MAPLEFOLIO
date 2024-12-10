// Register function - When a new user signs up
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  // Validate input fields
  if (!validate_email(email) || !validate_password(password)) {
    alert("Invalid Email or Password!");
    return;
  }
  if (!validate_field(username)) {
    alert("Username cannot be empty!");
    return;
  }



  // Send registration confirmation email
  sendRegistrationEmail(email, username);


// Function to send registration email using EmailJS
function sendRegistrationEmail(email, username) {
  emailjs.init('sfxsjDJOAqWYhZSh2'); // Initialize EmailJS with your public key

  const emailParams = {
    to_email: email,       // Recipient's email (user's email)
    to_name: username,     // Recipient's name (user's username)
  };

  // Send the email using the service and template IDs
  emailjs.send('service_9e8lcqo', 'template_5w62k5l', emailParams)
    .then(() => {
      console.log('Registration email sent successfully!');
    })
    .catch(error => {
      console.error('Error sending registration email:', error);
    });
}

  // Register user in Firebase Auth and Database
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = auth.currentUser;
      const user_data = {
        email: email,
        username: username,
        last_login: Date.now(),
        favorite_stocks: [] // Initialize empty favorite_stocks field

      };
      console.log("User registered:", user.uid);

      // Save user data to Firebase database
      return database.ref("users/" + user.uid).set(user_data);
    })
    .then(() => {
      console.log("User data saved successfully!");

























      
      
      // Sign out user after registration
      auth.signOut(); 

      // Redirect after registration
      window.location.href = "login.html"; 
    })
    .catch(error => {
      console.error("Error during registration:", error.message);
      alert(error.message); // Show any errors (e.g., email already in use)
    });
}



// Validation functions

// Validate email format
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

// Validate password (at least 6 characters)
function validate_password(password) {
  return password.length >= 6;
}

// Check if the field is not empty
function validate_field(field) {
  return field && field.length > 0;
}
