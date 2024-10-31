// login.js

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();


    // implementation of  login ( validation)
    <script>
   
    const auth = firebase.auth();
  
    // Function to handle sign-in
    function signIn() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in successfully
          const email = userCredential.user;
          console.log("Signed in:", user);
        })
        .catch((error) => {
          // Handle errors
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error signing in:", errorCode, errorMessage);
        });
    }
  </script>

    alert(`Logging in as ${username}`);



 











});
