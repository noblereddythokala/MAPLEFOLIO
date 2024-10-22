// login.js

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here you can implement your login logic (e.g., validation, API calls)

    alert(`Logging in as ${username}`);
});
