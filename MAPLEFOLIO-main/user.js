// user.js

document.getElementById('alert-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const stockSymbol = document.getElementById('alert-stock').value.trim().toUpperCase();
    const targetPrice = parseFloat(document.getElementById('target-price').value);

    // Implement alert setting logic here

    alert(`Alert set for ${stockSymbol} at $${targetPrice}`);
});
