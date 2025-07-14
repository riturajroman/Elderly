<?php
// Debug form handler - shows detailed error information
// Handle preflight OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200);
    exit();
}

// Enable error reporting and logging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Function to log and return error
function returnError($message, $details = null)
{
    $error = [
        'success' => false,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s'),
        'server_info' => [
            'php_version' => phpversion(),
            'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'
        ]
    ];

    if ($details) {
        $error['debug'] = $details;
    }

    echo json_encode($error);
    exit;
}

// Check request method
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    returnError('Invalid request method: ' . $_SERVER["REQUEST_METHOD"]);
}

// Check if PHPMailer exists
if (!file_exists('PHPMailer/src/PHPMailer.php')) {
    returnError('PHPMailer not found', ['checked_path' => 'PHPMailer/src/PHPMailer.php']);
}

// Check if config exists
if (!file_exists('email-config.php')) {
    returnError('Email configuration file not found', ['checked_path' => 'email-config.php']);
}

try {
    // Try to load PHPMailer
    require_once 'PHPMailer/src/Exception.php';
    require_once 'PHPMailer/src/PHPMailer.php';
    require_once 'PHPMailer/src/SMTP.php';
} catch (Exception $e) {
    returnError('Failed to load PHPMailer', ['error' => $e->getMessage()]);
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {
    // Try to load config
    $config = require 'email-config.php';

    // Validate config
    $required_keys = ['smtp_host', 'smtp_username', 'smtp_password', 'admin_email'];
    foreach ($required_keys as $key) {
        if (!isset($config[$key]) || empty($config[$key])) {
            returnError('Invalid email configuration', ['missing_key' => $key]);
        }
    }
} catch (Exception $e) {
    returnError('Failed to load email configuration', ['error' => $e->getMessage()]);
}

// Collect and validate form data
$name = isset($_POST['Name']) ? trim(htmlspecialchars($_POST['Name'])) : '';
$email = isset($_POST['Email']) ? trim(htmlspecialchars($_POST['Email'])) : '';
$contactNumber = isset($_POST['ContactNumber']) ? trim(htmlspecialchars($_POST['ContactNumber'])) : '';

if (empty($name) || empty($email) || empty($contactNumber)) {
    returnError('Missing required fields', [
        'received_fields' => array_keys($_POST),
        'name_empty' => empty($name),
        'email_empty' => empty($email),
        'contact_empty' => empty($contactNumber)
    ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    returnError('Invalid email format', ['email' => $email]);
}

// Collect optional fields
$investReason = isset($_POST['InvestReason']) ? htmlspecialchars($_POST['InvestReason']) : '';
$highRisk = isset($_POST['HighRisk']) ? htmlspecialchars($_POST['HighRisk']) : '';
$investmentAmount = isset($_POST['InvestmentAmount']) ? htmlspecialchars($_POST['InvestmentAmount']) : '';
$additionalInfo = isset($_POST['AdditionalInfo']) ? htmlspecialchars($_POST['AdditionalInfo']) : '';

try {
    $mail = new PHPMailer(true);

    // Server settings
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_username'];
    $mail->Password   = $config['smtp_password'];
    $mail->SMTPSecure = ($config['smtp_encryption'] ?? 'tls') === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $config['smtp_port'] ?? 587;

    // Enable debug output for troubleshooting
    $mail->SMTPDebug = 0; // Set to 2 for detailed SMTP debugging
    $mail->Debugoutput = 'error_log';

    // Recipients
    $mail->setFrom($config['from_email'] ?? $config['smtp_username'], $config['from_name'] ?? 'Elderly Wellness');
    $mail->addAddress($config['admin_email'], $config['admin_name'] ?? 'Admin');

    if (isset($config['reply_to_user']) && $config['reply_to_user']) {
        $mail->addReplyTo($email, $name);
    }

    // Content
    $mail->isHTML(true);
    $mail->Subject = ($config['subject_prefix'] ?? 'New Investor Form Submission - ') . $name;

    // Simple email template
    $emailBody = "
    <h2>New Investor Form Submission</h2>
    <p><strong>Date:</strong> " . date('Y-m-d H:i:s') . "</p>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Contact:</strong> $contactNumber</p>
    <p><strong>Investment Reason:</strong> $investReason</p>
    <p><strong>High Risk Awareness:</strong> $highRisk</p>
    <p><strong>Investment Amount:</strong> $investmentAmount</p>
    <p><strong>Additional Info:</strong> $additionalInfo</p>
    ";

    $mail->Body = $emailBody;
    $mail->AltBody = "New submission from $name ($email) - Contact: $contactNumber";

    $mail->send();

    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your submission has been sent successfully.',
        'debug' => [
            'timestamp' => date('Y-m-d H:i:s'),
            'name' => $name,
            'email' => $email
        ]
    ]);
} catch (Exception $e) {
    returnError('Email sending failed', [
        'error' => $e->getMessage(),
        'smtp_host' => $config['smtp_host'],
        'smtp_port' => $config['smtp_port'] ?? 587,
        'smtp_user' => $config['smtp_username']
    ]);
}
