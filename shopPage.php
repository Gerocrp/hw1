<?php 
  require 'checkLog.php';
  ?>

<html>
  <head>
    <meta charset="utf-8">
    <title>WoothieryShop</title>
    <link rel="icon" type="image/png" href="Immagini/WS.png">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="shopScript.js" defer></script>
    <link href="https://fonts.googleapis.com/css?family=Kiwi+Maru&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Della+Respira&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="shopPage.css">
  </head>
  <body>
    <header>
      <nav>
        <div id="logo">
          <a href = "shopPage.php"><img src="Immagini/WoothieryShop.png"></a>
        </div>
        <div id="links">
          <a href= <?php
            if(checkLog()){
              echo("logoutPage.php");
            }
            ?>><?php
            if(checkLog()){
              echo("Disconnetti");
            }
            ?></a>
          <a href="homePage.php" id="home">Home</a>
          <a <?php if(checkLog()){
                            echo('id = "cartButton"');
                        } else{
                            echo("href = loginPage.php");
                            } ?> 
             class="button"> <?php if(checkLog()){
                            echo("Carrello");
                        } else{
                            echo("Accedi");
                            } ?>
              </a>
        </div>
		<div id="menu">
        <a>
          <div></div>
          <div></div>
        </a>
        </div>
      </nav>
      <div id="menuLinks" class= 'zIndex-1'>
        <a href= <?php
            if(checkLog()){
              echo("logoutPage.php");
            }
            ?>><?php
            if(checkLog()){
              echo("Disconnetti");
            }
            ?></a>
        <a href="homePage.php" id = "menuHomePage">Home</a>
        <a <?php if(checkLog()){
                            echo('id = "cartButton"');
                        } else{
                            echo("href = loginPage.php");
                            } ?> 
          class="button"><?php if(checkLog()){
                            echo("Carrello");
                        } else{
                            echo("Accedi");
                            } ?></a>
      </div>
      <h1><?php
              if(checkLog()){
                echo("Bentornato ".checkLog() ."!");
              }else {
                echo("Benvenuto, accedi per riempire il carrello");
              }
            ?>
            </h1>
    </header>
    <section>
      <div id="main">
        <div id="lneSearch">
            <h1>Prodotti</h1>
          <div id="searchBox">
            <h4>CERCA</h4>
            <img src= "Immagini/magGlass.png" id="magGlass">
            <input type="text" id="searchBar">
          </div>
        </div>
        <template id="product_template">
                  <article class="product">
                      <div class= "infoBox">
                          <div class="productInfo">
                            <div class= "productType"></div>
                            <div class= "productName"></div>
                            <div class= "productPrice"><div>Prezzo:</div><div></div><div>€</div></div>
                            <div class= "productAvailability"><div>Disponibilità:</div><div></div></div>
                          </div>
                          <div class="essenceInfo">
                            <div class="essenceName"><span></span></div>
                            <div class="essenceSample">
                                <img src="">
                            </div>                   
                        </div>
                      </div>
                        <div class= "interactionsBox">
                            <div class="actions">
                              <div class="buttons">
                                <div class="addToCart"><span></span></div>
                              </div>
                              <div class="reviews_form hidden">
                                    <form autocomplete="off">
                                        <input type="text" name="reviews" maxlength="254" placeholder="Scrivi una recensione..." required="required">
                                        <input type="submit">
                                        <input type="hidden" name="productId">
                                    </form>
                                </div>
                            </div>                    
                        </div>
                  </article>
              </template>
          <div id= "mainBox">
            </div>
            <div id="noKeyApiBox" class="hidden">
              <img src="Immagini/up-arrow.png" id="hideApiBox">
            </div>
        </div>    
        <h1>Chi siamo</h1>
        <p>La nostra famiglia lavora il legno da 8 generazioni. <br>
          Acquistiamo legni pregiati provenienti da tutti i continenti, 
          li scegliamo e seghiamo, e poi li stagioniamo con grande cura nella nostra segheria in Val di Fiemme. <br>
          La qualità e la varietà dei nostri legni ci permettono di selezionare e destinare a ogni uso e a ogni cliente il materiale più adatto e appropriato. 
          Eseguiamo le lavorazioni secondo le caratteristiche della tradizione integrate alle nuove tecnologie con l' impiego delle strumentazioni più affidabili. </p>
      </div>
    </section>
    <section id="shoppingCart" class="hidden">
      <template id="cartProduct_template">
           <article class="cartProduct">
               <div class= "infoBox">
                   <div class="productInfo">
                     <div class= "cartProductName"></div>
                     <div class= "cartProductPrice"><div>Prezzo:</div><div></div><div>€</div></div>
                   </div>
                  <div class="essenceInfo">
                    <div class="cartEssenceName"><span></span></div>
                </div>
              </div>
              <div class= "interactionsBox">
                     <div class="actions">
                       <div class="buttons">
                         <div class= quantity>Quantità:<div></div></div>
                         <div class="removeFromCart"><span></span></div>
                       </div>
                    </div>                    
                </div>
                <input type="hidden" name="cartProductId">
          </article>
        </template>
        <div id= "divCloseCart"><a id= "closeCart">CHIUDI</a></div>
      <div class="cart" id="cart_content">
              
            </div>
        </section>
    <footer>
      <a><img src="Immagini/Social logo.png"></a>
      <address>Val di Fiemme - Trento (TN) </address>
      <p>Calogero Crapanzano - DIEII Unict - N. Matricola: O46002084</p>
    </footer>
  </body>
</html>