<?php
    require_once("conn.php");

    //產生隨機亂數功能
    function generateToken() {
        $s = '';
        for ($i=1; $i<=16; $i++) {
            $s .= chr(rand(65, 90)); 
            // chr() ASCII code 轉換為字母
            // A~Z = 65~90, a~z = 97~122
            // rand(int $min , int $max) 隨機產生指定範圍內的整數
        }
        return $s;
    }

    // 用 token 查 user 資訊
    function getUserFromToken($token) {
        global $conn;
        // 在 function 裡面用 $conn 的話，要先 global $conn;
        $sql = sprintf(
			"SELECT username FROM tokens WHERE token = '%s'",
			$token
		);
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();
		$username = $row["username"];

        $sql = sprintf(
            "SELECT * FROM users WHERE username = '%s'",
            $username 
        );
        $result = $conn->query($sql);
		$row = $result->fetch_assoc();
        return $row;// username, id, nickname
    }

    // 用 username 查 user 資訊
    function getUserFromUsename($username) {
        global $conn;
        $sql = sprintf(
            "SELECT * FROM carol_users WHERE username = '%s'",
            $username
        );
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        return $row; // username, id, nickname
    }
?>