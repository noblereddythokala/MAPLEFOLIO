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

    // Send form data using AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "contact.php", true);  // Make sure this matches your server-side PHP script
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parse the JSON response from PHP
            const response = JSON.parse(xhr.responseText);
            
            if (response.status === 'success') {
                // Display the success message
                const successMessageDiv = document.createElement('div');
                successMessageDiv.textContent = response.message;  // "Your message has been sent successfully."
                successMessageDiv.style.backgroundColor = "#d4edda";
                successMessageDiv.style.padding = "10px";
                successMessageDiv.style.borderRadius = "5px";
                successMessageDiv.style.color = "#155724";
                successMessageDiv.style.marginBottom = "15px";
                successMessageDiv.style.textAlign = "center";
                document.querySelector(".contact-section").prepend(successMessageDiv);  // Add it to the top of the contact form section
                
                // Reset the form after showing success message
                document.getElementById("contact-form").reset();

                // Hide the success message after 3 seconds
                setTimeout(function() {
                    successMessageDiv.style.display = "none";
                }, 3000);
            } else {
                // Handle error response from the server
                alert(response.message);  // Show the error message returned by PHP
            }
        }
    };
    
    // Send the form data to the server
    xhr.send("name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&message=" + encodeURIComponent(message));
});
