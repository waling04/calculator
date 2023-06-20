const numberBtn = document.querySelectorAll("[data-number]");
const operatorBtn = document.querySelectorAll("[data-operation]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equal]");
const currentScreen = document.querySelector(".current-screen");
const previousScreen = document.querySelector(".previous-screen");

let currentOperand = "";
let previousOperand = "";
let operator = "";
let firstCalculation = true;
let secondCalculation = true;

function resetScreen() {
  currentOperand = "";
  previousOperand = "";
}

function clearScreen() {
  currentOperand = "";
  previousOperand = "";
  operator = "";
  updateScreen();
}

function deleteNumber() {
  currentOperand = currentOperand.slice(0, -1);
  updateScreen();
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  if (number === 0) {
    resetScreen();
    currentOperand = "";
  }
  currentOperand += number;
  updateScreen();
}

function selectOperator(selectedOperator) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    operate();
  }
  operator = selectedOperator;
  if (firstCalculation) {
    previousOperand = currentOperand;
    currentOperand = previousOperand;
    firstCalculation = true;
    secondCalculation = false;
  }
  currentOperand = "";
  updateScreen();
}

function updateScreen() {
  currentScreen.textContent = currentOperand;
  if (operator !== "") {
    previousScreen.textContent = `${previousOperand} ${operator}`;
  } else {
    previousScreen.textContent = "";
  }
  autoScreen(currentScreen, previousScreen);
}

function operate() {
  const a = parseFloat(previousOperand);
  const b = parseFloat(currentOperand);
  if (isNaN(a) || isNaN(b)) return;
  let result;
  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "÷":
      result = a / b;
      break;
    case "%":
      result = a % b;
      break;
    default:
      return;
  }
  currentOperand = result.toFixed(2);
  previousOperand = currentOperand;
  operator = "";
  updateScreen();
}

function setKeyboard(e) {
  if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
    appendNumber(e.key);
  }
  if (e.key === "=" || e.key === "Enter") {
    if (previousOperand !== "") {
      operate();
    }
  }
  if (e.key === "Backspace") {
    deleteNumber();
  }
  if (e.key === "Escape") {
    clearScreen();
  }
  if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "*" ||
    e.key === "÷" ||
    e.key === "%"
  ) {
    selectOperator(e.key);
  }
}

numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
    autoScreen(currentScreen, previousScreen);
  });
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    selectOperator(button.textContent);
    autoScreen(currentScreen, previousScreen);
  });
});

equalBtn.addEventListener("click", () => {
  operate();
  autoScreen(currentScreen, previousScreen);
});

clearBtn.addEventListener("click", () => {
  clearScreen();
  autoScreen(currentScreen, previousScreen);
});

deleteBtn.addEventListener("click", () => {
  deleteNumber();
  autoScreen(currentScreen, previousScreen);
});

document.addEventListener("keydown", setKeyboard);

function autoScreen(currentOperandScreen, previousOperandScreen) {
  let currentScreenFontSize = 40;
  let previousScreenFontSize = 35;
  if (currentOperandScreen.textContent.length > 13) {
    currentScreenFontSize -= 12;
    currentOperandScreen.style.fontSize = currentScreenFontSize + "px";
  }
  if (previousOperandScreen.textContent.length > 13) {
    previousScreenFontSize -= 12;
    previousOperandScreen.style.fontSize = previousScreenFontSize + "px";
  }
}

