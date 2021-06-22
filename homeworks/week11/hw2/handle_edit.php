
<?php
require_once("start.php");

// 確任登入狀態
$username = NULL;
require_once("check_permission.php"); // 確認 $_SESSION['username'] 有沒有內容
$user = getUserFromUsername($_SESSION['username']); // 確認 database 有沒有此 username 的資料
$username = $user['username'];

// 確認表單內容
if (
    empty($_POST['title']) ||
    empty($_POST['content']) ||
    empty($_POST['id'])
) {
    header("Location: edit.php?id=" . $_POST['id']. "&errCode=1");
    die();
}

$page = $_POST['page'];
$title = $_POST['title'];
$content = $_POST['content'];
$id = $_POST['id'];

$stmt = $conn->prepare(
    "UPDATE carol_blog_articles SET title = ?, content = ? WHERE id = ?"
);
$stmt->bind_param('ssi', $title, $content, $id);
$result = $stmt->execute();

if (!$result) {
    die('Error: ' . $conn->error);
}

header("Location: " . $page);
?>

