
<?php
session_start();
require_once("conn.php");
require_once("utils.php");

// 檢查表單欄位
if (empty($_POST['nickname'])) {
    header("Location: index.php?errCode=1");
    die ();
}

// 確認是否登入
$username = NULL; // 如果沒設定 NULL 會抓到 conn.php 的 username
$user = NULL;
$role = NULL;
if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $role = $user['role'];
}

// 拿表單資料
$nickname = $_POST['nickname'];

// 更新 carol_board_users table 裡面的 nickname，並確認是由登入的使用者本人更改
$sql = "UPDATE carol_board_users SET nickname = ? WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $nickname, $username);
$result = $stmt->execute();
if (!$result) {
    die('Error:' . $conn->error);
}

header("Location: index.php");
?>

