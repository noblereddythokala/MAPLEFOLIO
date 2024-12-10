// Handle alert form submission
document.getElementById('alert-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const stockSymbol = document.getElementById('alert-stock').value;
    const targetPrice = parseFloat(document.getElementById('target-price').value);

    if (!stockSymbol || isNaN(targetPrice)) {
        alert("Please enter a valid stock symbol and target price.");
        return;
    }

    // Save the alert to Firebase
    saveAlertToFirebase(stockSymbol, targetPrice);
});

// Function to save the alert to Firebase
function saveAlertToFirebase(stockSymbol, targetPrice) {
    const user = firebase.auth().currentUser;
    if (user) {
        const alertsRef = firebase.database().ref('users/' + user.uid + '/alerts');
        const newAlertRef = alertsRef.push();
        newAlertRef.set({
            stock_symbol: stockSymbol,
            target_price: targetPrice
        }).then(() => {
            console.log("Alert saved successfully");
            // Trigger price check immediately after saving the alert
            checkStockPrices(); // Manually call the stock price check after saving the alert
        }).catch(error => {
            console.error("Error saving alert:", error);
        });
    } else {
        console.log("User not authenticated.");
    }
}

// Fetch stock price from Alpha Vantage API
async function fetchStockPrice(symbol) {
    const url = `https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol=${symbol}&datatype=json`;
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
        const price = result['Global Quote']['05. price']; // Get the current price
        console.log(`Fetched stock price for ${symbol}: ${price}`); // Debug log
        return parseFloat(price);
    } catch (error) {
        console.error('Error fetching stock price:', error);
        return null;
    }
}

// Check if stock prices meet the target and display alerts
async function checkStockPrices() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const userId = user.uid;
            const alertsRef = firebase.database().ref('users/' + userId + '/alerts');

            alertsRef.once('value', async function(snapshot) {
                const alerts = snapshot.val();
                console.log('Fetched Alerts:', alerts); // Debug log
                if (alerts) {
                    for (const alertId in alerts) {
                        const alert = alerts[alertId];
                        const stockSymbol = alert.stock_symbol;
                        const targetPrice = alert.target_price;

                        console.log(`Checking stock: ${stockSymbol}, Target Price: ${targetPrice}`); // Debug log

                        // Fetch the current stock price
                        const currentPrice = await fetchStockPrice(stockSymbol);

                        // If price is above target, trigger alert
                        if (currentPrice && currentPrice >= targetPrice) {
                            console.log(`Price alert triggered for ${stockSymbol}: Target Price ${targetPrice} reached with current price ${currentPrice}`);

                            // Show alert message on the HTML page
                            displayAlertMessage(stockSymbol, targetPrice, currentPrice);

                            // Send an email notification to the user
                            sendPriceAlertEmail(user.email, stockSymbol, targetPrice, currentPrice);
                        } else {
                            console.log(`Price for ${stockSymbol} did not meet target: ${currentPrice} < ${targetPrice}`);
                        }
                    }
                } else {
                    console.log("No alerts found in the Firebase database.");
                }
            });
        } else {
            console.log("User not logged in.");
        }
    });
}

// Display alert message on the HTML page
function displayAlertMessage(stock, targetPrice, currentPrice) {
    const alertMessageDiv = document.getElementById('alert-message');
    alertMessageDiv.innerHTML = `Alert: ${stock} has reached the target price of $${targetPrice}. Current price: $${currentPrice}`;
    alertMessageDiv.style.display = 'block'; // Ensure the alert is shown
    console.log('Alert message displayed');
}

// Send email alert via EmailJS
function sendPriceAlertEmail(userEmail, stock, targetPrice, currentPrice) {
    emailjs.init('sfxsjDJOAqWYhZSh2'); // Initialize EmailJS with your public key

    const emailParams = {
        to_email: userEmail, // Use the registered user's email
        stock_name: stock,
        target_price: targetPrice,
        current_price: currentPrice
    };

    emailjs.send('service_9e8lcqo', 'template_5w62k5l', emailParams)
        .then(() => {
            console.log(`Alert email sent for ${stock}: Target Price ${targetPrice} reached`);
        })
        .catch(error => {
            console.error('Error sending price alert email:', error);
        });
}

// Call checkStockPrices every minute (60000 ms)
setInterval(checkStockPrices, 60000);  // Check every minute
