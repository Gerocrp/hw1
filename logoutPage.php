<?php

    require 'dbconfig.php';
    
    session_start();
    session_destroy();

    if(isset($_COOKIE['woothiery_user_id']) && isset($_COOKIE['woothiery_token']) && isset($_COOKIE['woothiery_cookie_id'])){
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(msqli_error($conn));
        $cookieid = mysqli_real_escape_string($conn, $_COOKIE['woothiery_cookie_id']);
        $userid = mysqli_real_escape_string($conn, $_COOKIE['woothiery_user_id']);
        $res = mysqli_query($conn, "SELECT id, hash FROM cookies WHERE id = $cookieid AND user = $userid");
        if($cookie = mysqli_fetch_assoc($res)){
            if(password_verify($_COOKIE['woothiery_token'], $cookie['hash'])){
                mysqli_query($conn, "DELETE FROM cookies WHERE id = $cookieid");
                mysqli_close($conn);
                setcookie('woothiery_user_id', '', time() - 3600);
                setcookie('woothiery_cookie_id', '', time() - 3600);
                setcookie('woothiery_token', '', time() - 3600);
            }
        }
    }

    header('Location: loginPage.php');

?>