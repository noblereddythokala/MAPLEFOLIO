// Function to handle form submission
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

    console.log("Form data:", { name, email, message }); // Log the form data to the console

    // Send form data using AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "submit_contact.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("Response from server:", xhr.responseText); // Log the response
                alert("Your message has been sent successfully.");
                document.getElementById("contact-form").reset(); // Reset the form
            } else {
                console.error("Error sending message:", xhr.status, xhr.statusText); // Log any errors
                alert("There was an issue sending your message. Please try again later.");
            }
        }
    };

    const data = name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)};
    xhr.send(data);
});