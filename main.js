// Import the necessary functions from Firebase
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Initialize Firebase Auth
const auth = getAuth();

// Check the current user's login state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        console.log("User is logged in:", user);
        
        // Example: Show the "Favourite Stocks" menu item
        document.getElementById("favorite-stocks").style.display = "block";
    } else {
        // User is logged out
        console.log("No user is logged in.");
        
        // Example: Hide the "Favourite Stocks" menu item
        document.getElementById("favorite-stocks").style.display = "none";
    }
});
