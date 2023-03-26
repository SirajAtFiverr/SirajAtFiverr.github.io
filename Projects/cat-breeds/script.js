
// Selecting required elements

const mainSection = document.querySelector("main");
const loadingSatus = document.querySelector(".loading-staus");
const optionButtons = document.querySelector(".options").children;
const imgElement = document.querySelector("main img");


// setting cat breeds
const breeds = ["Abyssinian", "Siamese", "Ragdoll", "Persian", "Sphynx", "American Shorthair", "Bengal", "Scottish Fold", "Burmese", "Maine Coon"];


// select a option
const selectedBreed = breeds[Math.floor(10*Math.random())];
// const selectedBreed = "Siamese";
console.log(selectedBreed);

// function to shuffle an array
function shuffleArray(array){
    return array.sort((a, b) => Math.random() - 0.5);
}

// function to select random options
function getOptions(n, correctOption, possibleOptions){
    let choices = [];
    // pushing correct option in choices
    choices.push(correctOption);
    while(choices.length < n){
        // random index
        let index = Math.floor(10*Math.random());
        // select a random breed
        let randomBreed = possibleOptions[index];
        // checking if breed is not in choices
        if(!choices.includes(randomBreed))
            choices.push(randomBreed)
    }

    return shuffleArray(choices);
}

function isCorrect(guess){
    return guess === selectedBreed;
}

// main function
async function main(){
    // sending HTTP request
    let response = await fetch("https://api.api-ninjas.com/v1/cats?name="+selectedBreed,
                     {
                        headers: {'X-Api-Key': 'jHIcRjf/e+Sc15AFJrZqnQ==kHZSC3kTwrCet46N'}
                    });

    console.log(response);
    // ectarcting json object
    let data = await response.json();

    // adding url to image tag
    imgElement.src = data[0].image_link;

    // getting options
    let options = getOptions(optionButtons.length, selectedBreed, breeds);
    // looping over buttons
    for (let index = 0; index < optionButtons.length; index++) {
        // setting button text to option
        optionButtons[index].textContent = options[index];
        // add click event to button
        optionButtons[index].addEventListener("click", event => {
            // if guess is correct
            if(isCorrect(event.target.textContent))
                event.target.classList.add("correct");
            else{
                event.target.classList.add("incorrect");
                optionButtons[options.indexOf(selectedBreed)].classList.add("correct");
            }

        });

    } 

    // hiding laodingStatus and Displaying main Section
    loadingSatus.style.display = "none";
    mainSection.style.display = "block";

}


// calling main function
main()