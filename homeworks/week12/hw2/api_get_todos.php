<?php
require_once("conn.php");
// 加上 header 讓瀏覽器知道我們要印出來的是 json 格式，編碼為 utf-8
header('Content-type: application/json; charset=utf-8');
// CORS
header('Access-Control-Allow-Origin: *');

// 錯誤處理
if (empty($_GET['id'])) {
    $json = array(
        'ok' => false,
        'message' => 'Please add id in url'
    );

    $response = json_encode($json);
    echo $response;
    die();
}

// 拿資料
$id = intval($_GET['id']);

$stmt = $conn->prepare(
    "SELECT id, todo FROM carol_todos WHERE id = ?"
);
$stmt->bind_param('i', $id);
$result = $stmt->execute();

// 錯誤處理 - 確認結果
if (!$result) {
    $json = array(
        "ok" => false,
        "message" => $conn->error
    );
    
    // 轉換成 json 格式
    $response = json_encode($json);
    echo $response;
    die();
}

$result = $stmt->get_result();
$row = $result->fetch_assoc();
$json = array(
  "ok" => true,
  "todoData" => array(
    "id" => $row["id"],
    "todo" => $row["todo"]
  )
);

// 轉換成 json 格式
$response = json_encode($json);
echo $response;
?>