<?php 

    require 'dbconfig.php';

    header('Content-Type: application/json');

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(msqli_error($conn));

    if(!$_GET["essenceName"]){
        $query = "SELECT essence FROM essences";

    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    
    $essenceArray = array();
    while($entry = mysqli_fetch_assoc($res)) {
        
        $essenceArray[] = array('essence' => json_decode($entry['essence']));
    }
    echo json_encode($essenceArray);
    exit;
    } else{
        $essenceName = $_GET["essenceName"]; 
    
        $query = "SELECT essence FROM essences WHERE json_extract(essence, '$.name') LIKE '%$essenceName%'";

        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
        
        $essenceArray = array();
        
        while($entry = mysqli_fetch_assoc($res)) {
            $essenceArray[] = array('essence' => json_decode($entry['essence']));
        }
    
        echo json_encode($essenceArray);
        exit;
    }
?>