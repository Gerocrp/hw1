function initialize(){
    document.querySelector('#bm').classList.add('hidden');

    const rightArrow = document.createElement('img');
        const leftArrow = document.createElement('img');
        rightArrow.src = rightArrowPng;
        leftArrow.src = leftArrowPng;

        rightArrow.id = 'rightArrow';
        leftArrow.id = 'leftArrow';

        document.getElementById('arrows').appendChild(leftArrow);
        document.getElementById('arrows').appendChild(rightArrow);

    fetchEssences('');
}


function fetchEssences(essenceProduct){
    fetch("fetch_essence.php?essenceName="+ essenceProduct).then(onResponse).then(fetchEssencesJson);
}

function fetchEssencesJson(json){
        document.getElementById('mainBox').innerHTML = '';
    for(let i in json){
        const essence = document.querySelectorAll('.essence');

        if(essence.length === 0 || Number.isInteger(essence.length/6)){
            const addSixItemBox = document.createElement('div');
            addSixItemBox.className = 'sixItemBox';
            addSixItemBox.classList.add('hidden');
            document.getElementById('mainBox').appendChild(addSixItemBox);
        }
        

        const  addEssence = document.createElement('div');
        addEssence.className = 'essence';

        const addBox = document.createElement('div');
        addBox.className = 'pImgBox'

        const addP = document.createElement('p');
        addP.textContent = json[i].essence.name;
        
        const addSample = document.createElement('img');
        addSample.src = json[i].essence.sample;

        const addInfo = document.createElement('p');
        addInfo.className = 'textInfo';
        addInfo.classList.add('hidden');
        addInfo.textContent = json[i].essence.info;

        const addPlus = document.createElement('a');
        addPlus.className = 'plus';
        addPlus.addEventListener('click', togglePlantInfo);
        const addImg = document.createElement('img');
        addImg.src = plusPng;
        addPlus.appendChild(addImg);
        addPlus.classList.add('hidden');

        addEssence.appendChild(addBox);
        addEssence.appendChild(addInfo);
        addEssence.appendChild(addPlus);

        addEssence.querySelector('div').appendChild(addP);
        addEssence.querySelector('div').appendChild(addSample);
        
        const addClickB = document.createElement('div');
        addClickB.className = 'essenceClickBox';
        addEssence.appendChild(addClickB);
        
        const addA = document.createElement('a');
        addA.className = 'details';
        addA.addEventListener('click', toggleInfo);
        addEssence.querySelectorAll('div')[1].appendChild(addA);
    
        
        const addChevronCircle = document.createElement('img');
        addChevronCircle.src = chevronLinkDown;
        addClickB.querySelectorAll('a')[0].appendChild(addChevronCircle);
        
        document.querySelectorAll('.sixItemBox')[document.querySelectorAll('.sixItemBox').length -1].appendChild(addEssence);
    }
    
    if(document.querySelectorAll('.sixItemBox')[0]){
        document.querySelectorAll('.sixItemBox')[0].classList.remove('hidden');
    }
        
    if(document.querySelectorAll('.sixItemBox')[1]){
        document.querySelectorAll('.sixItemBox')[1].classList.remove('hidden');
    }
}

function fetchEssenceForGBIF(essenceName){
    fetch("fetch_essence.php?essenceName="+essenceName).then(onResponse).then(fetchidGBIFJson);
}

function fetchidGBIFJson(json){
    fetch("https://api.gbif.org/v1/species/"+json[0].essence.idGBIF).then(onResponse).then(onGbifJson);
    document.getElementById('noKeyApiBox').scrollIntoView();
}

function isEmpty(){
    if (document.querySelector('.preferiti').querySelectorAll('.essence').length !== 0){
        document.querySelector('#bm').classList.remove('hidden');
        document.querySelector('.preferiti').classList.add('makeFlex');
    }
    if (document.querySelector('.preferiti').querySelectorAll('.essence').length === 0){
        document.querySelector('#bm').classList.add('hidden');
        document.querySelector('.preferiti').classList.remove('makeFlex');
    }
}

function essenceManager(){
    fetchEssences(textInput.value);
}

