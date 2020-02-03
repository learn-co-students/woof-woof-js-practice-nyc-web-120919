window.addEventListener("DOMContentLoaded", function(){

    const dogBar = document.getElementById('dog-bar')
    const dogInfo = document.getElementById('dog-info')

    fetch('http://localhost:3000/pups/')
    .then(resp => resp.json())
    .then(dogs => {
        dogs.forEach(dog => {
            dogBar.innerHTML += 
            `
            <span id=${dog.id}>${dog.name}</span>
            `
        });
    })

    dogBar.addEventListener('click', function(event) {
        let dogId = event.target.id
        fetch(`http://localhost:3000/pups/${dogId}`)
        .then(resp => resp.json())
        .then(data => {
           dogInfo.innerHTML = 
           `
           <img src=${data.image}>
           <h2>${data.name}</h2>
           <button>${data.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
           `
           dogInfo.dataset.id = data.id
        });
     });
     dogInfo.addEventListener('click', function(event) {
         let newValue;
        const button = document.querySelectorAll('button')[1]
        if (button.textContent === "Bad Dog!") {
            button.textContent = "Good Dog!"
            newValue = true
        } else if (button.textContent === "Good Dog!"){
            button.textContent = "Bad Dog!"
            newValue = false
        }
        updateStatus(newValue);
    })
    
    function updateStatus(newValue) {
        let dogId = event.target.parentNode.dataset.id
        let status = {"isGoodDog": newValue
        }

    fetch(`http://localhost:3000/pups/${dogId}`, {
    method: "PATCH",
    headers: {
        "content-type": "application/json",
        accept: "application/json"
    },
    body: JSON.stringify(status)
      });
    }
});




//step 4
//click button good dog/bad dog button button text should change
//button text should change from good dog to bad dog or vice versa
// value of dog attribute sould reflect the new value 
//alow update to dog by making patch request /pups/:id
