<?php
require_once("conn.php");
// 加上 header 讓瀏覽器知道我們要印出來的是 json 格式，編碼為 utf-8
header('Content-type: application/json; charset=utf-8');
// CORS
header('Access-Control-Allow-Origin: *');

// 錯誤處理 - 確認留言表單內容
if (
    empty($_POST['site_key']) || 
    empty($_POST['nickname']) ||
    empty($_POST['content'])
) {
    $json = array(
        "ok" => false,
        "message" => "Please input missing fields"
    );
    
    // 轉換成 json 格式
    $response = json_encode($json);
    echo $response;
    die();
}

// 拿表單資料
$site_key = $_POST['site_key'];
$nickname = $_POST['nickname'];
$content = $_POST['content'];

$sql = "INSERT INTO carol_board_discussions(site_key, nickname, content) VALUES(?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $site_key, $nickname, $content);
$result = $stmt->execute();

// 錯誤處理 - 確認結果
if(!$result) {
    $json = array(
        "ok" => false,
        "message" => $conn->error
    );
    
    // 轉換成 json 格式
    $response = json_encode($json);
    echo $response;
    die();
}

// 結果成功 - 把 response 內容轉換成改成 json 格式輸出
$json = array(
    "ok" => true,
    "message" => "Success!",
);

// 轉換成 json 格式
$response = json_encode($json);
echo $response;
?>

