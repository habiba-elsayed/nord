<?php
$host = "sql102.infinityfree.com";        
$user = "if0_41469476";             
$pass = "Habiba162026";                 
$dbname = "if0_41469476_shop_db";        

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");