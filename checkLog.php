<?php

    require_once  'dbconfig.php';
    session_start();

    function checkLog(){
        GLOBAL $dbconfig;

        if(isset($_SESSION["woothiery_user_id"])){
            $session = $_SESSION["woothiery_user_id"];
            $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(msqli_error($conn));
            $res = mysqli_query($conn, "SELECT username FROM users WHERE id = $session");
            $entry = mysqli_fetch_assoc($res);
            return $entry['username'];
        } else if(isset($_COOKIE["woothiery_user_id"]) && isset($_COOKIE["woothiery_token"]) && isset($_COOKIE["woothiery_cookie_id"])){
            $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(msqli_error($conn));
                $cookieid = $_COOKIE["woothiery_cookie_id"];
                $userid = $_COOKIE["woothiery_user_id"];
                $res = mysqli_query($conn, "SELECT * FROM cookies WHERE id = $cookieid AND user = $userid");
                $cookie = mysqli_fetch_assoc($res);
                if($cookie) {
                    if (time() > $cookie['expires']){
                        mysqli_query($conn, "DELETE FROM cookies WHERE id = ".$cookie['id']) or die(mysqli_error($conn));
                        header("Location: logoutPage.php");
                        exit;
                    } else if (password_verify($_COOKIE["woothiery_token"], $cookie['hash'])){
                        $res = mysqli_query($conn, "SELECT username FROM users WHERE id = $userid");
                        $entry = mysqli_fetch_assoc($res);
                        return $entry['username'];
                    }
                }
        }
        return false;
    }
?>