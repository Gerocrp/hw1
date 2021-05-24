<?php
    require 'dbconfig.php';

    header('Content-Type: application/json');

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(msqli_error($conn));

    $email = mysqli_real_escape_string($conn, $_GET['q']);

    $query = "SELECT email FROM users
                WHERE email = '$email'";
    
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    $json = json_encode(array('exists' => mysqli_num_rows($res) > 0 ? true : false));

    echo $json;
    mysqli_close($conn);
?>