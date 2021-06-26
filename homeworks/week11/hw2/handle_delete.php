
<?php
require_once("start.php");

//  確認是否拿到 id 
if (!empty($_GET['id'])) {
    $id = $_GET['id'];
} else {
    header("Location:admin.php");
    exit();
}

// 確任登入狀態
$username = NULL;
require_once("check_permission.php"); // 確認 $_SESSION['username'] 有沒有內容
$user = getUserFromUsername($_SESSION['username']); // 確認 database 有沒有此 username 的資料
$username = $user['username'];


$stmt = $conn->prepare(
    "UPDATE carol_blog_articles SET is_deleted = 1 WHERE id = ?"
);
$stmt->bind_param('i', $id);
$result = $stmt->execute();

if (!$result) {
    die ('Error:' . $conn->error);
}

header("Location: admin.php");
?>

