<?php
    require_once("conn.php");
    
    function getUserFromUsername($username) {
        global $conn;
        // 在 function 中要用 $conn 的話，要先 global $conn
        $stmt = $conn->prepare("SELECT * FROM carol_blog_users WHERE username = ?");
        $stmt->bind_param('s', $username);
        $result = $stmt->execute();
        $result = $stmt->get_result();

        if (!$result || $result->num_rows === 0) {
            header("Location: login.php");
            die();
        }

        $row = $result->fetch_assoc();
        return $row;
    }

    function escape($str) {
        return htmlspecialchars($str, ENT_QUOTES);
    }
?>