function boxGoForward(event){
    const boxes = document.querySelectorAll(".sixItemBox");
    
    if(forBoxBack < boxes.length-1){
        boxes[forBoxForward].classList.add('hidden');
        boxes[forBoxForward+1].classList.add('hidden');
        boxes[forBoxBack+1].classList.remove('hidden');
        boxes[forBoxBack+2].classList.remove('hidden');
        forBoxBack+=2;
        forBoxForward+=2;
    }
}

function boxGoBack(event){
    if(forBoxBack > 1){
        const boxes = document.querySelectorAll(".sixItemBox");
        boxes[forBoxBack].classList.add('hidden');
        boxes[forBoxBack-1].classList.add('hidden');
        boxes[forBoxForward-1].classList.remove('hidden');
        boxes[forBoxForward-2].classList.remove('hidden');
        forBoxBack-=2;
        forBoxForward-=2;
    }
}



function onGbifJson(json){
    const dataGBIF = document.getElementById('dataGBIF');
    
    const  addScientificName = document.createElement('div');
    addScientificName.textContent = 'Nome scientifico: ' + json.scientificName;
    
    fetch("http://api.gbif.org/v1/occurrence/search?mediatype=StillImage&scientificName=" + json.scientificName).then(onResponse).then(onGbifImgJson);
    
    const addPhylum = document.createElement('div');
    addPhylum.textContent = 'Divisione(Phylum): ' + json.phylum;
    
    const addOrder = document.createElement('div');
    addOrder.textContent = 'Ordine: ' + json.order;
    
    const addFamily = document.createElement('div');
    addFamily.textContent = 'Famiglia: ' + json.family;
    
    const addGenus = document.createElement('div');
    addGenus.textContent = 'Genere: ' + json.genus;
    
    const addClass = document.createElement('div');
    addClass.textContent = 'Classe: ' + json.class;
    
    dataGBIF.appendChild(addScientificName);
    dataGBIF.appendChild(addPhylum);
    dataGBIF.appendChild(addOrder);
    dataGBIF.appendChild(addFamily);
    dataGBIF.appendChild(addGenus);
    dataGBIF.appendChild(addClass);
}

function onGbifImgJson(json){
    const addImgGBIF = document.createElement('img');
    occurrences = json.results;
    for(occurrence of occurrences){
        if(occurrence.media[0].identifier){
            addImgGBIF.src = occurrence.media[0].identifier;
            document.getElementById('GBIF').appendChild(addImgGBIF);
            return;
        }
    }
    
}

function onResponse(response){
    if(!response.ok){
        console.log(response);
    }
    else
    return response.json();
}

function toggleInBookMarks(event){
    
    
    const checkImg = event.currentTarget.querySelector('img');

    if(checkImg.className === 'noBm'){
        checkImg.src = bookmarkStarLinkRemove;
        checkImg.className = 'yesBm';
        const addBm = document.createElement('div');
        const addPImgBox = document.createElement('div');
        const addP = document.createElement('p');
        const addImg = document.createElement('img');
        const addDivBm = document.createElement('div');
        const addABm = document.createElement('a');
        const addClickImg = document.createElement('img')
        
        addBm.className = 'essence';
        addPImgBox.className = 'pImgBox';
        addDivBm.className = 'essenceClickBox';
        addABm.className = 'bmStar'

        addBm.appendChild(addPImgBox);
        addPImgBox.appendChild(addP);
        addPImgBox.appendChild(addImg);

        addBm.appendChild(addDivBm);
        addDivBm.appendChild(addABm);
        addABm.appendChild(addClickImg);

        addP.textContent = event.currentTarget.parentNode.parentNode.querySelector('p').textContent;

        addImg.src = event.currentTarget.parentNode.parentNode.querySelector('img').src;
        addClickImg.src = bookmarkStarLinkRemove;
        document.querySelector('.preferiti').appendChild(addBm);
        isEmpty();
    }
    else{
        const bookMarksList = document.querySelector('.preferiti').querySelectorAll('.essence');
        for(const which of bookMarksList){
            if (which.querySelector('p').textContent === event.currentTarget.parentNode.parentNode.querySelector('p').textContent){
                which.remove();
            }
        }
        checkImg.src = bookmarkStarLinkAdd;
        checkImg.className = 'noBm';
        isEmpty();
    }
    
    toRemove = document.querySelector('.preferiti').querySelectorAll('.bmStar');

    for(const alredyIn of toRemove){
        alredyIn.addEventListener('click',removeFromBookMark);
    }   

}

