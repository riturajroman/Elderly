<?php
// Alternative form handler with different filename
// Handle preflight OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200);
    exit();
}

// Disable error display for production
error_reporting(E_ALL);
ini_set('display_errors', 0);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Load email configuration
$config = require 'email-config.php';

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = isset($_POST['Name']) ? htmlspecialchars($_POST['Name']) : '';
    $email = isset($_POST['Email']) ? htmlspecialchars($_POST['Email']) : '';
    $contactNumber = isset($_POST['ContactNumber']) ? htmlspecialchars($_POST['ContactNumber']) : '';
    $investReason = isset($_POST['InvestReason']) ? htmlspecialchars($_POST['InvestReason']) : '';
    $highRisk = isset($_POST['HighRisk']) ? htmlspecialchars($_POST['HighRisk']) : '';
    $investmentAmount = isset($_POST['InvestmentAmount']) ? htmlspecialchars($_POST['InvestmentAmount']) : '';
    $additionalInfo = isset($_POST['AdditionalInfo']) ? htmlspecialchars($_POST['AdditionalInfo']) : '';

    // Validate required fields
    if (empty($name) || empty($email) || empty($contactNumber)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
        exit;
    }

    try {
        $mail = new PHPMailer(true);

        // Server settings
        $mail->isSMTP();
        $mail->Host       = $config['smtp_host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['smtp_username'];
        $mail->Password   = $config['smtp_password'];
        $mail->SMTPSecure = $config['smtp_encryption'] === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $config['smtp_port'];

        // Recipients
        $mail->setFrom($config['from_email'], $config['from_name']);
        $mail->addAddress($config['admin_email'], $config['admin_name']);

        if ($config['reply_to_user']) {
            $mail->addReplyTo($email, $name);
        }

        // Content
        $mail->isHTML(true);
        $mail->Subject = $config['subject_prefix'] . $name;

        // Create email template (simplified for reliability)
        $emailTemplate = '
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2786a5;">New Investor Form Submission</h2>
            <p><strong>Date:</strong> ' . date('F j, Y \a\t g:i A') . '</p>
            
            <h3>Contact Information:</h3>
            <p><strong>Name:</strong> ' . $name . '</p>
            <p><strong>Email:</strong> ' . $email . '</p>
            <p><strong>Phone:</strong> ' . $contactNumber . '</p>
            
            <h3>Investment Details:</h3>
            <p><strong>Investment Reason:</strong> ' . $investReason . '</p>
            <p><strong>High Risk Awareness:</strong> ' . $highRisk . '</p>
            <p><strong>Investment Amount:</strong> ' . $investmentAmount . '</p>
            
            <h3>Additional Information:</h3>
            <p>' . ($additionalInfo ? $additionalInfo : 'No additional information provided.') . '</p>
            
            <hr>
            <p><em>This email was sent from the Elderly Wellness investor form.</em></p>
        </body>
        </html>';

        $mail->Body = $emailTemplate;
        $mail->AltBody = "New Investor Form Submission\n\nName: $name\nEmail: $email\nContact: $contactNumber\nInvestment Reason: $investReason\nHigh Risk Awareness: $highRisk\nInvestment Amount: $investmentAmount\nAdditional Info: $additionalInfo";

        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Thank you! Your submission has been sent successfully.']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Message could not be sent. Please try again later.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method: ' . $_SERVER['REQUEST_METHOD']]);
}
