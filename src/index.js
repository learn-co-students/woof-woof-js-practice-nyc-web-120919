let allDogs = []
let filter = false;

document.addEventListener('DOMContentLoaded', () => {
    getDogs()
    filterDogButton()
});

function getDogs() {
    fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(json => {
            allDogs = json;
            renderDogs(allDogs)
        })
}

function renderDogs(dogs) {
    const div = document.getElementById('dog-bar')
    div.innerHTML = ''
    dogs.forEach(dog => {
        const span = document.createElement('span')
        span.innerText = dog.name
        span.addEventListener('click', dogClick)
        div.append(span)
    });
}

function dogClick(event) {
    const dogInfo = document.getElementById('dog-info')
    const dog = allDogs.find(x => x.name == event.target.innerText)
    const div = document.createElement('div');

    div.innerHTML = `
        <h2>${dog.name}</h2>
        <img src=${dog.image}>
        <br />
    `
    const button = document.createElement('button')
    button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    button.addEventListener('click', updateGoodDog)
    div.appendChild(button)

    dogInfo.innerHTML = ''
    dogInfo.appendChild(div)
}

function updateGoodDog(event) {
    const dog = allDogs.find(x => x.name == event.target.parentNode.children[0].innerText)
    dog.isGoodDog = !dog.isGoodDog
    event.target.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"

    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(dog)
    })
}

function filterDogButton() {
    const button = document.getElementById('good-dog-filter');
    button.addEventListener('click', filterDog)
}

function filterDog(event) {
    filter = !filter
    if(filter) {
        const goodDogs = allDogs.filter(dog => dog.isGoodDog)
        renderDogs(goodDogs)
        event.target.innerText = "Filter good dogs: ON"
    }
    else {
        renderDogs(allDogs)
        event.target.innerText = "Filter good dogs: OFF"
    }
}