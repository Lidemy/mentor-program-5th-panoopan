
<?php
session_start();
require_once("conn.php");
require_once("utils.php");

// 檢查表單欄位
if (
    empty($_POST['nickname']) ||
    empty($_POST['username']) ||
    empty($_POST['password'])
) {
    header("Location: register.php?errCode=1");
    die ();
} 

// 拿表單資料
$nickname = $_POST['nickname'];
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // 密碼 hash 處理


// 把註冊資料新增到 carol_board_users table
$sql = "INSERT INTO carol_board_users(nickname, username, password) VALUES(?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $nickname, $username, $password);
$result = $stmt->execute();
if(!$result) {
    // 判斷 username 是否重複
    $code = $conn->errno;
    if ($code === 1062) { #1062 - Duplicate entry => username 已被註冊過
        header("Location: register.php?errCode=2");
    }
    die('Error:' . $conn->error);
}

// 註冊完成之後，啟動內建機制建立對應到 username 的 session id，並自動登入
 /*
1. 產生 session id
2. 把 username 寫入檔案
3. set-cookie: session-id
*/
$_SESSION['username'] = $username;
header("Location: index.php");
?>

