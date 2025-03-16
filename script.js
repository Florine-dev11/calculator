let display = document.getElementById("display");
let currentInput = "";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

// Function to update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Function to handle number button clicks
document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", () => {
        if (waitingForSecondNumber) {
            currentInput = button.textContent;
            waitingForSecondNumber = false;
        } else {
            currentInput = currentInput === "0" ? button.textContent : currentInput + button.textContent;
        }
        updateDisplay(currentInput);
    });
});

// Function to handle operator button clicks
document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => {
        if (firstNumber === null) {
            firstNumber = parseFloat(currentInput);
        } else if (!waitingForSecondNumber) {
            firstNumber = operate(firstNumber, parseFloat(currentInput), operator);
            updateDisplay(firstNumber);
        }
        operator = button.textContent;
        waitingForSecondNumber = true;
    });
});

// Function to handle equal button click
document.querySelector(".equal").addEventListener("click", () => {
    if (firstNumber !== null && operator !== null) {
        currentInput = operate(firstNumber, parseFloat(currentInput), operator);
        updateDisplay(currentInput);
        firstNumber = null;
        operator = null;
    }
});

// Function to handle clear button click
document.querySelector(".clear").addEventListener("click", () => {
    currentInput = "";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay("0");
});

// Function to handle backspace button click
document.querySelector(".backspace").addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1) || "0";
    updateDisplay(currentInput);
});

// Function to handle decimal button click
document.querySelector(".decimal").addEventListener("click", () => {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay(currentInput);
    }
});

// Function to perform calculations
function operate(num1, num2, operator) {
    if (operator === "+") return num1 + num2;
    if (operator === "-") return num1 - num2;
    if (operator === "*") return num1 * num2;
    if (operator === "/") {
        if (num2 === 0) return "Error"; // Prevent division by zero
        return num1 / num2;
    }
    return num2;
}
