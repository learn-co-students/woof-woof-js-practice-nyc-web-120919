const baseURL = "http://localhost:3000/pups";

window.addEventListener('DOMContentLoaded', function(){
    fetchPuppyNames().then(puppies => renderPuppyNames(puppies));
    addFilterListener();
});

function fetchPuppyNames() {
    return fetch(baseURL)
    .then(response => response.json());
}

function renderPuppyNames(puppies) {
    const puppyDiv = document.getElementById('dog-bar');
    puppyDiv.addEventListener('click', puppyClicked);

    puppies.forEach(pup => {
        const span = document.createElement('span');
        span.innerHTML = pup.name;
        span.dataset.id = pup.id;
        span.dataset.isGoodDog = pup.isGoodDog;

        puppyDiv.appendChild(span);
    })
}

function filterGoodPuppies(filterIsOn) {
    const puppyDiv = document.getElementById('dog-bar');
    for (let span of puppyDiv.children) {
        const badDog = span.dataset.isGoodDog === 'false'
        if (filterIsOn && badDog) {
            span.style.display = 'none';
        }
        else {
            span.style.display = 'flex';
        }
    }
}

function puppyClicked(event) {
    const puppySpan = event.target;
    if (puppySpan.tagName === 'SPAN') {
        fetch(`${baseURL}/${puppySpan.dataset.id}`)
        .then(response => response.json())
        .then(puppy => renderPuppyInfo(puppy));
    }
}

function renderPuppyInfo(puppy) {
    const dogInfoDiv = document.getElementById("dog-info");

    dogInfoDiv.innerHTML = "";

    const imageTag = document.createElement('img');
    const nameH2 = document.createElement('h2');
    const goodDogButton = document.createElement('button');

    imageTag.src = puppy.image
    nameH2.innerHTML = puppy.name;
    goodDogButton.innerText = getButtonText(puppy.isGoodDog);

    goodDogButton.dataset.id = puppy.id;
    goodDogButton.addEventListener('click', goodBadClicked);

    dogInfoDiv.append(imageTag);
    dogInfoDiv.append(nameH2);
    dogInfoDiv.append(goodDogButton);
}

function goodBadClicked(event) {
    const button = event.target;
    console.dir(button)
    const dogId = button.dataset.id;
    let currentState = button.innerText.includes("Good");

    button.innerText = getButtonText(!currentState);
    
    fetch(`${baseURL}/${dogId}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            accept: "application/json"
        },
        body: `{"isGoodDog": ${!currentState}}`
    })
    .then(response => response.json())
    .then(puppy => {filterGoodPuppies(isGoodFilterOn())});

}

function getButtonText(isGoodDog) {
    return isGoodDog ? 'Good dog!' : 'Bad dog!';
}

function addFilterListener() {
    const filterButton = document.getElementById('good-dog-filter');
    filterButton.addEventListener('click', function(event) {
        if (filterButton.innerHTML.includes("OFF")) {
            filterButton.innerHTML = "Filter good dogs: ON"
            filterGoodPuppies(true);
        }
        else {
            filterButton.innerHTML = "Filter good dogs: OFF"
            filterGoodPuppies(false);
        }
    })
}

function isGoodFilterOn() {
    document.getElementById('good-dog-filter').includes("ON");
}




