// Variables for UI
const NUMBERS = "1234567890";
const OPERATORS = "+-x÷"
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
const clear = document.querySelector('#clear');
const controls = document.querySelector('.controls');
let monitor = {prevOperand:'', currOperand:'', prevOperator:'', currOperator:''};
display.value = '0';
let accumulator = 0;
let operatorIsPressed = false;

function handleButtonPress(e) {
    if(NUMBERS.includes(e.target.textContent)) {
        if(display.value === '0' || operatorIsPressed) {
            display.value = e.target.textContent;
            operatorIsPressed = false;
        } else if(!operatorIsPressed) {
            display.value += e.target.textContent;
        }   
    }
    if(OPERATORS.includes(e.target.textContent)) {
        operatorIsPressed = true;
        operator = e.target.textContent;
        monitor.currOperator = operator;
        monitor.currOperand = display.value;
        console.log(`OPERATOR IS PRESSED: `, monitor);
    }
    if(e.target.textContent==='=') {
        monitor.prevOperator = monitor.currOperator;
        monitor.prevOperand = monitor.currOperand;
        monitor.currOperand = display.value;
        console.log(`EQUAL IS PRESSED`, monitor);
        display.value = monitor.prevOperand = operate(monitor.prevOperator, parseFloat(monitor.prevOperand), parseFloat(monitor.currOperand));
        console.log(`AFTER OPERATION`, monitor);
    }
    if(e.target.textContent==='C') {
        monitor = {prevOperand:'', currOperand:'', prevOperator:'', currOperator:''};
        display.value = '0';
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
    if(e.target.textContent==='.' && !display.value.includes('.')) {
        display.value += '.';
    }
}

function handleKeyDown(e) {
    if(NUMBERS.includes(e.key)) {
        if(display.value === '0' || operatorIsPressed) {
            display.value = e.key;
            operatorIsPressed = false;
        } else if(!operatorIsPressed) {
            display.value += e.key;
        }    
    }
    if(OPERATORS.includes(e.key)) {
        operatorIsPressed = true;
        operator = (e.key === '/') ? "÷" : e.key;    
        operand1 = display.value;
    }
    if(e.key==='c') {
        display.value = '0';
    }
    if(e.key === 'Enter' || e.key === '=') {
        display.value = 'GOTCHA!';
    }
    if(e.key==='Backspace') {
        display.value = (display.value.length > 1) ? display.value.slice(0,-1) : '0';
    }
    if(e.key==='n') {
        if(!display.value.includes('-')) {
            display.value = '-' + display.value;
        } else {
            display.value = display.value.slice(1);
        }
    }
    if(e.key==='.' && !display.value.includes('.')) {
        display.value += '.';
    }
}

controls.addEventListener('click', handleButtonPress);
document.addEventListener('keydown', handleKeyDown);