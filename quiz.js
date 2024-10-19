let questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for water?",
        answers: ["O2", "H2O", "CO2", "NaCl"],
        correct: 1
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
        correct: 1
    },
    {
        question: "What is the main ingredient in guacamole?",
        answers: ["Tomato", "Avocado", "Pepper", "Onion"],
        correct: 1
    },
    {
        question: "What is the square root of 16?",
        answers: ["2", "4", "8", "16"],
        correct: 1
    },
    {
        question: "Which element has the atomic number 1?",
        answers: ["Oxygen", "Hydrogen", "Carbon", "Nitrogen"],
        correct: 1
    }
];


let score = 0;
let currentQuestionIndex = 0;

const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('quiz-container');
const scoreDisplay = document.getElementById('score-display');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const showHighScoresButton = document.getElementById('show-high-scores');
const highScoresContainer = document.getElementById('high-scores');
const scoresList = document.getElementById('scores-list');

startButton.addEventListener('click', startQuiz);
showHighScoresButton.addEventListener('click', displayHighScores);

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    questionContainer.style.display = 'block';
    scoreDisplay.style.display = 'none';
    startButton.style.display = 'none';
    highScoresContainer.style.display = 'none';
    showHighScoresButton.style.display = 'none'; // Hide high scores button initially
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtons.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(index));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(index) {
    const question = questions[currentQuestionIndex];
    if (index === question.correct) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showScore();
    }
}

function showScore() {
    questionContainer.style.display = 'none';
    scoreDisplay.style.display = 'block';
    const scoreElement = document.getElementById('score');
    scoreElement.innerText = `Your score: ${score} out of ${questions.length}`;

  
    saveScore(score);


    showHighScoresButton.style.display = 'block';
}

function displayHighScores() {
    highScoresContainer.style.display = 'block';
    scoresList.innerHTML = ''; 

    fetch('display_high_scores.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(score => {
                const li = document.createElement('li');
                li.textContent = `${score.username}: ${score.score}`;
                scoresList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching high scores:', error));
}


function saveScore(score) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_score.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    const username = sessionStorage.getItem('username'); 
    xhr.send(`username=${username}&score=${score}`);
}
