<?php
    session_start();

	// 資料庫連線
    require_once("conn.php");
    require_once("utils.php");

    // 抓 index.php form 資料，判斷是否為空值
    // 若為空值，則導回 index.php，並用網址帶上 errCode
    if (
        //empty($_POST["nickname"]) || setcookie 之後就直接從 cookie 拿 username
        empty($_POST["content"])
    ) {
        header("Location: index.php?errCode=1");
        die();
    }

    // 抓 index.php form 資料，並宣告成變數
    // setcookie 之後就直接從 cookie 拿 username
    // $nickname = $_POST["nickname"];
    // $content = $_POST["content"];

    // 從 cookie 裡面拿 username，再用 username 找 nickname
    /*
    $username = $_COOKIE["username"];
    $user_sql = sprintf(
        "SELECT nickname FROM users WHERE username = '%s'",
        $username
    );
    $user_result = $conn->query($user_sql);
    $row = $user_result->fetch_assoc();
    $nickname = $row["nickname"];
    */

    // 從 cookie 裡面拿 token，再用 utils.php 的 function 用 token 找 nickname
    /*
    $user = getUserFromToken($_COOKIE["token"]);
    $nickname = $user["nickname"];
    */

    // 從 coockie 裡拿 username，再用 utils.php 裡的 function 拿 nickname
    $user = getUserFromUsename($_SESSION["username"]);
    $nickname = $user["nickname"];

    // 新增資料
    $content = $_POST["content"];
    $sql = sprintf(
        "INSERT INTO carol_comments(nickname, content) VALUES ('%s', '%s')",
        $nickname,
        $content
    );

    $result = $conn->query($sql);

    // 判斷資料是否新增成功
    if (!$result) {
        die($conn->error);
    }

    // 若成功則導回 index.php
    header("Location: index.php")
?>