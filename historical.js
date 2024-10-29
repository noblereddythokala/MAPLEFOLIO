const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '89866b0b50mshe047dacb941eff1p199b83jsnef56d5f37d5b',
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
    }
};

async function fetchHistoricalData(stockSymbol) {
    const url = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=compact&datatype=json`;
    
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching data:', error.message || error);
        alert('Error fetching data. Please check the stock symbol or try again later.');
    }
}

function createChart(labels, data) {
    const ctx = document.getElementById('historicalChart').getContext('2d');
    const historicalChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Price',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

document.getElementById('historical-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const stockSymbol = document.getElementById('stock-symbol').value.trim().toUpperCase();
    const historicalData = await fetchHistoricalData(stockSymbol);
    
    if (historicalData && historicalData['Time Series (Daily)']) {
        const timeSeries = historicalData['Time Series (Daily)'];
        const labels = Object.keys(timeSeries).reverse(); 
        const prices = Object.values(timeSeries).map(info => parseFloat(info['4. close'])).reverse();

        createChart(labels, prices);
    } else {
        alert('No historical data found for this stock symbol.');
    }
});
