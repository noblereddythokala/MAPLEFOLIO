const url = 'https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=compact&datatype=json';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '89866b0b50mshe047dacb941eff1p199b83jsnef56d5f37d5b',
		'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
	}
};
async function fetchdata() {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        displayData(result);
    } catch (error) {
        console.error('Error fetching data:', error.message || error);
    }
}

function displayData(data) {
    const timeSeries = data['Time Series (Daily)'];
    const output = document.getElementById('output');

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Time</th>
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

    for (const [time, info] of Object.entries(timeSeries)) {
        const { '1. open': open, '2. high': high, '3. low': low, '4. close': close, '5. volume': volume } = info;

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
    }

    output.innerHTML = ''; 
    output.appendChild(table); 
}

fetchdata();







