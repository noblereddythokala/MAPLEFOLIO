// stocks.js

const apiKey = '7FTTI7Q0FCG8704K'; 
const stockSymbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA'];

async function fetchStockData(stockSymbol) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    
    return response.json();
}

async function displayRealTimePrices() {
    const resultSection = document.getElementById("real-time-prices");
    resultSection.innerHTML = '';

    for (const symbol of stockSymbols) {
        try {
            const stockData = await fetchStockData(symbol);
            const stockQuote = stockData['Global Quote'];

            if (stockQuote) {
                resultSection.innerHTML += `
                    <div class="stock-item">
                        <p>Stock: ${stockQuote['01. symbol']}<br>
                        Price: $${parseFloat(stockQuote['05. price']).toFixed(2)}<br>
                        Change: ${stockQuote['10. change percent']}</p>
                    </div>`;
            } else {
                resultSection.innerHTML += `<p>Stock data for ${symbol} not found.</p>`;
            }
        } catch (error) {
            console.error('Fetch error: ', error);
            resultSection.innerHTML += `<p>Error fetching stock data for ${symbol}: ${error.message}</p>`;
        }
    }
}

window.onload = displayRealTimePrices;
