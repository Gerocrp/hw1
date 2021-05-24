<?php 
    
   require 'checkLog.php';
   if (!$userid = checkLog()) exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $userid = mysqli_real_escape_string($conn, $userid);

    $query = "SELECT productId, COUNT(productId) AS quantity FROM cartItems WHERE cartID = (SELECT id FROM shoppingCart WHERE userID = (SELECT id FROM users WHERE username = '$userid')) GROUP BY productId";
        
    $res = mysqli_query($conn, $query) or die ('Unable to execute query. '. mysqli_error($conn));
    
    if ($res) {

        $cartProductArray = array();

        while($entry = mysqli_fetch_assoc($res)) {
            $cartProductArray[] = array('id' => json_decode($entry['productId']), 'quantity' => json_decode($entry['quantity']));
        }
        echo json_encode($cartProductArray);
        mysqli_close($conn);
        exit;
    }

    mysqli_close($conn);
    echo json_encode(array('ok' => false));
?> 

    