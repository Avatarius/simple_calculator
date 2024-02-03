`use strict`;

const textfield = document.querySelector(".calculator__textfield");

class Calculator {
  constructor() {
    this.expression = "0"; // we will store input here and display in private _updateDisplay() method
  }

  _updateDisplay(input = this.expression) {
    textfield.value = input;
  }

  handleInput(btn) {
    const action = btn.dataset.action;
    // check button type and call relevant handler
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      this._handleOperator(btn);
    } else if (action === "decimal") {
      this._handleDecimal(btn);
    } else if (action === "clear") {
      this._handleClear();
    } else if (action === "calculate") {
      this._handleCalculate(btn);
    } else {
      this._handleDigits(btn);
    }
  }

  _getRealOperator(char) {
    return char.replace("×", "*").replace("÷", "/");
  }

  _endsWithOperator(...operator_array) {
    return operator_array.some((item) => this.expression.endsWith(item));
  }

  _ifProperOperatorInput(btn_text) {
    // check if input is valid. We shouldn't allow two operators in a row
    // The exception: - after + * /
    if (
      (btn_text !== "-" && this._endsWithOperator("+", "-", "*", "/")) ||
      (btn_text === "-" && this.expression.at(-1) === "-")
    ) {
      return false;
    } else {
      return true;
    }
  }

  _handleOperator(btn) {
    const realOperator = this._getRealOperator(btn.textContent);
    if (this._ifProperOperatorInput(btn.textContent)) {
      this.expression += realOperator;
      this._updateDisplay();
    }
  }

  _ifProperDecimalInput() {
    // check if expr ends with decimal
    // also check if last item in expr is a number and in this case check if this number already has a decimal
    if (this.expression.endsWith(".")) return false;
    const matches = this.expression.match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g);
    if (
      matches &&
      this.expression.endsWith(matches.at(-1)) &&
      matches.at(-1).includes(".")
    ) {
      return false;
    }
    return true;
  }

  _handleDecimal(btn) {
    if (this._ifProperDecimalInput()) {
      this.expression += ".";
      this._updateDisplay();
    }
  }

  _handleClear(btn) {
    this.expression = "0";
    this._updateDisplay();
  }

  _evaluateExpression(expression) {
    const func = new Function("return " + expression);
    return func();
  }

  _handleCalculate(btn) {
     if (this._endsWithOperator('+', '-', '*', '/')) return;
    const result =  this._evaluateExpression(this.expression);
    if (isNaN(result) || !isFinite(result)) {
      this._updateDisplay('Unable to calculate');
      this.expression = '0';
    } else {
      this.expression = String(result);
      console.log(result);
      this._updateDisplay();
    }

  }

  _handleDigits(btn) {
    if (this.expression === "0") {
      this.expression = "";
    }
    this.expression += btn.textContent;
    this._updateDisplay();
  }
}

let calculator = new Calculator();

const button_list = document.querySelectorAll(".calculator__button");

for (let btn of button_list) {
  // calculator.handleInput(btn);
  btn.addEventListener("click", (event) =>
    calculator.handleInput(event.target)
  );
}
