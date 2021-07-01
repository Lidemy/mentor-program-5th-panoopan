<?php
require_once("conn.php");
// 加上 header 讓瀏覽器知道我們要印出來的是 json 格式，編碼為 utf-8
header('Content-type: application/json; charset=utf-8');
// CORS
header('Access-Control-Allow-Origin: *');

// 錯誤處理 - 確認留言表單內容
if (
    empty($_POST['todo'])
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
$todo = $_POST['todo'];

$sql = "INSERT INTO carol_todos(todo) VALUES(?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $todo);
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
    "id" => $conn->insert_id
);

// 轉換成 json 格式
$response = json_encode($json);
echo $response;
?>

