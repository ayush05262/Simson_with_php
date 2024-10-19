<?php
include('connection.php');

$query = "SELECT username, score FROM scores ORDER BY score DESC LIMIT 10";
$result = $conn->query($query);

$scores = [];
while ($row = $result->fetch_assoc()) {
    $scores[] = $row; 
}

header('Content-Type: application/json');
echo json_encode($scores); 

$conn->close();
?>
