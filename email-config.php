<?php
// Email Configuration
// IMPORTANT: Please update these settings with your actual email credentials

return [
    // SMTP Settings
    'smtp_host' => 'smtp.gmail.com', // Change to your SMTP server
    'smtp_port' => 587,
    'smtp_encryption' => 'tls', // or 'ssl'

    // Email Credentials
    'smtp_username' => 'noreplyelderly@gmail.com', // Your email address
    'smtp_password' => 'mjicdfxqyqcyiarj', // Your email app password (not regular password)

    // Sender Information
    'from_email' => 'noreplyelderly@gmail.com', // Same as username usually
    'from_name' => 'Elderly Wellness',

    // Recipient Information
    'admin_email' => 'raj@tectratechnologies.com', // Where to send the form submissions
    'admin_name' => 'Admin',

    // Email Settings
    'subject_prefix' => 'New Investor Form Submission - ',
    'reply_to_user' => true // Whether to set user's email as reply-to
];

/*
SETUP INSTRUCTIONS:

1. For Gmail:
   - Use your Gmail address as smtp_username and from_email
   - Generate an App Password (not your regular password):
     * Go to Google Account settings
     * Security → 2-Step Verification → App passwords
     * Generate a new app password for "Mail"
     * Use this app password in smtp_password

2. For other email providers:
   - Update smtp_host, smtp_port, and smtp_encryption accordingly
   - Common SMTP settings:
     * Outlook: smtp-mail.outlook.com, port 587, TLS
     * Yahoo: smtp.mail.yahoo.com, port 587, TLS
     * Custom SMTP: Check with your hosting provider

3. Update admin_email to the email where you want to receive submissions

4. Test the form to ensure emails are being sent properly
*/
