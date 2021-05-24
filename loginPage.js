function checkForm(){
    document.getElementById('submit').disabled =
        Object.keys(formStatus).length !== 3 && Object.values(formStatus).includes(false);
}


function checkUsername(event){
    const input = document.querySelector('.username input');
    if(!/^[a-zA-Z0-9_]{1,15}$/.test(input.value)){
        input.parentNode.parentNode.classList.add('errorj');
        formStatus.username = false;
        checkForm();
    }else{
        fetch("check_username.php?q="+encodeURIComponent(input.value)).then(fetchResponse).then(jsonCheckUsername);
        input.parentNode.parentNode.classList.remove('errorj');
        input.parentNode.parentNode.querySelector('span').textContent = '';
    }
}

function checkPassword(event){
    const passwordInput= document.querySelector('.password input');
    if(formStatus.password = passwordInput.value.length >=10){
        passwordInput.parentNode.parentNode.classList.remove('errorj');
        passwordInput.parentNode.parentNode.querySelector('span').textContent = '';
    }else{
        passwordInput.parentNode.parentNode.classList.add('errorj')
        passwordInput.parentNode.parentNode.querySelector('span').textContent = 'Password non valida';
    }

    checkForm();
}

function fetchResponse(response){
    if(!response.ok) return null;
    return response.json();
}

function jsonCheckUsername(json){
    if(formStatus.username = !json.exists){
        document.querySelector('.username').classList.add('errorj');
        document.querySelector('.username span').textContent = "Username non valido";
    }else{
        document.querySelector('.username').classList.remove('errorj');
    }
    checkForm();
}

const formStatus = {'upload' : true};
document.querySelector('.username input').addEventListener('blur',checkUsername);
document.querySelector('.password input').addEventListener('blur',checkPassword);

if(document.querySelector('.error') !== null){
    checkUsername(); checkPassword();
}