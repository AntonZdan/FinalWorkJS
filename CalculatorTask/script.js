const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
const operators = ['+', '-', '*', '/'];
let firstOperand = null;


const updateDisplay = (value) =>{
    display.textContent = value;
}

const calculateFunction = (a, b, operator) =>{
a = Number(a);
b = Number(b);// Paverciu stringa skaicium

if(isNaN(a) || isNaN(b)){
    display.textContent = 'Error!';
    return;
}

switch(operator) {
    case '+':
        return a + b;
    case '-':
        return a - b;
    case '*':
        return a * b;
    case '/':
        if(b !== 0){
            return a / b;
        }else{
            display.textContent = 'Error!';
        }
    default:
        display.textContent = 'Error!';
        return ;
    
}
}

buttons.forEach(button =>{
    button.addEventListener('click', () =>{
        const value = button.dataset.value; //Paspaudus mygtuka paima jo reiksme.
    if(value === '.'){
        currentInput += value;
        updateDisplay(currentInput);
    }else if(operators.includes(value)){
        if(currentInput !== ''){
            firstOperand = currentInput;
            operator = value;
            currentInput = '';
        }
    }else if(value === '='){
        if(firstOperand !== null && currentInput !== ''){
            const result = calculateFunction(firstOperand, currentInput, operator);
            updateDisplay(result);
            currentInput = result + '';
            firstOperand = null;
            operator = '';
        }
    }else if( value === 'ac'){
        currentInput = '';
        firstOperand = null;
        operator = '';
        updateDisplay('0');
    }else if(value === 'DEL'){
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    }else {
            currentInput += value;
            updateDisplay(currentInput);
        }
    })
})