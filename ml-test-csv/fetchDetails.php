<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Note: Restrict this in production.

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Database connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "mltestcsv";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "SELECT * FROM credit_card_details WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();

    $data = $result->fetch_assoc();

    echo json_encode($data);

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'ID parameter is missing']);
}
?>
