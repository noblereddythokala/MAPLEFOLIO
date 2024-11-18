const apiKey = '89866b0b50mshe047dacb941eff1p199b83jsnef56d5f37d5b';
const stocks = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA']; 
const stockContainer = document.querySelector('.ticker-container');

async function fetchStockData() {
    stockContainer.innerHTML = '';

    for (const symbol of stocks) {
        const url = `https://alpha-vantage.p.rapidapi.com/query?datatype=json&output_size=compact&interval=5min&function=TIME_SERIES_INTRADAY&symbol=${symbol}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '89866b0b50mshe047dacb941eff1p199b83jsnef56d5f37d5b',
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (data['Time Series (5min)']) {
                const latestPrice = data['Time Series (5min)'][Object.keys(data['Time Series (5min)'])[0]]['4. close'];

                const stockItem = document.createElement('div');
                stockItem.classList.add('stock-item');
                stockItem.innerHTML = `
                    <span class="stock-symbol">${symbol}</span>
                    <span class="stock-price">$${parseFloat(latestPrice).toFixed(2)}</span>
                `;
                stockContainer.appendChild(stockItem);
            } else {
                const stockItem = document.createElement('div');
                stockItem.classList.add('stock-item');
                stockItem.innerHTML = `
                    <span class="stock-symbol">${symbol}</span>
                    <span class="stock-price">Error fetching data</span>
                `;
                stockContainer.appendChild(stockItem);
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);

            const stockItem = document.createElement('div');
            stockItem.classList.add('stock-item');
            stockItem.innerHTML = `
                <span class="stock-symbol">${symbol}</span>
                <span class="stock-price">Error</span>
            `;
            stockContainer.appendChild(stockItem);
        }
    }
}

setInterval(fetchStockData, 60000);

fetchStockData();
