CREATE TABLE users (
    id integer primary key auto_increment,
    username varchar(20) not null unique,
    password varchar(255) not null,
    email varchar(120) not null,
    name varchar(120) not null,
    surname varchar(120) not null,
    district varchar(4) not null,
    city varchar (60) not null,
    CAPcode integer not null,
    street1 varchar(120) not null,
    street2 varchar(120) not null
) Engine = InnoDB;

CREATE TABLE essences (
    id integer primary key auto_increment,
    essence json
) Engine = InnoDB;

CREATE TABLE products (
    id integer primary key auto_increment,
    product json
) Engine = InnoDB;

CREATE TABLE shoppingCart (
    id integer primary key auto_increment,
    userID integer not null,
    foreign key (userID) references users(id) on delete cascade on update cascade
) Engine = InnoDB;

CREATE TABLE cartItems(
    cartID integer not null,
    productId integer not null,
    foreign key (productId) references products(id) on delete cascade on update cascade,
    foreign key (cartID) references shoppingCart(id) on delete cascade on update cascade
) Engine = InnoDB;

CREATE TABLE cookies (
    id integer auto_increment primary key,
    hash varchar(255) not null,
    user integer not null,
    expires bigint not null,
    foreign key(user) references users(id) on delete cascade on update cascade
)Engine = InnoDB;

DELIMITER //
CREATE TRIGGER create_cart
AFTER INSERT ON users
FOR EACH ROW
BEGIN
INSERT INTO shoppingCart(userID) VALUES (NEW.id);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER addToCart
AFTER INSERT ON cartItems
FOR EACH ROW
BEGIN
UPDATE products
SET product = JSON_SET(product, '$.availability', json_extract(product, '$.availability') - 1) WHERE id = new.productId;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER removeFromCart
AFTER DELETE ON cartItems
FOR EACH ROW
BEGIN
UPDATE products
SET product = JSON_SET(product, '$.availability', json_extract(product, '$.availability') + 1) WHERE id = old.productId;
END //
DELIMITER ;

/*INSERT ESSENCE*/
INSERT INTO essences(essence) VALUES ('{
        "name": "Abete Rosso",
        "sample": "Immagini/Essenze/Abete rosso Val di Fiemme.png",
        "info": "Legno storico con elevate proprietà di risonanza, leggero e flessibile. Impiegato nella realizzazione di tavole armoniche di tutti gli strumenti acustici.",
        "idGBIF": 5284884
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Acero",
        "sample": "Immagini/Essenze/Acero.png",
        "info": "È uno dei legni più utilizzati per la costruzione di strumenti musicali. In particolare per manici di chitarra elettrica o fasce laterali, fondo e manico per gli strumenti ad arco, nonché strumenti a percussione.",
        "idGBIF": 3189834
    }');
    
INSERT INTO essences(essence) VALUES ('{
        "name": "Acero Marezzato",
        "sample": "Immagini/Essenze/Acero marezzato.png",
        "info": "Stesse caretteristiche e usi della variante liscia, ad eccezione di striature e zebrature che ne impreziosiscono il valore e lo rendono affascinante alla vista.",
        "idGBIF": 3189834
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Amaranto",
        "sample": "Immagini/Essenze/Amaranto.png",
        "info": "Pochi legni come lo zebrano risentono gli alti e bassi della moda, forse a causa della sua troppo evidente venatura che tuttavia presenta ottime doti decorative.",
        "idGBIF": 3085074
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Bocote",
        "sample": "Immagini/Essenze/Bocote.png",
        "info": "Il Bocote è un legno sudamericano, con una trama zebrata che permette di ottenere degli effetti ottici molto particolari.",
        "idGBIF": 2900865
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Cedro",
        "sample": "Immagini/Essenze/Cedro.png",
        "info": "Spesso considerato come alternativa per la produzione di tavole armoniche in abete, da cui si differenzia per la resa acustica in genere più calda e per il colore bronzeo.",
        "idGBIF": 3190157
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Ciliegio",
        "sample": "Immagini/Essenze/Ciliegio.png",
        "info": "Il legno ciliegio è pregiato e molto resistente. Viene usato in falegnameria per realizzare mobili eleganti, strumenti musicali e pavimenti di pregio.",
        "idGBIF": 3020791
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Ebano Macassar",
        "sample": "Immagini/Essenze/Ebano macassar.png",
        "info": "Originario di Sulawesi è uno tra i legni più duri e densi che esistano, trova il suo impiego per questo in tastiere o ponticelli di chitarre e in tutta la famiglia degli archi.",
        "idGBIF": 3030169
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Mogano",
        "sample": "Immagini/Essenze/Mogano.png",
        "info": "La buona lavorabilità e la minuziosa finitura fanno del mogano una scelta di classe per molti costruttori di mobili ed ebanisti. Viene usato poi per impiallacciature, falegnameria di interni, tornitura e strumenti musicali. Le specie americane sono anche utilizzate nella costruzione di imbarcazioni.",
        "idGBIF": 3190483
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Noce",
        "sample": "Immagini/Essenze/Noce.png",
        "info": "Il noce è uno dei legni più pregiati e al tempo stesso più diffusi al mondo, apprezzato per le sue qualità meccaniche e la notevole durevolezza.",
        "idGBIF": 3054368
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Ovangkol",
        "sample": "Immagini/Essenze/Ovangkol.png",
        "info": "Usato come massiccio per mobili di pregio e per pannellature. Trova anche impiego nella castruzione di parquet a mosaico, cornici e lavori al tornio.",
        "idGBIF": 2964815
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Padouk",
        "sample": "Immagini/Essenze/Padouk.png",
        "info": "Generalmente utilizzato per l’interno, l’arredo della casa o quanto meno di appartamenti residenziali.Per mantenere la colorazione rosso vivo questo legno deve essere verniciato velocemente, evitando inoltre esposizione alla luce prolungata.",
        "idGBIF": 5349273
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Palissandro",
        "sample": "Immagini/Essenze/Palissandro indiano.png",
        "info": "Ha un odore dolciastro molto persistente e per questo viene anche detto legno di rosa. Sostituisce in circostanze necessarie il più pesante ebano ed è per tradizione il legno di fondo e fasce per chitarre classiche di alta taratura.",
        "idGBIF": 2968358
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Pioppo",
        "sample": "Immagini/Essenze/Pioppo.png",
        "info": "Il legno di pioppo è uno dei più impiegati nella produzione industriale di oggetti in legno. Nonostante la sua leggerezza i suoi utlizzi spaziano da tavoli a parti strutturali.",
        "idGBIF": 3040183
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Sitka",
        "sample": "Immagini/Essenze/Sitka.png",
        "info": "Una variante di abete, è scelto per le sue qualità: venature dritte costanti ed uniformi, longevità e resistenza alla trazione.",
        "idGBIF": 5284827
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Tiglio",
        "sample": "Immagini/Essenze/Tiglio.png",
        "info": "Il tiglio è un albero di essenza tenera, della famiglia delle latifoglie. Il legno è di molto facile incisione, idealre per lavori di intaglio, intarsio e scultura",
        "idGBIF": 3152041
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Ulivo",
        "sample": "Immagini/Essenze/Ulivo.png",
        "info": "Difficile da utilizzare e da reperire in ampie tavole data la conformazione degli alberi, le sue venature irregolari creano disegni stupefacenti. ",
        "idGBIF": 5415040
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Wenge",
        "sample": "Immagini/Essenze/Wenge.png",
        "info": "Il wenge è un tipo di legno molto pregiato ed esteticamente molto bello da vedere. Vanta una grande resistenza che lo rende la materia prima perfetta per la costruzione di arredi.",
        "idGBIF": 5355672
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Zebrano",
        "sample": "Immagini/Essenze/Zebrano.png",
        "info": "Pochi legni come lo zebrano risentono gli alti e bassi della moda, forse a causa della sua troppo evidente venatura che tuttavia presenta ottime doti decorative.",
        "idGBIF": 2941147
    }');

