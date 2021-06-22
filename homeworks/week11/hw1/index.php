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

// 分頁參數
$page = 1; // 預設顯示第一頁
if (!empty($_GET['page'])) {
    $page = $_GET['page']; 
}
$items_per_page = 5;
$offset = ($page - 1) * $items_per_page;

// SQL 撈留言資料、設定分頁
$stmt = $conn->prepare(
    'SELECT '.  
        'C.id AS id, C.content AS content, '.  
        'C.created_at AS created_at, U.nickname AS nickname, U.username AS username '. 
    'FROM carol_board_comments AS C '. 
    'LEFT JOIN carol_board_users AS U ON C.username = U.username '. 
    'WHERE C.is_deleted IS NULL '. 
    'ORDER BY C.id DESC '.
    'LIMIT ? OFFSET ? '
);
$stmt->bind_param('ii', $items_per_page, $offset);
$result = $stmt->execute();
if (!$result) {
    die ('Error:' . $conn->error);
}
$result = $stmt->get_result();
?>


<!-- 首頁畫面 -->
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
        <!--按鈕-->
        <section>
            <?php if (!$username) { ?> <!--如果沒有登入，顯示註冊、登入按鈕-->
                <a class="board__btn" href="register.php">註冊</a>
                <a class="board__btn" href="login.php">登入</a>
            <?php } else { ?> <!--如果登入，顯示登出、編輯暱稱按鈕-->
                <a class="board__btn" href="logout.php">登出</a>
                <span class="board__btn update-nickname">編輯暱稱</span>
                <?php if ($role === 'admin') {?> <!--如果是管理員，顯示管理後台按鈕-->
                    <a class="board__btn" href="update_role.php">管理後台</a>
                <?php } ?>
                <!--編輯暱稱表單-->
                <form  class="hide board__nickname-form" method="POST" action="handle_update_user.php">
                    <div class="board__nickname">
                        <span>新的暱稱：</span>
                        <input type="text" name="nickname" />
                    </div>
                    <input class="board__submit-btn" type="submit" value="送出" />
                </form>
                <h3>你好！<?php echo escape($user['nickname']); ?></h3>
            <?php } ?>
        </section>

        <!--標題-->
        <h1 class="board__title">Comments</h1>

        <!--錯誤提示-->
        <?php
            if (!empty($_GET['errCode'])) {
                $code = $_GET['errCode'];
                $msg = 'Error';
                if ($code === '1') {
                    $msg = '資料不齊全';
                } else if ($code = 2) {
                    $msg = '權限不符';
                }
                echo '<h2 class="error"> 錯誤:' . $msg .'</h2>';
            }
        ?>

        <!--留言表單-->
        <form class="board__new-comment-form" method="POST" action="handle_add_comment.php">
            <?php if ($username) { // 登入才顯示輸入區域?>
                <textarea name="content" rows="5"></textarea>
                <input class="board__submit-btn" type="submit" value="送出" />
            <?php } else {?>
                <h3>請登入發布留言</h3>
            <?php } ?>
        </form>
        
        <div class="board__hr"></div>

        <!--顯示留言-->
        <section>
            <?php
                while ($row = $result->fetch_assoc()) {  // 把 SQL 抓的留言資料拿出來
            ?>
                <!-- 一則留言 -->
                <div class="card">
                    <div class="card__avatar"></div>
                    <div class="card__body">
                        <div class="card__info">
                            <span class="card__author">
                                <?php echo escape($row['nickname']); // 從 carol_board_users table 選出來的 nickname?> 
                                (@<?php echo escape(@ $row['username']); // 從 carol_board_users table 選出來的 nickname?>)
                            </span>
                            <span class="card__time">
                                <?php echo escape($row['created_at']);  // 從 carol_board_comments table 選出來的 created_at?>
                            </span>

                            <!--編輯、刪除按鈕-->
                            <?php if (!empty($username)) { // 有登入才顯示按鈕
                                // 依權限區分按鈕出現位置
                                if (($role !== 'admin') && ($row['username'] === $username)) { // 非管理員而且此留言的 username 與 登入者的 username 相同(自己的留言) ?>
                                    <a href="update_comment.php?id=<?php echo $row['id']; ?>">編輯</a>
                                    <a href="handle_delete_comment.php?id=<?php echo $row['id']; ?>">刪除</a>
                                <?php } else if ($role === 'admin') {  // 管理員可編輯、刪除所有人的留言?>
                                    <a href="update_comment.php?id=<?php echo $row['id']; ?>">編輯</a>
                                    <a href="handle_delete_comment.php?id=<?php echo $row['id']; ?>">刪除</a>
                                <?php }
                            } ?>
                        </div>
                        <p class="card__content"><?php echo escape($row['content']); ?></p>
                    </div>
                </div>
            <?php } ?>
        </section>

        <div class="board__hr"></div>

        <!--分頁按鈕-->
        <section>
            <?php
                $stmt = $conn->prepare(
                    'SELECT count(id) AS count FROM carol_board_comments WHERE is_deleted IS NULL' 
                );
                $result = $stmt->execute();
                $result = $stmt->get_result(); 
                $row = $result->fetch_assoc();
                $count = $row['count'];
                $total_page = ceil($count / $items_per_page); 
            ?>

            <div class="page-info">
                <span>總共有<?php echo $count; ?>筆留言，頁數：</span>
                <span><?php echo $page; ?> / <?php echo $total_page; ?></span>
            </div>
            <div class="paginator">
                <?php if ($page != 1 ) { // 非首頁 ?> 
                    <a href="index.php?page=1">首頁</a>
                    <a href="index.php?page=<?php echo $page - 1; ?>">上一頁</a>
                <?php } ?>
                <?php if ($page != $total_page ) {  // 非最後一頁?>
                    <a href="index.php?page=<?php echo $page + 1; ?>">下一頁</a>
                    <a href="index.php?page=<?php echo $total_page; ?>">最後一頁</a>
                <?php } ?>
            </div>
        </section>
    </main>

    <!--編輯暱稱按鈕顯示功能-->
    <script>
        var btn = document.querySelector(".update-nickname")
        btn.addEventListener("click", function() {
            var form = document.querySelector(".board__nickname-form")
            form.classList.toggle("hide")
        })
    </script>
</body>
</html>