

const auth = firebase.auth();
const database = firebase.database();

// Fetch stock data from Alpha Vantage API
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
        return parseFloat(price);
    } catch (error) {
        console.error('Error fetching stock price:', error);
        return null;
    }
}

// Check if any stock prices reach the alert target
async function checkStockPrices() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const userId = user.uid;
            const alertsRef = database.ref('users/' + userId + '/alerts');
            
            alertsRef.once('value', async function(snapshot) {
                const alerts = snapshot.val();
                if (alerts) {
                    for (const stock in alerts) {
                        const targetPrice = alerts[stock].target_price;
                        const currentPrice = await fetchStockPrice(stock);

                        if (currentPrice && currentPrice >= targetPrice) {
                            console.log(`Price alert triggered for ${stock}: Target Price ${targetPrice} reached with current price ${currentPrice}`);
                            
                            // Send alert email using EmailJS
                            sendPriceAlertEmail(stock, targetPrice, currentPrice);
                        }
                    }
                }
            });
        }
    });
}

// Send an email alert via EmailJS
function sendPriceAlertEmail(stock, targetPrice, currentPrice) {
    emailjs.init('sfxsjDJOAqWYhZSh2'); // Initialize EmailJS with your public key

    const emailParams = {
        to_email: 'user_email@example.com', // Replace with actual user's email
        stock_name: stock,
        target_price: targetPrice,
        current_price: currentPrice
    };

    emailjs.send('service_9e8lcqo', 'template_5w62k5l', emailParams)
        .then(() => {
            console.log(`Alert email sent for ${stock}: Target Price ${targetPrice} reached`);
        })
        .catch(error => {
            console.error('Error sending registration email:', error);
        });
}

// Call checkStockPrices every hour
setInterval(checkStockPrices, 3600000);  // Check every hour (3600000 ms)