INSERT INTO essences(essence) VALUES ('{
        "name": "Ziricote",
        "sample": "Immagini/Essenze/Ziricote.png",
        "info": "Legno affascinante grazie alle sue venature movimentate e ariose. Simile al Palissandro (anche negli usi) ma più armonioso, regala robustezza e grandi sensazioni estetiche.",
        "idGBIF": 5662394
    }');

/*INSERT PRODUCT*/
INSERT INTO products(product) VALUES ('{
        "type": "Grezzo",
        "name": "Tronco stagionato (1mt cubo)",
        "essence": "Abete Rosso",
        "price": 120,
        "availability": 12
    }');
INSERT INTO products(product) VALUES ('{
        "type": "Grezzo",
        "name": "Tronco stagionato (1mt cubo)",
        "essence": "Bocote",
        "price": 210,
        "availability": 1
    }');
INSERT INTO products(product) VALUES ('{
        "type": "Grezzo",
        "name": "Tronco verde (1mt cubo)",
        "essence": "Noce",
        "price": 60,
        "availability": 14
    }');
INSERT INTO products(product) VALUES ('{
        "type": "Grezzo",
        "name": "Tronco verde (1mt cubo)",
        "essence": "Pioppo",
        "price": 45,
        "availability": 31
    }');

INSERT INTO products(product) VALUES ('{
        "type": "Semilavorato",
        "name": "Asse (20x2000x400mm)",
        "essence": "Noce",
        "price": 30,
        "availability": 26
    }');

INSERT INTO products(product) VALUES ('{
        "type": "Semilavorato",
        "name": "Coppia lastre specchiate taglio di quarto (4x300x600mm)",
        "essence": "Abete Rosso",
        "price": 40,
        "availability": 8
    }');

INSERT INTO products(product) VALUES ('{
        "type": "Semilavorato",
        "name": "Coppia lastre specchiate taglio di quarto (4x300x600mm)",
        "essence": "Palissandro",
        "price": 20,
        "availability": 17
    }');

INSERT INTO products(product) VALUES ('{
        "type": "Semilavorato",
        "name": "Coppia lastre specchiate taglio di quarto (4x300x600mm)",
        "essence": "Cedro",
        "price": 31,
        "availability": 24
    }');

INSERT INTO products(product) VALUES ('{
        "type": "Rifinito",
        "name": "Tastiera piatta chitarra classica",
        "essence": "Ebano Macassar",
        "price": 10,
        "availability": 80
    }');

INSERT INTO products(product) VALUES ('{
        "type": "Rifinito",
        "name": "Pipa",
        "essence": "Wenge",
        "price": 8,
        "availability": 21
    }');

INSERT INTO products(product) VALUES ('{
        "type": "Rifinito",
        "name": "Ponticello chitarra classica",
        "essence": "Palissandro",
        "price": 12,
        "availability": 47
    }');

INSERT INTO products(product) VALUES ('{
        "type": "Rifinito",
        "name": "Mentoliera violino",
        "essence": "Ebano Macassar",
        "price": 8,
        "availability": 21
    }');

