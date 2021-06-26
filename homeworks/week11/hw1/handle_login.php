
<?php
session_start();
require_once("conn.php");
require_once("utils.php");

// 檢查表單欄位
if (
    empty($_POST['username']) ||
    empty($_POST['password'])
) {
    header("Location: login.php?errCode=1");
    die ();
} 

// 拿表單資料
$username = $_POST['username'];
$password = $_POST['password'];

// SQL 用  username 查尋 carol_board_users table 資料
$sql = "SELECT * FROM carol_board_users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$result = $stmt->execute();
if (!$result) {
    die('Error:' . $conn->error);
}
$result = $stmt->get_result();

// user 驗證
// 判斷是否查到 user 資料，如果有則 num_rows = 查到的資料數量
// 但是在 database 設定 username 為 unique 的情況下，正常只會有一筆資料
if ($result->num_rows == 0) {
    header("Location: login.php?errCode=2");
    die(); 
}

// password 驗證
// 如果有 username 就繼續把 database 裡面的 table 抓出來跟輸入的密碼比較是否相同
$row = $result->fetch_assoc();
// 用內建機制比對 hash 之後的 password
if (password_verify($password, $row['password'])) {
    // 如果密碼驗證通過，就啟動內建機制建立對應到 username 的 session id
    /*
    1. 產生 session id
    2. 把 username 寫入檔案
    3. set-cookie: session-id
    */
    $_SESSION['username'] = $username;
    header("Location: index.php");
} else {
    header("Location: login.php?errCode=2");
}
?>

