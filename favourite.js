// favourite.js

const favoriteStocks = JSON.parse(localStorage.getItem('favoriteStocks')) || [];

function displayFavorites() {
    const favoriteList = document.getElementById('favorite-list');
    favoriteList.innerHTML = '';

    favoriteStocks.forEach(stock => {
        const li = document.createElement('li');
        li.textContent = stock;
        favoriteList.appendChild(li);
    });
}

function addFavorite(stockSymbol) {
    if (!favoriteStocks.includes(stockSymbol)) {
        favoriteStocks.push(stockSymbol);
        localStorage.setItem('favoriteStocks', JSON.stringify(favoriteStocks));
        displayFavorites();
    }
}

document.getElementById('add-favorite-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const stockSymbol = document.getElementById('favorite-stock-symbol').value.trim().toUpperCase();
    if (stockSymbol) {
        addFavorite(stockSymbol);
        document.getElementById('favorite-stock-symbol').value = '';
    }
});

window.onload = displayFavorites;
