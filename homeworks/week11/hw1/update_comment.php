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

// 查詢 id 對應到的 carol_board_comments table 內容
$stmt = $conn->prepare(
    "SELECT * FROM carol_board_comments WHERE id = ? "
);
$stmt->bind_param("i", $id);
$result = $stmt->execute();
if (!$result) {
    die ('Error:' . $conn->error);
}
$result = $stmt->get_result();
$row = $result->fetch_assoc();
?>

<!-- 編輯留言畫面 -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>留言板w11</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="warning">
        注意！本站為練習用網站，因教學用途刻意忽略資安的實作，
        註冊時請勿使用任何真實的帳號或密碼。
    </header>

    <main class="board">
         <!--標題-->
        <h1 class="board__title">Update Comment</h1>

        <!--錯誤提示-->
        <?php
            if (!empty($_GET['errCode'])) {
                $code = $_GET['errCode'];
                $msg = 'Error';
                if ($code === '1') {
                    $msg = '資料不齊全';
                }
                echo '<h2 class="error"> 錯誤:' . $msg .'</h2>';
            }
        ?>

        <!--編輯留言表單-->
        <form class="board__new-comment-form" method="POST" action="handle_update_comment.php?">
            <!--顯示原本的留言內容-->
            <textarea name="content" rows="5"><?php echo $row["content"]; ?></textarea>
            <!--用隱藏的 input 帶參數 id 帶到下一個頁面-->
            <input type="hidden" name="id" value="<?php echo $row["id"]; ?>" />
            <input class="board__submit-btn" type="submit" value="送出" />
        </form>
    </main>
</body>
</html>