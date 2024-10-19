<?php

session_start();


include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $username = $_POST['username'];
    $password = $_POST['password'];

   
    if (!empty($username) && !empty($password)) {

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);

        if ($stmt === false) {
            die("Error preparing the statement: " . $conn->error);
        }

      
        $stmt->bind_param("ss", $username, $hashed_password);

       
        if ($stmt->execute()) {
          
            echo "<script>
                    alert('Registration successful! Please login.');
                    window.location.href = 'log.html';
                  </script>";
            exit();
        } else {
            echo "Error: " . $stmt->error;
        }

   
        $stmt->close();
        $conn->close();
    } else {
        echo "Username and password cannot be empty.";
    }
} else {
    echo "Invalid request method.";
}
?>
