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
    <header class="warning">
		<strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
	</header>
    <main>
        <div class="button">
            <a href="index.php">返回首頁</a>
            <a href="login.php">登入</a>
        </div>
        <h1>Register</h1>
        <!-- 處理 errCode -->
        <?php
            if (!empty($_GET["errCode"])) {
                $code = $_GET["errCode"];
                // 如果有 errCode 就先顯示 Error，在判定不同情況更改內容
                $msg = "Error";
                // 判斷 errCode
                if ($code === "1") {
                    $msg = "資料不齊全";
                } else if ($code === "2") {
                    $msg = "帳號已被註冊";
                }
                // 把錯誤訊息顯示在畫面上
                echo "<h3 class='error'>錯誤：" . $msg . "</h3>";
            }
        ?>
        <form class="comment" method="POST" action="handle_register.php">
            <div class="comment__input">
                <div>
                    Nick Name: <input type="text" name="nickname">
                </div>
                <div>
                    User Name: <input type="text" name="username">
                </div>
                <div>
                    Password: <input type="password" name="password">
                </div>
            </div>
            <div class="comment__btn">
                <input type="submit" value="註冊">
            </div>
        </form>
    </main>
</body>
</html>