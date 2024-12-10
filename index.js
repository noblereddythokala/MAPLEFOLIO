// Fetch stock data using Alpha Vantage API
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
        if (result['Global Quote']) {
            const stockData = result['Global Quote'];
            return {
                symbol: stockData['01. symbol'], // Stock Symbol (e.g., AAPL)
                price: stockData['05. price'],  // Current price
                change: stockData['10. change percent'] // Change percentage
            };
        } else {
            console.error("Error: Stock data not available for", stockSymbol);
            return null;
        }
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }
};

// Fetch multiple stock data (you can customize the symbols)
const fetchStockTickers = async () => {
    const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN','NFLX','INTC','IBM']; 
    const stockItems = [];

    for (let symbol of stockSymbols) {
        const stockData = await getStockData(symbol);
        if (stockData) {
            stockItems.push(stockData);
        }
    }

    updateStockTicker(stockItems);
};

// Update the ticker display with fetched data
const updateStockTicker = (stockItems) => {
    const tickerContainer = document.querySelector('.ticker-container');
    tickerContainer.innerHTML = ''; 

    stockItems.forEach(item => {
        const stockElement = document.createElement('div');
        stockElement.classList.add('stock-item');
        stockElement.innerHTML = `
            <span class="stock-symbol">${item.symbol}</span>
            <span class="stock-price">${item.price}</span>
            <span class="stock-change">${item.change}</span>
        `;
        tickerContainer.appendChild(stockElement);
    });
};

// Run the function to fetch stock tickers and update the display
fetchStockTickers();
