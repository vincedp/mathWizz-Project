const screens = document.querySelectorAll(".screen");
const userID = document.querySelector(".user-input");
const submitBtn = document.querySelector(".input-btn");
const nameContainer = document.querySelector(".username");
const question = document.querySelector(".question");
const userAnswer = document.querySelector(".useranswer");
const scoreEl = document.querySelector(".score");

const operations = ["+", "-", "*", "/"];
let num1, num2, operator, username, answer;
let score = 0;

// ---------------------- Helper functions ----------------------

// Generate random number, minimum number optional
const randomNumber = (num, min = 0) =>
  Math.ceil(Math.random() * (num - min) + min);

// Generate random math operator based on the index of the operations array
const randomMathOperator = () =>
  operations[Math.ceil(Math.random() * operations.length) - 1];

// Check if numbers are divisible, prevents math problems with remainders
const divisible = (num1, num2) => num1 % num2 === 0;

// On division, numerator should be the biggest number
const swapNumbers = (n1, n2) => {
  // Store num temporarily
  let temp;
  if (n1 < n2) {
    // temp now contains num1 value
    temp = n1;

    // num1 now contains num2 value
    n1 = n2;

    // num2 now contains temp value
    n2 = temp;
  }
};

// Increase difficulty base on score
const difficulty = () => {
  // Set operand values
  // Easy mode: 1 - 9
  num1 = randomNumber(9);
  num2 = randomNumber(9);
  if (score > 25) {
    // Medium mode: 10 - 99
    num1 = randomNumber(99, 9);
    num2 = randomNumber(99, 9);
  }
  if (score > 50) {
    // Hard mode: 100 - 999
    num1 = randomNumber(999, 99);
    num2 = randomNumber(999, 99);
  }
};

// Execute operands base on the given math operator, return correct answer
const checkOperator = () => {
  // Addition
  if (operator === "+") return (answer = num1 + num2);

  // Subtraction
  if (operator === "-") return (answer = num1 - num2);

  // Multiplication
  if (operator === "*") return (answer = num1 * num2);

  // Division
  if (operator === "/") {
    swapNumbers(num1, num2);
    return (answer = num1 / num2);
  }
};

// ---------------------- Functionality ----------------------

// Create math problem
const generateMathProb = () => {
  // Track operand values for division logic
  let currentNum;

  difficulty();

  // Store generated random math operator
  operator = randomMathOperator();

  // Division logic, generate math division without remainder
  if (operator === "/") {
    currentNum = divisible(num1, num2);
    swapNumbers(num1, num2);

    // Whenever numbers are not divisible generate new random numbers base on the difficulty until it finds 2 numbers that are divisible
    while (!currentNum) {
      difficulty();
      currentNum = divisible(num1, num2);
    }

    // After condition is met display the math problem to the UI
    question.innerHTML = `${num1} ${operator} ${num2} =`;
  }

  // When operator is not division display the math problem to the UI
  question.innerHTML = `${num1} ${operator} ${num2} =`;
};

// Validate user answer
const checkAnswer = () => {
  // Execute operands base on the given math operator, return correct answer
  checkOperator();

  // Continue execution only when input is not empty
  if (!userAnswer.value) return;

  // Actual logic to check if the users answer is correct
  if (answer == +userAnswer.value) {
    // Update score in the UI
    scoreEl.innerHTML = `${++score}`;

    // Generate new math problem
    generateMathProb();

    // Reset input of user
    userAnswer.value = "";

    // Update score in the UI, decrement score when the users answer is wrong
  } else scoreEl.innerHTML = `${--score}`;
};

// ---------------------- event listeners ----------------------

// Start playing math wizz
submitBtn.addEventListener("click", (e) => {
  // Continue execution only when username input is not empty
  if (!userID.value) return;

  // Store username to display in the UI
  username = userID.value;

  // Reset class names
  screens.forEach((el) => {
    el.classList.remove("show");
  });

  // Hide welcome UI
  screens[0].classList.add("hide");

  // Show game UI
  screens[1].classList.add("show");

  // Display username to the UI
  nameContainer.innerHTML = username;

  // Generate first math problem
  generateMathProb();
});

// Submit answer by pressing the Enter key
window.addEventListener("keypress", (e) => e.key === "Enter" && checkAnswer());
