<?php
    require 'dbconfig.php';

    if(!empty($_POST['name']) && !empty($_POST['surname']) && !empty($_POST['username']) && !empty($_POST['email']) &&
    !empty($_POST['password']) && !empty($_POST['confirmPassword']) && !empty($_POST['district']) && !empty($_POST['city']) && !empty($_POST['CAPcode']) &&
    !empty($_POST['street1'])){

        $error = array();
        
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(msqli_error($conn));
        
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $query ="SELECT username FROM users
                    WHERE username = '$username'";
        $res = mysqli_query($conn, $query);
        if(mysqli_num_rows($res) > 0){
            $error[] = "Username non disponibile";
        }

        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $query ="SELECT email FROM users
                    WHERE email = '$email'";
        $res = mysqli_query($conn, $query);
        if(mysqli_num_rows($res) > 0){
            $error[] = "Questa email è già associata ad un account";
        }

        if(strlen($_POST['password'])<10){
            $error[] = "Numero caratteri insufficiente";
        }

        
        if(strcmp($_POST['password'], $_POST['confirmPassword']) != 0 ){
            $error[] = "Le password non coincidono";
        }

        if(count($error) == 0){
            $name = mysqli_real_escape_string($conn, $_POST['name']);
            $surname = mysqli_real_escape_string($conn, $_POST['surname']);
            $email = mysqli_real_escape_string($conn, $_POST['email']);
            $password = mysqli_real_escape_string($conn, $_POST['password']);
            $password = password_hash($password, PASSWORD_BCRYPT);
            $district = mysqli_real_escape_string($conn, $_POST['district']);
            $city = mysqli_real_escape_string($conn, $_POST['city']);
            $CAPcode = mysqli_real_escape_string($conn, $_POST['CAPcode']);
            $street1 = mysqli_real_escape_string($conn, $_POST['street1']);
            $street2 = mysqli_real_escape_string($conn, $_POST['street2']);
            
            $query = "INSERT INTO users(name,surname,username,email,password,district,city,CAPcode,street1,street2)
                        VALUES ('$name', '$surname', '$username', '$email', '$password', '$district', '$city', '$CAPcode', '$street1', '$street2')";

            if(mysqli_query($conn, $query)){
                session_start();
                $_SESSION['woothiery_username'] = $_POST['username'];
                $_SESSION['woothiery_user_id'] = mysqli_insert_id($conn);
                mysqli_close($conn);
                header('Location: shopPage.php');
            } else{
                $error[] = "Errore di connessione al Database";
            }
        }
    }
?>

<html>
  <head>
        <meta charset="utf-8">
        <title>Woothiery</title>
	    <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="signUpPage.js" defer></script>
        <link href="https://fonts.googleapis.com/css?family=Kiwi+Maru&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Della+Respira&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="signUpPage.css">
  </head>

  <body>
        <header>
            <div id="logo">
                <a href = "shopPage.php"><img src="Immagini/WoothieryShop.png"></a>
            </div>
        </header>
        <section>
            <div id="box">
            <form name= 'signUp' method='post' enctype="multipart/form-data" autocomplete="off">
                <div class= "description">Le tue credenziali</div>
                <div class= "group">
                    <div class="name">
                        <div><label for="name">Nome</label></div>
                        <div><input type="text" name='name' <?php if(isset($_POST["name"])){echo"value=".$_POST["name"];}?>></div>
                        <span></span>
                    </div>
                    <div class="surname">
                        <div><label for="surname">Cognome</label></div>
                        <div><input type="text" name='surname' <?php if(isset($_POST["surname"])){echo"value=".$_POST["surname"];}?>></div>
                        <span></span>
                    </div>
                </div>
                <div class="username">
                    <div><label for="username">Username</label></div>
                    <div><input type="text" name='username' <?php if(isset($_POST["username"])){echo"value=".$_POST["username"];}?>></div>
                    <span></span>
                </div>
                <div class="email">
                    <div><label for="email">e-mail</label></div>
                    <div><input type="text" name='email' <?php if(isset($_POST["email"])){echo"value=".$_POST["email"];}?>></div>
                    <span></span>
                </div>
                <div class= "group">
                    <div class="password">
                        <div><label for="password">Password</label></div>
                        <div><input type="password" name='password' <?php if(isset($_POST["password"])){echo"value=".$_POST["password"];}?>></div>
                        <span></span>
                    </div>
                    <div class="confirmPassword">
                        <div><label for="confirmPassword">Ripeti Pasword</label></div>
                        <div><input type="password" name='confirmPassword' <?php if(isset($_POST["confirmPassword"])){echo"value=".$_POST["confirmPassword"];}?>></div>
                        <span></span>
                    </div>
                </div>
                <div class="description">Il tuo indirizzo</div>
                <div class="district">
                    <div><label for="district">Provincia</label></div>
                    <div><input type="text" name='district' <?php if(isset($_POST["district"])){echo"value=".$_POST["district"];}?>></div>
                    <span></span>
                </div>
                <div class="group">
                    <div class="city">
                        <div><label for="city">Città</label></div>
                        <div><input type="text" name='city' <?php if(isset($_POST["city"])){echo"value=".$_POST["city"];}?>></div>
                        <span></span>
                    </div>
                    <div class="CAPcode">
                        <div><label for="CAPcode">CAP</label></div>
                        <div><input type="text" name='CAPcode' <?php if(isset($_POST["CAPcode"])){echo"value=".$_POST["CAPcode"];}?>></div>
                        <span></span>
                    </div>
                </div>
                <div class="group">
                <div class="street1">
                    <div><label for="street1">Indirizzo - riga 1</label></div>
                    <div><input type="text" name='street1' <?php if(isset($_POST["street1"])){echo"value=".$_POST["street1"];}?>></div>
                    <span></span>
                </div>
                <div class="street2">
                    <div><label for="street2">Indirizzo - riga 2 *</label></div>
                    <div><input type="text" name='street2' <?php if(isset($_POST["street2"])){echo"value=".$_POST["street2"];}?>></div>
                    <span></span>
                </div>
                </div>
                <div class= "submit">
                    <input type="submit" value= "Registrati" id="submit" disabled>
                </div>
            </form>
            <div class="login"><a href="loginPage.php">ACCEDI se sei gia registrato</a></div>
            </div>
        </section>
        <footer>
            <address>Val di Fiemme - Trento (TN) </address>
            <p>Calogero Crapanzano - DIEII Unict - N. Matricola: O46002084</p>
        </footer>
  </body>
</html>