function removeFromBookMark (event){
    const mainBoxStars = document.querySelector('#mainBox').querySelectorAll('.bmStar');

    for(const reset of mainBoxStars){
        if (reset.parentNode.parentNode.querySelector('p').textContent === event.currentTarget.parentNode.parentNode.querySelector('p').textContent){
            reset.querySelector('img').src = bookmarkStarLinkAdd;
            reset.querySelector('img').className = 'noBm';
        }
    }
    event.currentTarget.parentNode.parentNode.remove();
    isEmpty();
}

function togglePlantInfo(event){
    
    if(document.getElementById('GBIF').querySelector('img')){
        document.getElementById('GBIF').querySelector('img').remove();
    }
    
    if(document.getElementById('dataGBIF').innerHTML !== ''){
        document.getElementById('dataGBIF').innerHTML = '';
    }
    
    document.getElementById('noKeyApiBox').classList.remove('hidden');
    document.getElementById('noKeyApiBox').classList.add('makeFlex');
    fetchEssenceForGBIF(event.currentTarget.parentNode.querySelector('p').textContent);
}

function removeApiBox(event){
    event.currentTarget.parentNode.classList.add('hidden');
    event.currentTarget.parentNode.classList.remove('makeFlex');
}

function onCatJson(json){
    const gifCat = document.createElement('img');
    gifCat.src = json.data.image_original_url;
    document.getElementById('apiKeyApiBox').appendChild(gifCat);
}

function loadCatGif(){
    if(document.getElementById('clickaQui').textContent === 'CLICKA QUI!'){
        document.getElementById('apiKeyApiBox').querySelector('span').remove();
        fetch("http://api.giphy.com/v1/gifs/random?tag=cat&api_key=nXaDNAUfvbhL5vkYt8uuZhAiPPfkv7rG&rating=g").then(onResponse).then(onCatJson);
        document.getElementById('clickaQui').textContent = 'CLICKA ANCORA!';
    }
    else{
        document.getElementById('apiKeyApiBox').querySelector('img').remove();
        fetch("http://api.giphy.com/v1/gifs/random?tag=cat&api_key=nXaDNAUfvbhL5vkYt8uuZhAiPPfkv7rG&rating=g").then(onResponse).then(onCatJson);
    }
}

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

function scrollToMain(event){
    document.getElementById('main').scrollIntoView();
}

function scrollToAboutUs(event){
    document.getElementById('aboutUs').scrollIntoView();
}

function toggleInfo(event){
    const text = event.currentTarget.parentNode.parentNode.querySelector('.textInfo');
    const plus = event.currentTarget.parentNode.parentNode.querySelector('.plus');

    
    if(text.classList[1] === 'hidden'){
        text.classList.remove('hidden');
        plus.classList.remove('hidden');
        const image = event.currentTarget.parentNode.parentNode.querySelector('.essenceClickBox').querySelector('.details').querySelector('img');
        image.src = chevronLinkUp;
        
    }
    else{
        const image = event.currentTarget.parentNode.parentNode.querySelector('.essenceClickBox').querySelector('.details').querySelector('img');
        image.src = chevronLinkDown;
        text.classList.add('hidden');
        plus.classList.add('hidden');
    }
}

initialize();

let forBoxForward = 0;
let forBoxBack = 1;


let mainEssences;
let toRemove = document.querySelector('.preferiti').querySelectorAll('.bmStar');

let shown = 0;

const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

leftArrow.addEventListener('click', boxGoBack);
rightArrow.addEventListener('click', boxGoForward);

const textInput = document.getElementById('searchBar');
textInput.addEventListener('keyup', essenceManager);

const toggleNoKeyApi = document.getElementById('hideApiBox');
toggleNoKeyApi.addEventListener('click', removeApiBox);

const toggleApiKeyApi = document.getElementById('clickaQui');
toggleApiKeyApi.addEventListener('click', loadCatGif);

document.getElementById('Essenze').addEventListener('click', scrollToMain);
document.getElementById('ChiSiamo').addEventListener('click', scrollToAboutUs);
document.getElementById('menuEssenze').addEventListener('click', scrollToMain);
document.getElementById('menuChiSiamo').addEventListener('click', scrollToAboutUs);

const toggleMenu = document.getElementById('menu');
toggleMenu.addEventListener('click', showHideMenu);