const GET = "https://words.dev-apis.com/word-of-the-day"
const POST = "https://words.dev-apis.com/validate-word"

let blocks = Object.values(document.getElementsByClassName("letter-block"));

function showSpinner() {
    document.getElementsByClassName('spinner')[0].style.visibility = 'visible';
}

function hideSpinner() {
    document.getElementsByClassName('spinner')[0].style.visibility = 'hidden';
}

function performWordNotValidAnimation(index){
    for(let i=0; i<5; i++)  word += blocks[i].classList.add("animate");
    setTimeout(() => {
        for(let i=0; i<6-1; i++)  word += blocks[i].classList.remove("animate");
    }, 1000);
}

function performWinningAnimation(index){
    for(let i=0; i<5; i++)  word += blocks[i].classList.add("win");
    document.querySelector("h1").classList.add("animate");
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function getWord(index){
    word = ""
    for(let i=0; i<5; i++)  word += blocks[i].innerText
    return word
}

function removeRow(blocks){
    for (let index = 0; index < 5; index++) {
      blocks.shift();
    }
}

async function validateWord(word){
    showSpinner();
    const promise = await fetch(POST, {
                                        method: "POST",
                                        body: JSON.stringify(
                                            {
                                                "word": word,
                                            })
                                    });

    let processedResponse = await promise.json();
    hideSpinner();
    return processedResponse;
}

// Main Function
async function main(){

    let block_index  = 0;

    // Start loading
    showSpinner();
    // Sending GET request
    const promise = await fetch(GET);
    // parsing json
    const processedResponse = await promise.json();
    // Stop Loading
    hideSpinner();
    // printing secret word to console
    console.log(processedResponse.word);
    // enabling keys to be presssed
    document.addEventListener("keyup", 
    // if key any key is pressed
    function (event){

        // key pressed is a letter (A-Z)
        if(isLetter(event.key)){
            if(block_index == 5) block_index--;
            blocks[block_index].innerText = event.key.toUpperCase();
            if(block_index < 5) block_index ++;
            return;
        }

        // if backspace key is pressed
        if(event.key === "Backspace"){
            // if index is greater than 0
            if(block_index > 0){
                // decreasing block index by one
                block_index --;
                // deleting text of block
                blocks[block_index].innerText = "";
            }
            return;
        }

        // if enter key is pressed
        if(event.key === "Enter"){
            // getting word of row
            let word = getWord(block_index);
            // if word is incompete, go out without doing anything
            if(word.length != 5) return;
            // check if it is a valid word by sending a POST request
            validateWord(word).then(function (response){
                // if word is not valid, go out with performing some animation
                if(!response.validWord) {
                    performWordNotValidAnimation(block_index);
                    return;
                }

                // if word matched perform wining animation and go out
                if(word === processedResponse.word.toUpperCase()){
                    alert("You Have Won!!!!");
                    performWinningAnimation(block_index);
                    block_index = 0;
                    return;
                }

                // if word is not mactched, 
                // check for each character of word wether it is in secret word or not
                for(let i=0; i<5; i++){

                    // if secret word has ith character at correct position
                    if(processedResponse.word.toUpperCase().indexOf(word[i]) == i){
                        // add class "correct-pos" in ith element to change it's color to green using css
                        blocks[i].classList.add("correct-pos");
                        continue;
                    }

                    console.log(word.substr(i));
                    console.log(word.substr(i).includes(word[i]))

                    // if secret word has not ith index cahracter
                    if((!processedResponse.word.toUpperCase().includes(word[i])) || 
                       word.substring(0, i).includes(word[i]))
                    {
                        // add class "not-include" in ith element to change it's color to gray using css
                        blocks[i].classList.add("not-include");
                        continue;
                    }
                        
                    // if character is not at correct position
                    // add class "include" in ith element to change it's color to yellow using css 
                    blocks[i].classList.add("include");
                    
                }

                block_index = 0;
                removeRow(blocks);
                // if there if all rows completed
                if(blocks.length == 0){
                    // display popup message and secret word 
                    alert("You Have Lost, The word was " + processedResponse.word.toUpperCase());
                }
            });
            
            }
    });
}

main();