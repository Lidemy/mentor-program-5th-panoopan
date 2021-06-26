
<?php
session_start();
require_once("conn.php");
require_once("utils.php");

// 確認是否登入
$username = NULL; // 如果沒設定 NULL 會抓到 conn.php 的 username
$user = NULL;
$role = NULL;
if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $role = $user['role'];
}

// 拿帶在網址上的此留言的 id，以辨識是哪一則留言
$id = $_GET['id'];


// hard delete
// $sql = "DELETE FROM carol_board_comments WHERE id = ?";

// soft delete
// $sql = "UPDATE carol_board_comments SET is_deleted = 1 WHERE id = ?";


// 刪除 carol_board_comments table 的留言
if ($role === 'admin') { // 管理員可以刪除全部留言
    $sql = "UPDATE carol_board_comments SET is_deleted = 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
} else { // 一般身份及遭停權者只能更新自己的留言
    $sql = "UPDATE carol_board_comments SET is_deleted = 1 WHERE id = ? AND username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
}
$result = $stmt->execute();
if (!$result) {
    die('Error:' . $conn->error);
}

header("Location: index.php");
?>

