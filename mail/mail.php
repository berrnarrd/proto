<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
    $subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    // Email parameters
    $to = "name@youremail.com"; // Replace with your email address
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    $email_message = "
    Name: $name
    Email: $email
    Phone: $phone
    Subject: $subject
    Message: $message
    ";

    // Send email
    if (mail($to, $subject, $email_message, $headers)) {
        header("Location: ../mail-success.html");
        exit(); // Ensure the script stops executing after redirection
    } else {
        echo "Sorry, there was an error sending your message. Please try again later.";
    }
} else {
    echo "Invalid request method.";
}
?>