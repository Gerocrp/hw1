<?php

    require 'dbconfig.php';
    session_start();
    
    if(!empty($_POST['username']) && !empty($_POST['password'])){
        
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(msqli_error($conn));
        
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);

        $query ="SELECT id, username, password FROM users
                    WHERE username = '$username'";

        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

        if(mysqli_num_rows($res) > 0){
            $entry = mysqli_fetch_assoc($res);
           if(password_verify($_POST['password'], $entry['password'])){
               if(empty($_POST['remember'])){
                    $_SESSION["woothiery_username"] = $entry['username'];
                    $_SESSION["woothiery_user_id"] = $entry['id'];
               }else{
                   $token = random_bytes(12);
                   $hash = password_hash($token, PASSWORD_BCRYPT);
                   $expires = strtotime("+1 day");
                   $query = "INSERT INTO cookies(hash, user, expires)
                                VALUES ('".$hash."',".$entry['id'].",".$expires.")";
                   $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
                   setcookie("woothiery_user_id", $entry['id'], $expires);
                   setcookie("woothiery_cookie_id",mysqli_insert_id($conn), $expires);
                   setcookie("woothiery_token", $token, $expires);
               }
               header("Location: shopPage.php");
               mysqli_close($conn);
               exit;
           } 
           $error = "Dati acceso errati";
        }
    }
?>

<html>
  <head>
        <meta charset="utf-8">
        <title>Woothiery</title>
	    <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="loginPage.js" defer></script>
        <link href="https://fonts.googleapis.com/css?family=Kiwi+Maru&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Della+Respira&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="loginPage.css">
  </head>

  <body >
        <header>
            <div id="logo">
                <a href = "shopPage.php"><img src="Immagini/WoothieryShop.png"></a>
            </div>
        </header>
        <section>
            <div id="box">

            <form name= 'login' method='post' enctype="multipart/form-data" autocomplete="off">
                <div class= "description">Dati di Accesso</div>
                <div class="username">
                    <div><label for="username">Username</label></div>
                    <div><input type="text" name='username' <?php if(isset($_POST["username"])){echo"value=".$_POST["username"];}?>></div>
                    <span></span>
                </div>
                <div class="password">
                    <div><label for="password">Password</label></div>
                    <div><input type="password" name='password' <?php if(isset($_POST["password"])){echo"value=".$_POST["password"];}?>></div>
                    <span></span>
                </div>
                <div class="remember">
                    <div><input type="checkbox" name='remember' value='1'><?php // value=? ?></div>
                    <div><label for="remember">Ricordami</label></div>
                </div>
                <div class= "submit">
                    <input type="submit" value= "Accedi" id="submit" disabled>
                </div>
            </form>
            <div class="signUp"><a href="signUpPage.php">Clicka qui per REGISTRARTI</a></div>

            </div>
        </section>
        <footer>
            <address>Val di Fiemme - Trento (TN) </address>
            <p>Calogero Crapanzano - DIEII Unict - N. Matricola: O46002084</p>
        </footer>
  </body>
</html>