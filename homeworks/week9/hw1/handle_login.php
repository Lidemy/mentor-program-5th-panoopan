<?php
    // 只要是用到 php 內建 session 機制的檔案，最前面都要加上session_start();
    session_start();

	// 資料庫連線
    require_once("conn.php");
    require_once("utils.php");

    // 抓 login.php form 資料，判斷是否為空值
    // 若為空值，則導回 index.php，並用網址帶上 errCode
    if (
        empty($_POST["username"]) ||
        empty($_POST["password"])
    ) {
        header("Location: login.php?errCode=1");
        die($conn->error);
    }

    // 抓 login.php form 資料，並宣告成變數
    $username = $_POST["username"];
    $password = $_POST["password"];

    // 查詢資料
    $sql = sprintf(
        "SELECT * FROM carol_users WHERE username = '%s' AND password = '%s'",
        $username,
        $password
    );

    $result = $conn->query($sql);

    // 判斷資料是否查詢成功
    if (!$result) {
        die($conn->error);
    } 

    // 用 num_rows 判斷在 database 找到幾筆資料，如果沒找到應該為 0
    //print_r($result->num_rows);
    if ($result->num_rows) {
        // echo "登入成功";
        // 如果登入成功，則把 username 存在 cookie 裡面，以維持登入狀態
        /*
        $expire = time() + 3600 * 24 * 30; // 30 day
        setcookie("username", $username, $expire);
        header("Location: index.php");
        */

        // 如果登入成功，則把隨機產生的 token 及對應的 uesrname 存在資料庫裡面
        /*
        $token = generateToken();
        $sql = sprintf(
            "INSERT INTO tokens(token, username) VALUES('%s', '%s')",
            $token,
            $username
        );
        $result = $conn->query($sql);
        // 判斷存取時否成功
        if (!$result) {
            die($conn->error);
        }
        // 把 token 存在 cookie 裡面，以維持登入狀態 
        $expire = time() + 3600 * 24 * 30; // 30 day
        setcookie("token", $token, $expire);
        */

        // 如果登入成功，用 PHP 內建的 session 機制建立 session ID
        /*
        1. 產生 session ID
        2. 把 username 寫入檔案
        3. set-cookie: session-id
        */
        $_SESSION["username"] = $username;
        header("Location: index.php");
    } else {
        header("Location: login.php?errCode=2");
    }
?>