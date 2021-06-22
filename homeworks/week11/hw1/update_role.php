<?php
session_start();
require_once("conn.php");
require_once("utils.php");

// 確認是否登入
$username = NULL; // 如果沒設定 NULL 會抓到 conn.php 的 username
$user = NULL;
$role = NULL;
if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $role = $user['role'];
}

// 分頁參數
$page = 1;
if (!empty($_GET['page'])) {
    $page = $_GET['page']; 
}
$items_per_page = 5;
$offset = ($page - 1) * $items_per_page;

// SQL 撈使用者資料、設定分頁
$stmt = $conn->prepare(
    'SELECT * FROM carol_board_users LIMIT ? OFFSET ?'
);
$stmt->bind_param('ii', $items_per_page, $offset);
$result = $stmt->execute();
if (!$result) {
    die ('Error:' . $conn->error);
}
$result = $stmt->get_result();
?>

<!-- 管理後台畫面 -->
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
        </div>

        <!--標題-->
        <h1 class="board__title">後台管理系統</h1>

        <!--錯誤提示-->
        <?php
            if (!empty($_GET['errCode'])) {
                $code = $_GET['errCode'];
                $msg = 'Error';
                if ($code === '1') {
                    $msg = '資料不齊全';
                } else if ($code === '2') {
                    $msg = '權限不符';
                }
                echo '<h2 class="error"> 錯誤:' . $msg .'</h2>';
            }
        ?>

        <?php if ($username && $role === 'admin') { // 如果有登入並且為管理員才顯示後台內容?>
            <!--編輯權限表單-->
            <form  class="hide board__role-form" method="POST" action="handle_update_role.php">
                <div class="board__nickname">
                    <span>編輯權限：</span>
                    <input type="hidden" name="id" />
                    <input type="text" name="edit_role" placeholder="1:一般 / 2:管理 / 3:停權"/>
                    <input class="board__submit-btn" type="submit" value="送出" />
                </div>
            </form>

            <!--顯示 user 資料-->
            <section class="role">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Nickname</th>
                        <th>Role</th>
                        <th>Edit</th>
                    </tr>
                    <?php
                        while ($row = $result->fetch_assoc()) { ?>
                        <tr>
                            <td><?php echo escape($row['id']); ?></td>
                            <td><?php echo escape($row['username']); ?></td>
                            <td><?php echo escape($row['nickname']); ?></td>
                            <td><?php echo escape($row['role']); ?></td>
                            <td>
                                <a href="handle_update_role.php?role=admin&id=<?php echo $row['id']; ?>">admin</a><br>
                                <a href="handle_update_role.php?role=normal&id=<?php echo $row['id']; ?>">normal</a><br>
                                <a href="handle_update_role.php?role=banned&id=<?php echo $row['id']; ?>">banned</a>
                            </td>
                        </tr>
                    <?php } ?>
                </table>
            </section>

             <!--分頁按鈕-->
            <section>
                <?php
                    $stmt = $conn->prepare(
                        'SELECT count(id) AS count FROM carol_board_users' 
                    );
                    $result = $stmt->execute();
                    $result = $stmt->get_result(); 
                    $row = $result->fetch_assoc();
                    $count = $row['count'];
                    $total_page = ceil($count / $items_per_page); 
                ?>
                <div class="page-info">
                    <span>總共有<?php echo $count; ?>筆留言，頁數：</span>
                    <span><?php echo $page; ?> / <?php echo $total_page; ?></span>
                </div>
                <div class="paginator">
                    <?php if ($page != 1 ) {  // 非首頁 ?>
                        <a href="update_role.php?page=1">首頁</a>
                        <a href="update_role.php?page=<?php echo $page - 1; ?>">上一頁</a>
                    <?php } ?>
                    <?php if ($page != $total_page ) { // 非最後一頁?>
                        <a href="update_role.php?page=<?php echo $page + 1; ?>">下一頁</a>
                        <a href="update_role.php?page=<?php echo $total_page; ?>">最後一頁</a>
                    <?php } ?>
                </div>
            </section>
        <?php } ?>
    </main>

    <!--編輯權限按鈕顯示功能-->
    <script>
    /*
        var btn = document.querySelector(".role")
        btn.addEventListener("click", function(e) {
            if (e.target.classList.contains('update-role')) {
                var form = document.querySelector(".board__role-form")
                form.classList.toggle("hide")

                // 用編輯按鈕的 attribute 內容帶上 id，再把拿到的 id 加到 form 裡面的隱藏 input，把 id 帶到下一頁
                var id = e.target.getAttribute("value")
                input = document.querySelector("input[name=id]")
                input.setAttribute("value", id)
            }
        })
    */
    </script>
</body>
</html>