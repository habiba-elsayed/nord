<?php
// 1. Error Reporting (Keep this during debugging, hide in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// 2. CORS Headers - Must be specific when using credentials
header("Access-Control-Allow-Origin: https://nord.free.nf"); 
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With");
header("Content-Type: application/json");

// 3. Handle Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include "config.php";

// 4. Get Data
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["success" => false, "error" => "Invalid JSON or empty request"]);
    exit;
}

// 5. Sanitize
$first_name = $conn->real_escape_string($data['first_name'] ?? '');
$last_name  = $conn->real_escape_string($data['last_name'] ?? '');
$email      = $conn->real_escape_string($data['email'] ?? '');
$address    = $conn->real_escape_string($data['address'] ?? '');
$city       = $conn->real_escape_string($data['city'] ?? '');
$state      = $conn->real_escape_string($data['state'] ?? '');
$zip        = $conn->real_escape_string($data['zip'] ?? '');
$country    = $conn->real_escape_string($data['country'] ?? '');
$cart_items = $data['cart_items'] ?? [];

if (empty($first_name) || empty($email) || empty($cart_items)) {
    echo json_encode(["success" => false, "error" => "Missing required checkout fields"]);
    exit;
}

$cart_items_json = json_encode($cart_items);

// 6. Calculations
$subtotal = 0;
foreach ($cart_items as $item) {
    $price = floatval($item['price'] ?? 0);
    $qty   = intval($item['quantity'] ?? 0);
    $subtotal += ($price * $qty);
}
$shipping = $subtotal >= 100 ? 0 : 12;
$total = $subtotal + $shipping;

// 7. Prepared Statement
// Types: 9 strings (s) and 3 doubles (d) = "sssssssssddd"
$stmt = $conn->prepare("
    INSERT INTO orders 
    (first_name, last_name, email, address, city, state, zip, country, cart_items, subtotal, shipping, total)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

if (!$stmt) {
    echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param(
    "sssssssssddd", 
    $first_name, $last_name, $email, $address, $city, $state, $zip, $country, $cart_items_json, $subtotal, $shipping, $total
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "subtotal" => $subtotal,
        "shipping" => $shipping,
        "total" => $total
    ]);
} else {
    echo json_encode(["success" => false, "error" => "Execute failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>