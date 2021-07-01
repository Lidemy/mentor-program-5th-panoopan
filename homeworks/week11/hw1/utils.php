<?php
    require_once("conn.php");

    function getUserFromUsername($username) {
        global $conn;
        // 在 function 中要用 $conn 的話，要先 global $conn
        $stmt = $conn->prepare( "SELECT * FROM carol_board_users WHERE username = ?");
        $stmt->bind_param('s', $username);
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row;
    }

    function escape($str) {
        return htmlspecialchars($str, ENT_QUOTES);
    }
?> 