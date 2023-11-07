const questions = [
    {
        question: "What is the capital of France?",
        options: ["New York", "London", "Paris", "Dublin"],
        answer: "Paris"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo Da Vinci", "Claude Monet"],
        answer: "Leonardo Da Vinci"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Lion"],
        answer: "Blue Whale"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Au", "Ag", "Gi"],
        answer: "Au"
    }
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(questions);

const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const options = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("timer");
const totalTimerElement = document.getElementById("total-time");

let currentQuestion = 0;
let score = 0;
let timer;
let totalTimer;
let totalSeconds = 0;

function startTotalTimer() {
    totalTimer = setInterval(() => {
        totalSeconds++;
        totalTimerElement.textContent = `Total time taken: ${totalSeconds}s`;
    }, 1000);
}

function startQuestionTimer() {
    let seconds = 30;

    timer = setInterval(() => {
        seconds--;
        timerElement.textContent = `Time left: ${seconds}s`;

        if (seconds === 0) {
            clearInterval(timer);
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    }, 1000);
}

function showQuestion(index) {
    if (timer) {
        clearInterval(timer);
    }

    if (index < questions.length) {
        const question = questions[index];
        questionNumber.textContent = `Question ${index + 1}`;
        questionText.textContent = question.question;
        options.innerHTML = "";

        question.options.forEach((option) => {
            const label = document.createElement("label");
            label.innerHTML = `
                <input type="radio" name="answer" value="${option}">
                ${option}
            `;
            options.appendChild(label);
        });

        nextButton.textContent = "Next";

        startQuestionTimer();

        const progressPercentage = ((index + 1) / questions.length) * 100;
        progressBar.style.width = progressPercentage + "%";
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer);
    clearInterval(totalTimer);
    questionContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreElement.textContent = score;
    messageElement.textContent = `You scored ${score} out of ${questions.length}.`;

    progressBar.style.width = "100%";
}

nextButton.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
        if (selectedOption.value === questions[currentQuestion].answer) {
            score++;
        }

        currentQuestion++;
        selectedOption.checked = false;

        if (currentQuestion < questions.length) {
            showQuestion(currentQuestion);
        } else {
            clearInterval(timer);
            showResult();
        }
    }
});

showQuestion(currentQuestion);
startTotalTimer();
