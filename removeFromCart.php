<?php 
    
   require 'checkLog.php';
   if (!$userid = checkLog()) exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $userid = mysqli_real_escape_string($conn, $userid);
    $productid = mysqli_real_escape_string($conn, $_POST["cartProductId"]);

    $in_query = "DELETE FROM cartItems WHERE productId = '$productid' AND cartId = (SELECT id FROM shoppingCart WHERE userID = (SELECT id FROM users WHERE username = '$userid')) LIMIT 1";
    $out_query = "SELECT json_extract(product, '$.availability') AS quantity FROM products WHERE id = $productid";


    $res = mysqli_query($conn, $in_query) or die ('Unable to execute in_query. '. mysqli_error($conn));

    if ($res) {

            $res = mysqli_query($conn, $out_query);
            if(mysqli_num_rows($res) > 0){
                
                $entry = mysqli_fetch_assoc($res);
                
                $returndata = array('ok' => true, 'availability' => $entry, 'productid' => $productid);
                
                echo json_encode($returndata);
                
                mysqli_close($conn);
                
                exit;
            }
        }

    mysqli_close($conn);
    echo json_encode(array('ok' => false));
?>