const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '89866b0b50mshe047dacb941eff1p199b83jsnef56d5f37d5b',
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
    }
};

let allHistoricalData = {};  // Variable to store the entire dataset

async function fetchData(symbol, dataType) {
    let url;

    if (dataType === 'intraday') {
        url = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=full&datatype=json`;
    } else if (dataType === 'daily') {
        url = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&datatype=json`;
    } else if (dataType === 'weekly') {
        url = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&datatype=json`;
    } else if (dataType === 'monthly') {
        url = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&datatype=json`;
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        allHistoricalData[dataType] = result;  // Store fetched data in the global variable
        console.log('Fetched data:', result);
        displayData(symbol, dataType);  // Display data immediately after fetching

        // Show date filtering options after data is fetched
        document.getElementById('date-filter').style.display = 'block';
    } catch (error) {
        console.error('Error fetching data:', error.message || error);
    }
}

function displayData(symbol, dataType) {
    const output = document.getElementById('output');
    output.innerHTML = '';

    let timeSeries;
    if (dataType === 'intraday') {
        timeSeries = allHistoricalData[dataType]['Time Series (5min)'];
    } else if (dataType === 'daily') {
        timeSeries = allHistoricalData[dataType]['Time Series (Daily)'];
    } else if (dataType === 'weekly') {
        timeSeries = allHistoricalData[dataType]['Weekly Time Series'];
    } else if (dataType === 'monthly') {
        timeSeries = allHistoricalData[dataType]['Monthly Time Series'];
    }

    if (!timeSeries) {
        output.innerHTML = '<p>No data found. Please check the stock symbol.</p>';
        return;
    }

    // Sort data by date
    const filteredData = Object.entries(timeSeries).sort(([a], [b]) => new Date(b) - new Date(a));

    const labels = filteredData.map(([date]) => date);
    const prices = filteredData.map(([, info]) => parseFloat(info['4. close']));

    createChart(labels, prices);
    createTable(filteredData, symbol, dataType, output);
}

function createTable(filteredData, symbol, dataType, output) {
    const symbolHeading = document.createElement('h2');
    symbolHeading.textContent = `Stock Data for: ${symbol} (${dataType})`;
    output.appendChild(symbolHeading);

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tbody = table.querySelector('tbody');

    filteredData.forEach(([time, info]) => {
        const open = info['1. open'];
        const high = info['2. high'];
        const low = info['3. low'];
        const close = info['4. close'];
        const volume = info['5. volume'];

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${time}</td>
            <td>${open}</td>
            <td>${high}</td>
            <td>${low}</td>
            <td>${close}</td>
            <td>${volume}</td>
        `;
        tbody.appendChild(row);
    });

    output.appendChild(table);
}

let historicalChart;

function createChart(labels, data) {
    const ctx = document.getElementById('historicalChart').getContext('2d');
    if (historicalChart) {
        historicalChart.destroy();
    }
    historicalChart = new Chart(ctx, {
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

// Event listener for form submission
document.getElementById('historical-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const stockSymbol = document.getElementById('stock-symbol').value.trim().toUpperCase();
    const dataType = document.getElementById('data-type').value;

    // Fetch data from API
    await fetchData(stockSymbol, dataType);
});

// Event listener for filtering data by date
document.getElementById('filter-data').addEventListener('click', function() {
    const dataType = document.getElementById('data-type').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    // Display the data filtered by the specified date range
    displayDataFiltered(startDate, endDate, dataType);
});

function displayDataFiltered(startDate, endDate, dataType) {
    const output = document.getElementById('output');
    output.innerHTML = '';

    let timeSeries;
    if (dataType === 'intraday') {
        timeSeries = allHistoricalData[dataType]['Time Series (5min)'];
    } else if (dataType === 'daily') {
        timeSeries = allHistoricalData[dataType]['Time Series (Daily)'];
    } else if (dataType === 'weekly') {
        timeSeries = allHistoricalData[dataType]['Weekly Time Series'];
    } else if (dataType === 'monthly') {
        timeSeries = allHistoricalData[dataType]['Monthly Time Series'];
    }

    if (!timeSeries) {
        output.innerHTML = '<p>No data found. Please check the stock symbol.</p>';
        return;
    }

    // Filter data by the selected date range
    const filteredData = Object.entries(timeSeries).filter(([date]) => {
        return (!startDate || new Date(date) >= new Date(startDate)) &&
               (!endDate || new Date(date) <= new Date(endDate));
    }).sort(([a], [b]) => new Date(b) - new Date(a));

    const labels = filteredData.map(([date]) => date);
    const prices = filteredData.map(([, info]) => parseFloat(info['4. close']));

    createChart(labels, prices);
    createTable(filteredData, 'Filtered Data', dataType, output);
}
