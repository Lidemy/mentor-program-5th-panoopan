<?php
require_once("start.php");

// 確任登入狀態
$username = NULL;
require_once("check_permission.php"); // 確認 $_SESSION['username'] 有沒有內容
$user = getUserFromUsername($_SESSION['username']); // 確認 database 有沒有此 username 的資料
$username = $user['username'];


// 把 carol_blog_articles table 的內容拿出來
$stmt = $conn->prepare(
  'SELECT '.  
    'A.id AS id, A.title AS title, A.content AS content, '.
    'A.created_at AS created_at, U.username AS username '.  
  'FROM carol_blog_articles AS A '. 
  'LEFT JOIN carol_blog_users AS U ON A.username = U.username '.  
  'WHERE A.is_deleted IS NULL '. 
  'ORDER BY id DESC'
);
$result = $stmt->execute();
if (!$result) {
  die ('Error:' . $conn->error);
}
$result = $stmt->get_result();
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
      <div class="admin-posts">
        <?php
          while ($row = $result->fetch_assoc()) {
        ?>
          <div class="admin-post">
            <div class="admin-post__title">
                <?php echo escape($row['title']); ?>
            </div>
            <div class="admin-post__info">
              <div class="admin-post__created-at">
                <?php echo escape($row['created_at']); ?>
              </div>
              <a class="admin-post__btn" href="edit.php?id=<?php echo escape($row['id']); ?>">
                編輯
              </a>
              <a class="admin-post__btn" href="handle_delete.php?id=<?php echo escape($row['id']); ?>">
                刪除
              </a>
            </div>
          </div>
        <?php } ?>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>