// historical.js

async function fetchHistoricalData(stockSymbol) {
    const apiKey = '7FTTI7Q0FCG8704K'; 
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    
    return response.json();
}

document.getElementById('historical-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const stockSymbol = document.getElementById('stock-symbol').value.trim().toUpperCase();
    const historicalData = await fetchHistoricalData(stockSymbol);
    
    // Logic to visualize historical data (e.g., using Chart.js)
    console.log(historicalData);
});
