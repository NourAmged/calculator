let currentNum = "";
let previousNum = "";
let operator = "";

const currentDisplayNumber = document.querySelector(".screen");
const previousDisplayNumber = document.querySelector(".subScreen");

const equal = document.querySelector("#btnEqual");
equal.addEventListener("click", () => {
  if (currentNum != "" && previousNum != "") {
    compute();
  }
});

const decimal = document.querySelector("#btnDot");
decimal.addEventListener("click", () => {
  addDecimal();
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", clearCalculator);

const btnDelete = document.querySelector('#delete');
btnDelete.addEventListener('click',handleDelete);

const numberButtons = document.querySelectorAll(".number");

const operators = document.querySelectorAll(".operator");

numberButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    if (previousNum !== "" && currentNum !== "" && operator === "") {
      previousNum = "";
      currentDisplayNumber.textContent = currentNum;
    }
    if (currentNum.length <= 14) {
      currentNum += number;
      currentDisplayNumber.textContent = currentNum;
    }
}

operators.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      handleOperator(e.target.textContent);
    });
});

function handleOperator(op) {
    if (previousNum === "") {
      previousNum = currentNum;
      operatorCheck(op);
    } else if (currentNum === "") {
      operatorCheck(op);
    } else {
      compute();
      operator = op;
      currentDisplayNumber.textContent = "0";
      previousDisplayNumber.textContent = previousNum + " " + operator;
    }
}

function operatorCheck(text) {
    operator = text;
    previousDisplayNumber.textContent = previousNum + " " + operator;
    currentDisplayNumber.textContent = "0";
    currentNum = "";
}

function compute() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);
  
    if (operator === "+") {
      previousNum += currentNum;
    } else if (operator === "-") {
      previousNum -= currentNum;
    } else if (operator === "x") {
      previousNum *= currentNum;
    } else if (operator === "÷") {
      if (currentNum <= 0) {
        previousNum = "Error";
        displayResults();
        return;
      }
      previousNum /= currentNum;
    }
    previousNum = roundNumber(previousNum);
    previousNum = previousNum.toString();
    displayResults();
}

function roundNumber(num) {
    return Math.round(num * 100000) / 100000;
}

function displayResults() {
    if (previousNum.length <= 11) {
      currentDisplayNumber.textContent = previousNum;
    } else {
      currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
    }
    previousDisplayNumber.textContent = "";
    operator = "";
    currentNum = "";
}

function clearCalculator() {
    currentNum = "";
    previousNum = "";
    operator = "";
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = "";
}

function addDecimal() {
    if (!currentNum.includes(".")) {
      currentNum += ".";
      currentDisplayNumber.textContent = currentNum;
    }
}

function handleDelete() {
    if (currentNum !== "") {
      currentNum = currentNum.slice(0, -1);
      currentDisplayNumber.textContent = currentNum;
      if (currentNum === "") {
        currentDisplayNumber.textContent = "0";
      }
    }
    if (currentNum === "" && previousNum !== "" && operator === "") {
      previousNum = previousNum.slice(0, -1);
      currentDisplayNumber.textContent = previousNum;
    }
  }