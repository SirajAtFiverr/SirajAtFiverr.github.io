const DISPLAY = document.getElementsByClassName("screen")[0]
const KEYS = document.getElementsByClassName("key")

num1 = null
op = null
result = null

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
            num1 = parseInt(DISPLAY.innerText)
            clear();
            op = key.innerText
            result = null;
            break;
        case '=':
            num2 = parseInt(DISPLAY.innerText)
            if (op === '+'){
                result = num1 + num2;
            }else if (op === '-'){
                result = num1 - num2;
            }else if (op === 'x'){
                result = num1 * num2;
            }else if (op === '÷'){
                result = num1 / num2;
            }
            DISPLAY.innerText = result;
            op = null;
            break;
        default:
            console.log(result);
            if(DISPLAY.innerText == 0){
                DISPLAY.innerText = key.innerText;
            }else if(result != null){
                result = null;
                DISPLAY.innerText = key.innerText;
            }else{
                DISPLAY.innerText += key.innerText;
            }
            break;
    }
}