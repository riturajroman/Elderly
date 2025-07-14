<?php
// Simple server diagnostic tool
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$response = [
    'server_info' => [
        'php_version' => phpversion(),
        'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
        'request_method' => $_SERVER['REQUEST_METHOD'] ?? 'Unknown',
        'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'None',
        'timestamp' => date('Y-m-d H:i:s'),
        'script_name' => $_SERVER['SCRIPT_NAME'] ?? 'Unknown'
    ],
    'post_test' => false,
    'message' => 'GET request received successfully'
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response['post_test'] = true;
    $response['message'] = 'POST request received successfully';
    $response['post_data'] = $_POST;
    $response['raw_input'] = file_get_contents('php://input');
}

echo json_encode($response, JSON_PRETTY_PRINT);
