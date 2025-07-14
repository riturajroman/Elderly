<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Load email configuration
$config = require 'email-config.php';

// Set content type to JSON for AJAX responses
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
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

        // Create beautiful email template
        $emailTemplate = '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Investor Form Submission</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; }
                .header { background: linear-gradient(135deg, #2786a5, #00b7ff); color: white; padding: 30px; text-align: center; }
                .header h1 { margin: 0; font-size: 28px; }
                .content { padding: 30px; background: white; }
                .field-group { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid #2786a5; }
                .field-label { font-weight: bold; color: #2786a5; font-size: 14px; text-transform: uppercase; margin-bottom: 5px; }
                .field-value { font-size: 16px; color: #333; }
                .footer { background: #333; color: white; padding: 20px; text-align: center; }
                .highlight { background: #e3f2fd; padding: 10px; border-radius: 5px; margin: 10px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎯 New Investor Inquiry</h1>
                    <p>Someone is interested in investing in Elderly Wellness!</p>
                </div>
                
                <div class="content">
                    <div class="highlight">
                        <strong>📧 New investor form submission received on ' . date('F j, Y \a\t g:i A') . '</strong>
                    </div>
                    
                    <div class="field-group">
                        <div class="field-label">👤 Full Name</div>
                        <div class="field-value">' . $name . '</div>
                    </div>
                    
                    <div class="field-group">
                        <div class="field-label">📧 Email Address</div>
                        <div class="field-value">' . $email . '</div>
                    </div>
                    
                    <div class="field-group">
                        <div class="field-label">📱 Contact Number</div>
                        <div class="field-value">' . $contactNumber . '</div>
                    </div>
                    
                    <div class="field-group">
                        <div class="field-label">💡 Investment Reason</div>
                        <div class="field-value">' . $investReason . '</div>
                    </div>
                    
                    <div class="field-group">
                        <div class="field-label">⚠️ High Risk Awareness</div>
                        <div class="field-value">' . $highRisk . '</div>
                    </div>
                    
                    <div class="field-group">
                        <div class="field-label">💰 Investment Amount</div>
                        <div class="field-value">' . $investmentAmount . '</div>
                    </div>
                    
                    <div class="field-group">
                        <div class="field-label">📝 Additional Information</div>
                        <div class="field-value">' . ($additionalInfo ? $additionalInfo : 'No additional information provided.') . '</div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>This email was sent from the Elderly Wellness investor form.</p>
                    <p><strong>Elderly Wellness</strong> | Making elderly care accessible and reliable</p>
                </div>
            </div>
        </body>
        </html>';

        $mail->Body = $emailTemplate;
        $mail->AltBody = "New Investor Form Submission\n\nName: $name\nEmail: $email\nContact: $contactNumber\nInvestment Reason: $investReason\nHigh Risk Awareness: $highRisk\nInvestment Amount: $investmentAmount\nAdditional Info: $additionalInfo";

        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Thank you! Your submission has been sent successfully.']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Message could not be sent. Please try again later.', 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
