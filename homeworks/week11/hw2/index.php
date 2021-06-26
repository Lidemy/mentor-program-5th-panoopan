<?php
require_once("start.php");

// 確任登入狀態
$username = NULL;
if (!empty($_SESSION['username'])) {
  $user = getUserFromUsername($_SESSION['username']); // 確認 database 有沒有此 username 的資料
  $username = $user['username'];
}

// 把 carol_blog_articles table 的內容拿出來
if (!empty($_GET['page']) && $_GET['page'] === 'list') {
  $sql =
    'SELECT '.  
      'A.id AS id, A.title AS title, A.content AS content, '.
      'A.created_at AS created_at, U.username AS username '.  
    'FROM carol_blog_articles AS A '. 
    'LEFT JOIN carol_blog_users AS U ON A.username = U.username '.  
    'WHERE A.is_deleted IS NULL '. 
    'ORDER BY id DESC ';
  $stmt = $conn->prepare($sql);
} else {
  $sql =
    'SELECT '.  
      'A.id AS id, A.title AS title, A.content AS content, '.
      'A.created_at AS created_at, U.username AS username '.  
    'FROM carol_blog_articles AS A '. 
    'LEFT JOIN carol_blog_users AS U ON A.username = U.username '.  
    'WHERE A.is_deleted IS NULL '. 
    'ORDER BY id DESC '.
    'LIMIT ?';
  $limit = 5;
  $stmt = $conn->prepare($sql); 
  $stmt->bind_param('i', $limit);   
}

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
    <div class="posts">
      <?php
          while ($row = $result->fetch_assoc()) {
      ?>
        <article class="post">
          <div class="post__header">
            <div><?php echo escape($row['title']); ?></div>
            <?php if ($username) { ?>
              <div class="post__actions">
                <a class="post__action" href="edit.php?id=<?php echo escape($row['id']); ?>">編輯</a>
              </div>
            <?php } ?>
          </div>
          <div class="post__info">
            <?php echo escape($row['created_at']); ?>
          </div>
          <div class="post__content">
              <?php echo escape($row['content']); ?>
          </div>
          <a class="btn-read-more" href="blog.php?id=<?php echo escape($row['id']); ?>">READ MORE</a>
        </article>
      <?php } ?>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>