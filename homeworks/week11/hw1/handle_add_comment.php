
<?php
session_start();
require_once("conn.php");
require_once("utils.php");

// 檢查表單欄位
if (empty($_POST['content'])) {
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

// 遭停權者不可留言
if ($role === 'banned') {
    header("Location: index.php?errCode=2");
    die ();
}

// 拿表單資料
$content = $_POST['content'];

// 把留言新增到 carol_board_comments table
$sql = "INSERT INTO carol_board_comments(username, content) VALUES(?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $content);
$result = $stmt->execute();
if(!$result) {
    die('Error:' . $conn->error);
}

header("Location: index.php");
?>

