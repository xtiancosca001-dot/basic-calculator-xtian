// Variables for UI
const NUMBERS = "1234567890";
let operator, operand1, operand2;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function percent(num) {
    return num * 100;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

const display = document.querySelector('input#display');
const controls = document.querySelector('.controls');
controls.addEventListener('click', e => {
    if(NUMBERS.includes(e.target.textContent)) {
        display.value += e.target.textContent;
    }
    if(e.target.textContent==='C') {
        display.value = '';
    }
    if(e.target.textContent==='=') {
        display.value = 'GOTCHA!';
    }
    if(e.target.textContent==='←') {
        display.value = (display.value.length > 1) ? display.value.slice(0,-1) : '0';
    }
    if(e.target.textContent==='+/-') {
        if(!display.value.includes('-')) {
            display.value = '-' + display.value;
        } else {
            display.value = display.value.slice(1);
        }
    }
});