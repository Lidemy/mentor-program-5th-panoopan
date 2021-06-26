
<?php
    session_start();
    session_destroy();
    // sessionid 還是在，但是內容已經被清空
    header("Location: index.php");
?>

