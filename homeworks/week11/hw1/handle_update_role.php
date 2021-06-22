
<?php
session_start();
require_once("conn.php");
require_once("utils.php");

// 檢查 query string 參數
if (empty($_GET['role']) || empty($_GET['id'])) {
    header("Location: update_role.php?errCode=1");
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

// 非管理員不可操作
if ($role !== 'admin') {
    header("Location: update_role.php?errCode=2");
    die ();
}

// 拿表單資料
$id = $_GET['id'];
$edit_role = $_GET['role'];


// 更新 carol_board_users 裡面的 role
$sql = "UPDATE carol_board_users SET role = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('si', $edit_role, $id);
$result = $stmt->execute();
if (!$result) {
    die('Error:' . $conn->error);
}

header("Location: update_role.php");
?>

