document.addEventListener("DOMContentLoaded", function () {
    // Initialize Email.js with your public key
    emailjs.init("sfxsjDJOAqWYhZSh2"); // Replace with your actual Email.js public key

    const contactForm = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");

    if (contactForm) {
        contactForm.onsubmit = function (e) {
            e.preventDefault(); // Prevent default form submission

            // Dynamically get the form data
            const formData = new FormData(contactForm);
            const name = formData.get("name").trim();
            const email = formData.get("email").trim();
            const message = formData.get("message").trim();

            if (name && email && message) {
                // Send the email with the contact details
                sendContactEmail(name, email, message);
            } else {
                alert("Please fill out all fields before submitting.");
            }
        };
    } else {
        console.error("Contact form not found in the DOM.");
    }
});

// Function to send the email using EmailJS
function sendContactEmail(name, email, message) {
    const emailParams = {
        email: email,       // Recipient's email (user's email)
        name: name,         // Recipient's name (user's name)
        message: message    // Message content
    };

    // Send the email using the service and template IDs
    emailjs.send('service_9e8lcqo', 'template_b92jt9k', emailParams)
        .then(function (response) {
            console.log('Contact email sent successfully!', response.status, response.text);
            // Show success message
            const successMessage = document.getElementById("success-message");
            successMessage.style.display = "block";
            successMessage.textContent = "Message sent successfully!";
        })
        .catch(function (error) {
            console.error('Error sending contact email:', error);
            alert("Failed to send message. Please try again later.");
        });
}
