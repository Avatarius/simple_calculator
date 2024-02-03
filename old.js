'use strict';

const textfield = document.querySelector('.calculator__textfield');


function isOperator(char) {
  const operator_array = ['+', '-', '×', '÷'];
  return operator_array.includes(char);
}

function fillTextfield(btn) {
  let btnTextContent = textfield.value + btn.textContent;
  btnTextContent = btnTextContent.replace(/^0+/, '');
  if (btnTextContent === '') btnTextContent = '0';
  textfield.value = btnTextContent;
}

function evaluateExpression(expression) {
  let func = new Function(`return ${expression}`);
  return func();
}


function calculate() {
  let expression = textfield.value;

  console.log( evaluateExpression(expression) );
}


// init digits and operators buttons (1 -9, +, -, ×, ÷)
const button_list = document.querySelectorAll('.calculator__button');
for (let btn of button_list) {
  if (!isNaN(btn.textContent) || isOperator(btn.textContent)) {
    btn.addEventListener('click', (event) => fillTextfield(event.target));
  }
}

// init clear button
const clear_button = document.querySelector('.calculator__button_clear');
clear_button.addEventListener('click', () => textfield.value = '0');


//init calculate button
const calculate_button = document.querySelector('.calculator__button_calculate');
calculate_button.addEventListener('click', () => calculate());



