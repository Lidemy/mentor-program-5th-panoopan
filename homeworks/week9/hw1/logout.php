<?php
    // 只要是用到 php 內建 session 機制的檔案，最前面都要加上session_start();
    session_start();

	// 連線
	require_once("conn.php");

	// 登出時，把 setcookie 的 username 刪除，並使其過期
	//setcookie("username", "", time() - 3600);

	// 登出時，把資料庫裡的 token 刪除， 並把 setcookie 的 token 刪除、使其過期
	/*
	$token = $_COOKIE["token"];
	$sql = sprintf(
		"DELETE FROM tokens WHERE token = '%s'",
		$token
	);
	$conn->query($sql);
	setcookie("token", "", time() - 3600);
	*/

	// 登出時，用 session_destroy(); 把 session 裡的內容刪掉
	session_destroy();

	header("Location: index.php");
?>