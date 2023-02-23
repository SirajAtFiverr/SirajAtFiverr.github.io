const DISPLAY = document.getElementsByClassName("screen")[0]
const KEYS = document.getElementsByClassName("key")

num1 = null
op = null

// KEYS.forEach((key) =>{
//     key.addEventListener("click", function (){
//         onClick(key);
//     })
// });

for (let index = 0; index < KEYS.length; index++) {
    KEYS[index].addEventListener("click", function (){
        onClick(KEYS[index]);
    })
}

function clear(){
    DISPLAY.innerText = 0;
}

function back(){
    DISPLAY.innerText = DISPLAY.innerText.substr(0, DISPLAY.innerText.length-1);
    if(DISPLAY.innerText.length == 0){
        DISPLAY.innerText = 0;
    }
}

function onClick(key){

    switch (key.innerText) {
        case 'C':
            clear()
            break;
        case '←':
            back()
            break;
        case '÷':
        case 'x':
        case '-':
        case '+':
            if(op != null) break;
            num1 = parseInt(DISPLAY.innerText)
            clear()
            op = key.innerText
            break;
        case '=':
            num2 = parseInt(DISPLAY.innerText)
            if (op === '+'){
                DISPLAY.innerText = num1 + num2;
            }else if (op === '-'){
                DISPLAY.innerText = num1 - num2;
            }else if (op === 'x'){
                DISPLAY.innerText = num1 * num2;
            }else if (op === '÷'){
                DISPLAY.innerText = num1 / num2;
            }
            op = null;
            break;
        default:
            if(DISPLAY.innerText != 0){
                DISPLAY.innerText += key.innerText;
            }else {DISPLAY.innerText = key.innerText;}
            break;
    }
}