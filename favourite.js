// Firebase config and initialization
const firebaseConfig = {
    apiKey: "AIzaSyCVByCKv3eWtlD1ge3yvTywYwX0obogrCU",
    authDomain: "maplemarkets.firebaseapp.com",
    projectId: "maplemarkets",
    storageBucket: "maplemarkets.appspot.com",
    messagingSenderId: "222165195474",
    appId: "1:222165195474:web:88b61b17e1ee7501f26b0b"
};

// Initialize Firebase (only once)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // Use the already initialized app
}

// Initialize Firebase variables
const auth = firebase.auth();
const database = firebase.database();

// Function to fetch stock data using Alpha Vantage API
const getStockData = async (stockSymbol) => {
    const url = `https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&datatype=json`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd85862a3eamsha6bc8ad1d7335c5p12c851jsne25647dbabed',
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("API Response:", result); // Log the API response for debugging

        if (result['Global Quote']) {
            const stockData = result['Global Quote'];
            return {
                price: stockData['05. price'],  // Current price
                high: stockData['03. high'],    // High price of the day
                low: stockData['04. low'],      // Low price of the day
                volume: stockData['06. volume'], // Trading volume
            };
        } else {
            console.error("Error: Stock data not available for", stockSymbol);
            return null; // If stock data is not available
        }
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null; // Return null if there's an error fetching data
    }
};

// Check if the user is logged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const userId = user.uid;

        // Fetch favorite stocks from Firebase
        database.ref('users/' + userId + '/favorite_stocks').once('value', function(snapshot) {
            const favorites = snapshot.val() || []; // If no favorites, initialize as empty array
            displayFavorites(favorites);
        });

        // Show logout button when user is logged in
        document.getElementById('logout-button').style.display = 'inline';

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
async function displayFavorites(favorites) {
    const favoriteList = document.getElementById('favorite-list');
    favoriteList.innerHTML = ''; // Clear the list first

    // Fetch stock data for each favorite stock dynamically
    for (let stockSymbol of favorites) {
        const stockData = await getStockData(stockSymbol);

        const li = document.createElement('li');
        li.classList.add('favorite-item');

        const stockInfo = `
            <div class="stock-info">
                <h4>${stockSymbol}</h4>
                ${stockData ? `
                    <p>Price: $${stockData.price}</p>
                    <p>High: $${stockData.high}</p>
                    <p>Low: $${stockData.low}</p>
                    <p>Volume: ${stockData.volume}</p>
                ` : `<p>Data not available</p>`}
                <button onclick="removeFavorite('${stockSymbol}')">Remove</button>
            </div>
        `;
        li.innerHTML = stockInfo;
        favoriteList.appendChild(li);
    }
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

// Remove a favorite stock from Firebase
function removeFavorite(stockSymbol) {
    const userId = auth.currentUser.uid; // Get the current user ID
    const userRef = database.ref('users/' + userId + '/favorite_stocks');

    userRef.once('value').then(snapshot => {
        const currentFavorites = snapshot.val() || [];
        const updatedFavorites = currentFavorites.filter(stock => stock !== stockSymbol);

        // Update the Firebase database with the new list after removal
        userRef.set(updatedFavorites);
        displayFavorites(updatedFavorites); // Update the displayed list
    });
}

// Logout function
function logoutUser() {
    auth.signOut()
        .then(() => {
            console.log("User logged out successfully!");
            window.location.href = "index.html"; // Redirect to home or login page
        })
        .catch((error) => {
            console.error("Error logging out:", error);
        });
}

// Attach the logout function to the logout button
document.getElementById("logout-button").addEventListener("click", logoutUser);
