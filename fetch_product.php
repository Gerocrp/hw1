<?php 

   require 'dbconfig.php';

    header('Content-Type: application/json');

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(msqli_error($conn));

        $query = "SELECT id, product FROM products";

    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    
    $productsArray = array();
    while($entry = mysqli_fetch_assoc($res)) {
        $productsArray[] = array('id' => json_decode($entry['id']), 'product' => json_decode($entry['product']));
    }
    echo json_encode($productsArray);
    exit;
?>