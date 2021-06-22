
<?php
session_start();
require_once("conn.php");
require_once("utils.php");

// 檢查表單欄位
if (empty($_POST['content'])) {
    header("Location: update_comment.php?errCode=1&id=" . $_POST['id']);
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

// 拿隱藏 input 帶過來的 id，以辨識是哪一則留言
$id = $_POST['id'];

// 拿表單資料
$content = $_POST['content'];

// 更新 carol_board_comments table 的留言
if ($role === 'admin') { // 管理員可以更新全部留言
    $sql = "UPDATE carol_board_comments SET content = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $content, $id);
} else {  // 一般身份及遭停權者只能更新自己的留言
    $sql = "UPDATE carol_board_comments SET content = ? WHERE id = ? AND username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
}
$result = $stmt->execute();
if (!$result) {
    die('Error:' . $conn->error);
}

header("Location: index.php");
?>

