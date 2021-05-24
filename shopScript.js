function showHideMenu(event){
    if(shown == 0){
        document.getElementById('menuLinks').classList.remove('zIndex-1');
        document.getElementById('menuLinks').classList.add('zIndex2');
        shown++;
    }
    else if(shown == 1){
        document.getElementById('menuLinks').classList.add('zIndex-1');
        document.getElementById('menuLinks').classList.remove('zIndex2');
        shown--;
    }
}

function searchProduct(){
    console.log(textInput.value);
    fetchSearchProduct(textInput.value);
}

function onResponse(response){
    if(!response.ok){
        console.log(response);
    }
    else
    return response.json();
}

function fetchProducts(){
    fetch("fetch_product.php").then(onResponse).then(fetchProductsJson);
}

function fetchSearchProduct(productName){
    fetch("fetch_search_product.php?productName="+productName).then(onResponse).then(fetchProductsJson);
}

function fetchCart(){
    fetch("fetch_cart.php").then(onResponse).then(fetchCartJson);
}

function setSample(){
    fetch("fetch_essence.php?essenceName=").then(onResponse).then(fetchSetSample);
}

function fetchSetSample(json){
    const productSample = document.querySelectorAll('.essenceName');
    for(let sample of productSample){
        for(let i in json){
            if(sample.querySelector('span').textContent === json[i].essence.name){
                sample.parentNode.querySelector('.essenceSample img').src = json[i].essence.sample;
            }
        }
    }
}

function writeReview(event){
    event.currentTarget.parentNode.parentNode.querySelector('.reviews_form').classList.remove('hidden');
}

function fetchProductsJson(json){
    document.querySelector('#mainBox').innerHTML = '';
    for(let i in json){
        const addProduct = document.getElementById('product_template').content.cloneNode(true).querySelector(".product");
        addProduct.querySelector('.productType').textContent = json[i].product.type;
        addProduct.querySelector('.productName').textContent = json[i].product.name;
        addProduct.querySelectorAll('.productPrice div')[1].textContent = json[i].product.price;
        addProduct.querySelectorAll('.productAvailability div')[1].textContent = json[i].product.availability;
        addProduct.querySelector('.essenceName span').textContent = json[i].product.essence;
        addProduct.dataset.id = addProduct.querySelector("input[type = hidden]").value = json[i].id;
        addProduct.querySelector('.addToCart').addEventListener('click', addToCart);
        if(json[i].product.availability < 1){
            addProduct.querySelector('.addToCart').removeEventListener('click', addToCart);
            addProduct.querySelector('.addToCart').classList.add('cannotAdd');
            addProduct.querySelector('.productAvailability').classList.add('makeRed');
        }
        document.getElementById('mainBox').appendChild(addProduct);
    }
    setSample();
}


function fetchCartJson(json){
        document.querySelector('#cart_content').innerHTML = '';
        for(let i in json){
        const addCartProduct = document.getElementById('cartProduct_template').content.cloneNode(true).querySelector(".cartProduct");
        addCartProduct.querySelector('.cartProductName').textContent = document.querySelector(".product[data-id='"+json[i].id+"']").querySelector('.productName').textContent;
        addCartProduct.querySelectorAll('.cartProductPrice div')[1].textContent = document.querySelector(".product[data-id='"+json[i].id+"']").querySelectorAll('.productPrice div')[1].textContent * json[i].quantity;
        addCartProduct.querySelector('.cartEssenceName span').textContent = document.querySelector(".product[data-id='"+json[i].id+"']").querySelector('.essenceName').textContent;
        addCartProduct.querySelector('.quantity div').textContent = json[i].quantity;
        addCartProduct.dataset.cartId = addCartProduct.querySelector("input[type = hidden]").value = json[i].id;
        addCartProduct.querySelector('.removeFromCart').addEventListener('click', removeFromCart);
        document.getElementById('cart_content').appendChild(addCartProduct);
        }
        
}


function addToCart(event){
    button = event.currentTarget;
    const formData = new FormData();
    formData.append('productId', button.parentNode.parentNode.parentNode.parentNode.dataset.id);
    fetch("addToCart.php", {method: 'post', body: formData}).then(onResponse).then(updateAvailability).then(fetchCart);
}

function removeFromCart(event){
    button = event.currentTarget;
    const formData = new FormData();
    formData.append('cartProductId', button.parentNode.parentNode.parentNode.parentNode.dataset.cartId);
    fetch("removeFromCart.php", {method: 'post', body: formData}).then(onResponse).then(updateAvailability).then(fetchCart);
}

function updateAvailability(json) {
    document.querySelector('[data-id="'+json.productid+'"]').querySelectorAll('.productAvailability div')[1].textContent = json.availability.quantity;
    if (json.availability.quantity < 1) {
        button.removeEventListener('click', addToCart);
        button.classList.add('cannotAdd');
        button.parentNode.parentNode.parentNode.parentNode.querySelector('.productAvailability').classList.add('makeRed');
    }
    fetchCart();
    fetchProducts();
}

function toggleCart(){
    if(document.getElementById('shoppingCart').className == "hidden"){
        document.getElementById('shoppingCart').classList.remove('hidden');
    } else{
        document.getElementById('shoppingCart').classList.add('hidden');
    }
}

fetchProducts();
fetchCart();

let shown = 0;
const toggleMenu = document.getElementById('menu');
toggleMenu.addEventListener('click', showHideMenu);

const textInput = document.getElementById('searchBar');
textInput.addEventListener('keyup', searchProduct);

document.querySelectorAll('#cartButton')[0].addEventListener('click', toggleCart);
document.querySelectorAll('#cartButton')[1].addEventListener('click', toggleCart);
document.getElementById('closeCart').addEventListener('click', toggleCart);
