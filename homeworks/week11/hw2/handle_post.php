
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
    empty($_POST['content'])
) {
    header("Location: post.php?errCode=1");
    die();
}

$title = $_POST['title'];
$content = $_POST['content'];

$stmt = $conn->prepare(
    "INSERT INTO carol_blog_articles(username, title, content) VALUES(?, ?, ?)"
);
$stmt->bind_param('sss', $username, $title, $content);
$result = $stmt->execute();

if (!$result) {
    die('Error: ' . $conn->error);
}

header("Location: admin.php");
?>

