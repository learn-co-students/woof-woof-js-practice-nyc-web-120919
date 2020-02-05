document.addEventListener("DOMContentLoaded", function(){
const BASEURL = 'http://localhost:3000/pups'

function getDogs (){
    const targetDiv = document.getElementById('dog-bar');
    fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(dogs => dogs.forEach(function(dog){
            let dogSpan = document.createElement('span');
            dogSpan.innerHTML = dog.name
            dogSpan.dataset.id = dog.id
            dogSpan.dataset.img = dog.image
            dogSpan.dataset.isgood = dog.isGoodDog
            targetDiv.append(dogSpan)
        }))          
}

getDogs();


const targetDiv = document.getElementById('dog-bar')
targetDiv.addEventListener('click', function(e){
    if (e.target.tagName === "SPAN") {
        const targetDiv = document.getElementById('dog-info');
        const dogDiv = document.createElement('div');
        dogDiv.dataset.id = e.target.dataset.id
        dogDiv.innerHTML = `<img src=${e.target.dataset.img}><h2>${e.target.innerText}</h2>`
        let goodButton = document.createElement('button')
        if (e.target.dataset.isgood == 'true') {
            goodButton.innerText = "Good Dog"
        } else {
            goodButton.innerText = "Bad Dog"
        }
        goodButton.dataset.dog = e.target.innerText
        dogDiv.append(goodButton)
        targetDiv.innerHTML = ""
        targetDiv.append(dogDiv)
    }
})

const dogInfoDiv = document.getElementById('dog-summary-container')
dogInfoDiv.addEventListener('click', function(e){
    let dogId = parseInt(e.target.parentNode.dataset.id)
    let goodBadButton = e.target.parentNode.querySelector('button')
    if (e.target === goodBadButton) {
    if (goodBadButton.innerText === "Bad Dog") {
        goodBadButton.innerText = "Good Dog"
        fetch(`http://localhost:3000/pups/${dogId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: 
                JSON.stringify({isGoodDog: true})
        })
    } else if (goodBadButton.innerText === "Good Dog") {
        goodBadButton.innerText = "Bad Dog"
        fetch(`http://localhost:3000/pups/${dogId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: 
                JSON.stringify({isGoodDog: false})
        })
    }
}
})

document.addEventListener('click', function(e){
    if (e.target.id === "good-dog-filter") {
        
    }
})

// function filterDogs(){
//     const targetDiv = document.getElementById('dog-bar');
//     fetch("http://localhost:3000/pups")
//         .then(resp => resp.json())
//         .then(dogs.filter(function(dog){
//             dog.isGoodDog === true)
//         }
//         // .then(moreDogs => console.log(moreDogs))
//         // {
//         //     let dogSpan = document.createElement('span');
//         //     dogSpan.innerHTML = dog.name
//         //     dogSpan.dataset.id = dog.id
//         //     dogSpan.dataset.img = dog.image
//         //     dogSpan.dataset.isgood = dog.isGoodDog
//         //     targetDiv.append(dogSpan)
//         })  
// }







    
})