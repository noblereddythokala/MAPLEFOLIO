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

// Check if the user is logged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const userId = user.uid;

        // Fetch favorite stocks from Firebase
        database.ref('users/' + userId + '/favorite_stocks').once('value', function(snapshot) {
            const favorites = snapshot.val() || []; // If no favorites, initialize as empty array
            displayFavorites(favorites);
        });

        // Handle adding a new favorite stock
        document.getElementById('add-favorite-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const stockSymbol = document.getElementById('favorite-stock').value.trim().toUpperCase();
            if (stockSymbol) {
                addFavorite(userId, stockSymbol);
            }
        });
    } else {
        // Redirect to login page if not logged in
        window.location.href = "login.html";
    }
});
// Display favorite stocks
function displayFavorites(favorites) {
    const favoriteList = document.getElementById('favorite-list');
    favoriteList.innerHTML = ''; // Clear the list first

    favorites.forEach(stock => {
        const li = document.createElement('li');
        li.textContent = stock;
        favoriteList.appendChild(li);
    });
}

// Add a favorite stock to Firebase
function addFavorite(userId, stockSymbol) {
    const userRef = database.ref('users/' + userId + '/favorite_stocks');
    
    // Add stock symbol if it's not already in the list
    userRef.once('value').then(snapshot => {
        const currentFavorites = snapshot.val() || [];
        if (!currentFavorites.includes(stockSymbol)) {
            currentFavorites.push(stockSymbol);
            userRef.set(currentFavorites); // Update the user's favorites list in Firebase
            displayFavorites(currentFavorites); // Update the displayed list
        }
    });
}