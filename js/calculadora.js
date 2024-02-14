// Variables

const btnLightDark = document.querySelector("#botao-light-dark");
const icon = document.querySelector(".simbol");

const container = document.querySelector(".container");
const operations = document.querySelector(".operations");

const opButtons = document.querySelectorAll(".operations button");
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // add digit to clacualtor screen
  addDigit(digit) {
    // Check if current operation already has a dot

    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  // Process all calculator operations

  processOperation(operation) {
    // Check if current is empty

    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // Get current and previous value
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "AC":
        this.processClearAllOperation();
        break;
      case "=":
        this.processEqualOperation();
        break;
      default:
        return;
    }
  }

  // Change values of calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Check if value is zero. if it is just add current value
      if (previous === 0) {
        operationValue = current;
      }

      // add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Change math operation

  changeOperation(operation) {
    const mathoperations = ["*", "/", "+", "-"];

    if (!mathoperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Delete the last digit
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Clear previous and current operation
  processClearAllOperation() {
    this.currentOperationText.innerText = " ";
    this.previousOperationText.innerText = " ";
  }

  // process equal operation
  processEqualOperation() {
    const operation = previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
    this.currentOperation.innerText = operation.value;
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

opButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
