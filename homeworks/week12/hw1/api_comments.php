<?php
require_once("conn.php");
// 加上 header 讓瀏覽器知道我們要印出來的是 json 格式，編碼為 utf-8
header('Content-type: application/json; charset=utf-8');
// CORS
header('Access-Control-Allow-Origin: *');

// 錯誤處理
if (empty($_GET['site_key'])) {
    $json = array(
        'ok' => false,
        'message' => 'Please add site_key in url'
    );

    $response = json_encode($json);
    echo $response;
    die();
}

// 拿資料
$site_key = $_GET['site_key'];

$stmt = $conn->prepare(
    "SELECT nickname, content, created_at FROM carol_board_discussions WHERE site_key = ? ORDER BY id DESC"
);
$stmt->bind_param('s', $site_key);
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

$discussions = array();
while ($row = $result->fetch_assoc()) {
    array_push($discussions, array(
        "nickname" => $row['nickname'],
        "content" => $row['content'],
        "created_at" => $row['created_at']
    ));
}


// 結果成功 - 把 response 內容轉換成改成 json 格式輸出
$json = array(
    "ok" => true,
    "discussions" => $discussions
);

// 轉換成 json 格式
$response = json_encode($json);
echo $response;
?>