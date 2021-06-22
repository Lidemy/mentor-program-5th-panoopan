<?php
require_once("start.php");

// 確認登入狀態
$username = NULL;
require_once("check_permission.php"); // 確認 $_SESSION['username'] 有沒有內容
$user = getUserFromUsername($_SESSION['username']); // 確認 database 有沒有此 username 的資料
$username = $user['username'];
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <?php require_once("navbar.php"); ?>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <form action="handle_post.php" method="POST">
          <div class="edit-post__title">
            發表文章：
          </div>
          <section class="error">
            <?php
              if (!empty($_GET['errCode'])) {
                $code = $_GET['errCode'];
                $msg = 'Error';
                if ($code === '1') {
                  $msg = '資料不齊全';
                }
                echo '<h3 class="error"> 錯誤:' . $msg .'</h3>';
              }
            ?>
          </section>
          <div class="edit-post__input-wrapper">
            <input name="title" class="edit-post__input"  placeholder="請輸入文章標題" />
          </div>
          <div class="edit-post__input-wrapper">
            <textarea name="content" rows="20" class="edit-post__content"></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
            <input class="edit-post__btn" type="submit" value="送出">
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>