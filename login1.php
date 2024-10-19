<?php
session_start();
error_reporting(E_ALL); 
ini_set('display_errors', 1); 
include('connection.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        die("Prepare failed: " . $conn->error); 
    }

    $stmt->bind_param("s", $username); 
    $stmt->execute();
    $result = $stmt->get_result();

    
    if ($result->num_rows === 1) {
       
        $user = $result->fetch_assoc();

      
        if (password_verify($password, $user['password'])) {
           
            $_SESSION['username'] = $user['username'];

            echo "<script>
                    sessionStorage.setItem('username', '{$user['username']}'); // Store username in sessionStorage
                    alert('Login successful! Redirecting to Sim-Son...');
                    window.location.href = '/simson/simson.html'; // Redirect to simson.html
                  </script>";
            exit(); 
        } else {
          
            echo "<script>
                    alert('Invalid password. Please try again.');
                    window.location.href = 'log.html'; // Redirect to log.html
                  </script>";
            exit();
        }
    } else {
       
        echo "<script>
                alert('Invalid username. Please try again.');
                window.location.href = 'log.html'; // Redirect to log.html
              </script>";
        exit();
    }

   
    $stmt->close();
    $conn->close();
} else {

    header("Location: log.html"); 
    exit();
}
?>
