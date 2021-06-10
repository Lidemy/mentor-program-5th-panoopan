<?php
	// 資料庫連線
    require_once("conn.php");

    // 抓 register.php form 資料，判斷是否為空值
    // 若為空值，則導回 index.php，並用網址帶上 errCode
    if (
        empty($_POST["nickname"]) ||
        empty($_POST["username"]) ||
        empty($_POST["password"])
    ) {
        header("Location: register.php?errCode=1");
        die($conn->error);
    }

    // 抓 register.php form 資料，並宣告成變數
    $nickname = $_POST["nickname"];
    $username = $_POST["username"];
    $password = $_POST["password"];

    // 新增資料
    $sql = sprintf(
        "INSERT INTO carol_users(nickname, username, password) VALUES ('%s', '%s', '%s')",
        $nickname,
        $username,
        $password
    );

    $result = $conn->query($sql);

    // 判斷資料是否新增成功
    if (!$result) {
        $code = $conn->errno;
        // 用錯誤代碼分辨錯誤訊息，這邊是為了分辨是否為 username 重複的錯誤
        if ($code === 1062) {
            header("Location: register.php?errCode=2");
        }
        die($conn->error);
    } 

    // 若成功則導回 index.php
    header("Location: index.php")
?>