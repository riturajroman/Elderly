<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST['Name'];
    $email = $_POST['Email'];
    $contactNumber = $_POST['ContactNumber'];
    $investReason = $_POST['InvestReason'];
    $highRisk = $_POST['HighRisk'];
    $investmentAmount = $_POST['InvestmentAmount'];
    $additionalInfo = $_POST['AdditionalInfo'];

    // Create email content
    $email_content = "New Investment Inquiry:\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Contact Number: $contactNumber\n";
    $email_content .= "Investment Reason: $investReason\n";
    $email_content .= "Aware of High Risk: $highRisk\n";
    $email_content .= "Investment Amount: $investmentAmount\n";
    $email_content .= "Additional Info: $additionalInfo\n";

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'noreplyelderly@gmail.com'; // Your Gmail address
        $mail->Password   = 'mjicdfxqyqcyiarj'; // Your Gmail app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        // Recipients
        $mail->setFrom('noreplyelderly@gmail.com', 'Elderly Wellness');
        $mail->addAddress('raj@tectratechnologies.com', 'Admin'); // Admin email

        // Content
        $mail->isHTML(false);
        $mail->Subject = 'New Investment Inquiry from ' . $name;
        $mail->Body    = $email_content;

        $mail->send();

        // Redirect to thank-you page
        header('Location: https://example.com/thank-you.html');
        exit();
    } catch (Exception $e) {
        // Handle error - you might want to log this and show an error page
        error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
        header('Location: https://example.com/error.html');
        exit();
    }
} else {
    // Not a POST request, redirect to form
    header('Location: https://example.com/your-form-page.html');
    exit();
}
