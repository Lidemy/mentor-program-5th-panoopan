<!-- 註冊畫面 -->
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
        <div>
            <a class="board__btn" href="index.php">回留言板</a>
            <a class="board__btn" href="login.php">登入</a>
        </div>

         <!--標題-->
        <h1 class="board__title">Register</h1>

        <!--錯誤提示-->
        <?php
            if (!empty($_GET['errCode'])) {
                $code = $_GET['errCode'];
                $msg = 'Error';
                if ($code === '1') {
                    $msg = '資料不齊全';
                } else if ($code === '2') {
                    $msg = '帳號已被註冊';
                }
                echo '<h2 class="error"> 錯誤:' . $msg .'</h2>';
            }
        ?>

        <!--註冊表單-->
        <form class="board__new-comment-form" method="POST" action="handle_register.php">
            <div class="board__nickname">
                <span>暱稱：</span>
                <input type="text" name="nickname" />
            </div>
            <div class="board__nickname">
                <span>帳號：</span>
                <input type="text" name="username" />
            </div>
            <div class="board__nickname">
                <span>密碼：</span>
                <input type="password" name="password" />
            </div>
            <input class="board__submit-btn" type="submit" value="送出" />
        </form>
    </main>
</body>
</html>