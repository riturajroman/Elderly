# Elderly Wellness - Form Setup with PHPMailer

This project has been updated to use PHPMailer instead of Formspree for handling form submissions. Here's what has been implemented:

## 📁 Files Added/Modified

### New Files:

- `process-form.php` - Handles form submission and sends emails
- `email-config.php` - Email configuration settings
- `thank-you.html` - Beautiful thank you page shown after successful submission

### Modified Files:

- `form.html` - Updated form action to use `process-form.php`
- `js/form.js` - Updated to handle AJAX form submission

## 🚀 Setup Instructions

### 1. Email Configuration

Edit `email-config.php` and update the following settings:

```php
'smtp_username' => 'your-email@gmail.com',
'smtp_password' => 'your-app-password',
'admin_email' => 'admin@theelderlywellness.com',
```

### 2. For Gmail Users:

1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification → App passwords
3. Generate a new app password for "Mail"
4. Use this app password (not your regular password) in `email-config.php`

### 3. For Other Email Providers:

Update the SMTP settings in `email-config.php`:

- **Outlook**: `smtp-mail.outlook.com`, port 587, TLS
- **Yahoo**: `smtp.mail.yahoo.com`, port 587, TLS
- **Custom SMTP**: Check with your hosting provider

### 4. Server Requirements:

- PHP 7.0 or higher
- PHP extensions: `openssl`, `mbstring`
- Web server (Apache/Nginx)

## 🎨 Features

### Beautiful Email Template

- Professional HTML email design
- Responsive layout
- All form fields beautifully formatted
- Company branding included

### Thank You Page

- Animated success page
- Professional design matching your brand
- Clear next steps for users
- Contact information for immediate assistance
- Mobile responsive

### Form Enhancements

- AJAX submission (no page reload)
- Loading states
- Error handling
- Success notifications
- Form validation maintained

## 🧪 Testing

1. Fill out the form completely
2. Submit the form
3. Check that:
   - Success message appears
   - User is redirected to thank you page
   - Email is received at admin email address
   - Email contains all form data in beautiful format

## 🔧 Troubleshooting

### Common Issues:

1. **Email not sending**

   - Check SMTP credentials in `email-config.php`
   - Verify app password (for Gmail)
   - Check server PHP error logs

2. **Form not submitting**

   - Ensure `process-form.php` is accessible
   - Check browser console for JavaScript errors
   - Verify server has PHP enabled

3. **Thank you page not showing**
   - Check file path in `js/form.js`
   - Ensure `thank-you.html` exists

## 📧 Email Configuration Examples

### Gmail:

```php
'smtp_host' => 'smtp.gmail.com',
'smtp_port' => 587,
'smtp_encryption' => 'tls',
'smtp_username' => 'yourname@gmail.com',
'smtp_password' => 'your-16-digit-app-password',
```

### Outlook:

```php
'smtp_host' => 'smtp-mail.outlook.com',
'smtp_port' => 587,
'smtp_encryption' => 'tls',
'smtp_username' => 'yourname@outlook.com',
'smtp_password' => 'your-password',
```

## 📝 Security Notes

- Never commit real email credentials to version control
- Use environment variables for production
- Consider adding rate limiting for form submissions
- Implement CAPTCHA for additional security

## 🎯 What's Working

✅ Form submission via AJAX
✅ Beautiful email template
✅ Professional thank you page
✅ Error handling and validation
✅ Mobile responsive design
✅ Loading states and feedback
✅ Admin email notifications

The form now provides a much better user experience while maintaining all the original functionality and validation rules.
