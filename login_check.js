import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";


// Check the current user's login state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        console.log("hello")
        // Show the "Favourite Stocks" menu item
        document.getElementById("favorite-stocks").style.display = "block";
        document.getElementById("login-button").textContent = "Logout";
        /* now login button works as logout button*/
        document.getElementById("login-button").onclick = () => {
            firebase.auth().signOut().then(() => {
                console.log("User signed out.");
            }).catch((error) => {
                console.error("Sign out error", error);
            });
            document.getElementById("login-button").textContent = "Login";
        }
    } else {
        // No User is logged out   
        // Example: Hide the "Favourite Stocks" menu item
        document.getElementById("favorite-stocks").style.display = "none";
        document.getElementById("login-button").onclick = () => {
            window.location.href = "login.html"; 
        
    }
}
});
