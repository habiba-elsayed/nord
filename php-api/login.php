<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

// Show PHP errors during development
ini_set('display_errors', 1);
error_reporting(E_ALL);

include "config.php";

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (!$email || !$password) {
    echo json_encode(["success" => false, "error" => "Email and password required"]);
    exit;
}

$stmt = $conn->prepare("SELECT id, email, password FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode(["success" => false, "error" => "User not found"]);
    exit;
}

// Verify hashed password
if (!password_verify($password, $user['password'])) {
    echo json_encode(["success" => false, "error" => "Invalid password"]);
    exit;
}

// Success
echo json_encode([
    "success" => true,
    "user_id" => $user['id'],
    "email" => $user['email']
]);
?>