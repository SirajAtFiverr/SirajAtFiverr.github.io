    // TODO 1: Declare & assign variables pointing to the corresponding element(s)
    // statement should be the "statement" section
    // optionButtons should be all the elements within the "options" section
    // explanation should be the "explanation" section

    const statement = document.querySelector(".statement");
    const optionButtons = document.querySelector(".options").children;
    const explanation = document.querySelector(".explanation");
    const nextButton = document.querySelector(".next");
    const scoreValue = document.querySelector(".score-value");
    const scoreTotal = document.querySelector(".score-total");

    // score variabe
    let score = 0;
    // fact index
    let factIndex = 0;

    // TODO 2: Declare & assign a variable called fact
    // Its value should be an object with a statement, true/false answer, and explanation 
    
    let facts = [
            {
                statement: "Arrays are like objects",
                answer: "true",
                explanation: "Arrays are kind of objects with indexes as properties."
            },

            {
                statement: "JavaScript was invented in 1995",
                answer: "true",
                explanation: "Brendan Eich created JS at Netscape in 1995. The initial version of the language was written in just 10 days."
            },

            {
                statement: "Strings in JS are editable values",
                answer: "false",
                explanation: "In JavaScript strings are immutable values, meaning they cannot be edited; however, they can replaced with new, different strings."
            },

            {
                statement: "1 + 1 === 2",
                answer: "true",
                explanation: "The plus operator gives the sum of two numbers."
            },

            {
                statement: "'1' + '1' === '2'",
                answer: "false",
                explanation: "The plus operator concatenates (joins together) strings, so '1' + '1' === '11'."
            },

            {
                statement: "typeof ['J', 'S'] === 'array'",
                answer: "false",
                explanation: "Arrays have the type 'object'. In JS, everything is either a primitive data type (e.g. 'string', 'number') or an object. Arrays are a kind of object with some special properties."
            },

    ];

    
    // TODO 3: Set the text of the statement element to the fact's statement

    statement.textContent = facts[0].statement;

    // TODO 4: Declare disable & enable functions to set or remove the "disabled" attribute from a given button element
    // disable(button) should set the button element's attribute "disabled" to the value ""
    // enable(button) should remove the attribute "disabled" from the button element

    const disable = (button) => button.setAttribute("disabled", "");
    const enable = (button) => button.removeAttribute("disabled");

    // TODO 5: Declare an isCorrect function that compares a guess to the right answer
    // isCorrect(guess) should return true if the guess matches the fact's answer
    
    function isCorrect(guess, factIndex){
        return guess === facts[factIndex].answer;
    }

    // by default disable next button is disabled
    disable(nextButton);

    // TODO 6A: Use a for loop to add a click event listener to each of the optionButtons
    for (const button of optionButtons) {
        button.addEventListener("click", event =>{

            // TODO 6B: Within the event handler function, display the fact's explanation by setting the text of the explanation element
            explanation.textContent = facts[factIndex].explanation;

            // TODO 7: Within the event handler function, 
            // Use a for loop to disable all the option buttons
            for (const optionButton of optionButtons) {
                disable(optionButton);
            }

            // TODO 8: Within the event handler function,
            // Get the guessed value from the clicked button
            // Use a conditional to compare the guess to the fact's answer
            // and add the "correct"/"incorrect" class as appropriate

            if(isCorrect(button.value, factIndex))
            {
                button.classList.add("correct");
                // increment score
                score ++;
                // update score value
                scoreValue.textContent = score;
            }else{
                button.classList.add("incorrect");
            }

            // enable next button
            enable(nextButton);
            
            // increment fact index
            factIndex++;

            // update score total
            scoreTotal.textContent = factIndex;

            // if factIndex is greater than the length of the facts array
            if(factIndex >= facts.length)
                // set next button text to "Restart Quiz"
                nextButton.textContent = "Restart Quiz"; 

        });
    }

    // TODO 9: Add a click event listener to the next button
    // Within the event handler function,
    // Use a for loop to enable all the option buttons
    // Remove the "correct"/"incorrect" class from all the option buttons
    // Clear the text of the explanation element

    nextButton.addEventListener("click", event=>{

        for (const optionButton of optionButtons) {
            enable(optionButton);
            optionButton.classList.remove("correct");
            optionButton.classList.remove("incorrect");
        }

        // disable next button
        disable(nextButton);

        // if factIndex is greater than the length of the facts array
        if(factIndex >= facts.length)
        {
            // reset fact index
            factIndex = 0;
            // reset score
            score = 0;
            // update score value
            scoreValue.textContent = score;
            // update score total
            scoreTotal.textContent = factIndex;
            // set next button text to "Next Question"
            nextButton.textContent = "Next Question";
        }

        // clear explanation text
        explanation.textContent = "";

        statement.textContent = facts[factIndex].statement;

    });