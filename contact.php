<?php
// Database credentials
$host = 'localhost'; // Change to your database host
$dbname = 'maplefolio'; // Change to your database name
$username = 'root'; // Change to your database username
$password = ''; // Change to your database password

// Create a connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check for a connection error
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the form data
$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$message = isset($_POST['message']) ? $_POST['message'] : '';

// Simple validation
if (empty($name) || empty($email) || empty($message)) {
    echo "All fields are required.";
    exit;
}

// Prepare the SQL statement
$stmt = $conn->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message); // Bind parameters

// Execute the query
if ($stmt->execute()) {
    echo "Your message has been sent successfully.";
} else {
    echo "Error: " . $stmt->error;
}

// Close the connection
$stmt->close();
$conn->close();
?>