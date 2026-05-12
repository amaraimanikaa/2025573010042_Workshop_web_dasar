const display = document.getElementById("display");
const container = document.getElementById("btn-container");

let currentInput = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Fungsi update layar
function updateDisplay() {
  display.value = currentInput;
}

// Logika Kalkulasi Utama
const calculate = (n1, operator, n2) => {
  const first = parseFloat(n1);
  const second = parseFloat(n2);
  if (operator === "+") return first + second;
  if (operator === "-") return first - second;
  if (operator === "*") return first * second;
  if (operator === "/") return first / second;
  return n2;
};

// 5. Event Delegation pada container tombol
container.addEventListener("click", (e) => {
  const target = e.target;
  if (!target.matches("button")) return;

  const type = target.dataset.type;
  const val = target.dataset.val;

  handleInput(type, val);
});

// Fungsi untuk memproses input (Klik atau Keyboard)
function handleInput(type, val) {
  if (type === "number") {
    if (waitingForSecondOperand) {
      currentInput = val;
      waitingForSecondOperand = false;
    } else {
      currentInput = currentInput === "0" ? val : currentInput + val;
    }
  }

  if (type === "operator") {
    if (operator && !waitingForSecondOperand) {
      const result = calculate(firstOperand, operator, currentInput);
      currentInput = String(result);
      firstOperand = result;
    } else {
      firstOperand = currentInput;
    }
    operator = val;
    waitingForSecondOperand = true;
  }

  if (type === "equals") {
    if (operator) {
      currentInput = String(calculate(firstOperand, operator, currentInput));
      firstOperand = null;
      operator = null;
      waitingForSecondOperand = false;
    }
  }

  if (type === "clear") {
    currentInput = "0";
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
  }

  updateDisplay();
}

// 4. Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (/[0-9]/.test(key)) handleInput("number", key);
  if (key === ".") handleInput("number", ".");
  if (["+", "-", "*", "/"].includes(key)) handleInput("operator", key);
  if (key === "Enter" || key === "=") handleInput("equals");
  if (key === "Escape" || key.toLowerCase() === "c") handleInput("clear");
});
