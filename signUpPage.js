function checkForm(){
    document.getElementById('submit').disabled =
        Object.keys(formStatus).length !== 10 && Object.values(formStatus).includes(false);
}

function checkName(event){
    const input= event.currentTarget;
    if(formStatus[input.name] = input.value.length > 0){
        input.parentNode.parentNode.classList.remove('errorj');
        input.parentNode.parentNode.querySelector('span').textContent = '';
    }else{
        input.parentNode.parentNode.querySelector('span').textContent = "Riempi campo";
        input.parentNode.parentNode.classList.add('errorj')
    }

    checkForm();
}

function checkCAPcode(event){
    const input= event.currentTarget;
    if(!/^[0-9]{5}$/.test(input.value)){
        input.parentNode.parentNode.classList.remove('errorj');
        input.parentNode.parentNode.querySelector('span').textContent = 'Il CAP è formato da 5 caratteri numerici';
    }else{
        input.parentNode.parentNode.querySelector('span').textContent = '';
        input.parentNode.parentNode.classList.add('errorj')
    }

    checkForm();
}

function checkPassword(event){
    const passwordInput= document.querySelector('.password input');
    if(formStatus.password = passwordInput.value.length >=10){
        passwordInput.parentNode.parentNode.classList.remove('errorj');
        passwordInput.parentNode.parentNode.querySelector('span').textContent = '';
    }else{
        passwordInput.parentNode.parentNode.classList.add('errorj')
        passwordInput.parentNode.parentNode.querySelector('span').textContent = 'La password deve essere composta da almeno 10 caratteri';
    }

    checkForm();
}

function checkConfirmPassword(event){
    const confirmPasswordInput= document.querySelector('.confirmPassword input');
    if(formStatus.confirmPassword = confirmPasswordInput.value === document.querySelector('.password input').value){
        confirmPasswordInput.parentNode.parentNode.classList.remove('errorj');
        confirmPasswordInput.parentNode.parentNode.querySelector('span').textContent = '';
    }else{
        confirmPasswordInput.parentNode.parentNode.classList.add('errorj')
        confirmPasswordInput.parentNode.parentNode.querySelector('span').textContent = 'Le password non coincidono';
    }

    checkForm();
}

function checkUsername(event){
    const input = document.querySelector('.username input');

    if(!/^[a-zA-Z0-9_]{1,15}$/.test(input.value)){
        input.parentNode.parentNode.querySelector('span').textContent = "Puoi usare lettere, numeri e '_' per un massimo di 15 caratteri";
        input.parentNode.parentNode.classList.add('errorj');
        formStatus.username = false;
        checkForm();
    }else{
        fetch("check_username.php?q="+encodeURIComponent(input.value)).then(fetchResponse).then(jsonCheckUsername);
        input.parentNode.parentNode.classList.remove('errorj');
        input.parentNode.parentNode.querySelector('span').textContent = '';
    }
}

function checkEmail(event){
    const input = document.querySelector('.email input');

    if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value)){
        input.parentNode.parentNode.querySelector('span').textContent = "Email non valida";
        input.parentNode.parentNode.classList.add('errorj');
        formStatus.email = false;
        checkForm();
    }else{
        fetch("check_email.php?q="+encodeURIComponent(input.value)).then(fetchResponse).then(jsonCheckEmail);
        input.parentNode.parentNode.querySelector('span').textContent = '';
    }
}

function fetchResponse(response){
    if(!response.ok) return null;
    return response.json();
}

function jsonCheckUsername(json){
    if(formStatus.username = !json.exists){
        document.querySelector('.username').classList.remove('errorj');
    }else{
        document.querySelector('.username span').textContent = "Username già in uso";
        document.querySelector('.username').classList.add('errorj');
    }
    checkForm();
}

function jsonCheckEmail(json){
    if(formStatus.email = !json.exists){
        document.querySelector('.email').classList.remove('errorj');
    }else{
        document.querySelector('.email span').textContent = "Email associata ad un account esistente";
        document.querySelector('.email').classList.add('errorj');
    }
    checkForm();
}

const formStatus = {'upload' : true};
document.querySelector('.name input').addEventListener('blur', checkName);
document.querySelector('.surname input').addEventListener('blur',checkName);
document.querySelector('.username input').addEventListener('blur',checkUsername);
document.querySelector('.email input').addEventListener('blur',checkEmail);
document.querySelector('.password input').addEventListener('blur',checkPassword);
document.querySelector('.confirmPassword input').addEventListener('blur',checkConfirmPassword);
document.querySelector('.district input').addEventListener('blur',checkName);
document.querySelector('.city input').addEventListener('blur',checkName);
document.querySelector('.CAPcode input').addEventListener('blur',checkCAPcode);
document.querySelector('.street1 input').addEventListener('blur',checkName);

if(document.querySelector('.error') !== null){
    checkUsername(); checkPassword(); checkConfirmPassword(); checkEmail();
    document.querySelector('.name input').dispatchEvent(new Event('blur'));
    document.querySelector('.surname input').dispatchEvent(new Event('blur'));
}