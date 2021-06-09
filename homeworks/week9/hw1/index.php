<?php
    // 只要是用到 php 內建 session 機制的檔案，最前面都要加上session_start();
    session_start();

	// 資料庫連線
	require_once("conn.php");
	require_once("utils.php");
	// 搜尋資料
	$result = $conn->query(
		"SELECT * FROM carol_comments ORDER BY id DESC"
	);
	// 搜尋結果 Error
	if(!$result) {
		die('Error:' . $conn->error);
	}

	// 印出每筆資料
	/*
	while($row = $result->fetch_assoc()) {
		echo $row['nickname'];
		echo $row['content'];
		echo $row['created_at'] . "<br>";
	}
	*/

	// 登入之後從 setcookie 拿 username
	/*
	$username = NULL;
	if (!empty($_COOKIE["username"])) {
		$username = $_COOKIE["username"];
	}
	*/

	// 登入之後從 setcookie 拿 token，再用 token 查 username
	/*
	$username = NULL;
	if (!empty($_COOKIE["token"])) {
		$user = getUserFromToken($_COOKIE["token"]);
		$username = $user["username"];
	}
	*/

	// 登入之後從 session ID 拿 username
	/*
	1. 從 cookie 裡讀取 PHPSESSID
	2. 從檔案裡讀取 session ID 的內容
	3. 放到 $_SESSION 裡面 
	*/
	$username = NULL;
	if (!empty($_SESSION["username"])) {
		$username = $_SESSION["username"];
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>board-hw</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
    </header>
    <main>
        <div class="button">
			<!-- 如果沒登入的話就再顯示註冊及登入按鈕，登入的話顯示登出按鈕 -->
			<?php if (!$username) {?>
				<a href="register.php">註冊</a>
				<a href="login.php">登入</a>
			<?php } else { ?>
				<a href="logout.php">登出</a>
				<!--<h2>你好！<?php //echo $username; ?></h2>-->
				<h2>Hi~~~ <?php echo $username; ?></h2>
			<?php } ?> 
        </div>
        <h1>Comments</h1>
        <?php
			if (!empty($_GET["errCode"])) {
				$code =  $_GET["errCode"];
				$msg = "Error";
				if ($code === "1") { 
					$msg = "資料不齊全";
				}
				echo "<h3> 錯誤：" . $msg . "</h3>";
			}
        ?>
        <form class="comment" method="POST" action="handle_add_comment.php">
            <div class="comment__input">
                <!-- 登入之後就不用另外填暱稱了
                <div>
                    Nick Name: <input type="text" name="nickname">
                    </div>
                -->
                <div>
                    <textarea name="content" rows="8"></textarea>
                </div>
            </div>
			<!--如果登入成功，才能提交留言，否則顯示登入提醒-->
			<?php if ($username) {?>
				<div class="comment__btn">
                	<input type="submit" value="送出">
            	</div>
			<?php } else {?>
				<h3> 請登入發布留言 </h3>
			<?php } ?>
        </form>
        
        <hr>

        <section>
            <?php
                while ($row = $result->fetch_assoc()) { ?>
                <div class="card">
                    <div class="card__avatar"></div>
                    <div class="card__info">
                        <div class="card__info-title">
                            <div class="card__info-name"><?php echo $row["nickname"]; ?></div>
                            <div class="card__info-time"><?php echo $row["created_at"]; ?></div>    
                        </div>
                        <div class="card__info-content"> <?php echo $row["content"]; ?></div>
                    </div>
                </div>    
            <?php } ?>
        </section>
    </main>
</body>
</html>