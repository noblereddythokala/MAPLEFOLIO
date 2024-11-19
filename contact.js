document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simple validation
    if (!name || !email || !message) {
        alert("All fields are required.");
        return;
    }

    // Send form data using AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "submit_contact.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Your message has been sent successfully.");
            document.getElementById("contact-form").reset(); // Reset the form
        }
    };
    xhr.send(`name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`);
});