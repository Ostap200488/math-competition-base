const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static('public')); // To serve static files (e.g., CSS)

// In-memory data for streaks and leaderboard
let streak = 0;

// Home Page
app.get('/', (req, res) => {
    res.render('index', { streak });
});

// Quiz Page
app.get('/quiz', (_req, res) => {
        const question = generateRandomMathQuestion();
        res.render('quiz', { question });
    });

// Handles quiz submissions
app.post('/quiz', (req, res) => {
    const { answer, correctAnswer } = req.body;
    if (parseInt(answer) === parseInt(correctAnswer)) {
        streak++; // Correct answer, increment streak
    } else {
        // Wrong answer, reset streak and add to leaderboard if streak > 0
        if (streak > 0) {
            [].push({ streak, date: new Date().toLocaleString() });
        }
        streak = 0; // Reset streak after wrong answer
    }
    res.redirect('/completion');
});

// Quiz Completion Page
app.get('/completion', (req, res) => {
    res.render('completion', { streak });
});

// Leaderboard Page
app.get('/leaderboard', (req, res) => {
    // Sort leaderboard by streak in descending order and limit to top 10
    const topStreaks = [].sort((a, b) => b.streak - a.streak).slice(0, 10);
    res.render('leaderboard', { topStreaks });
});

// Utility function to generate a random math question (addition)
function generateRandomMathQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    return {
        questionText: `${num1} + ${num2}`,
        correctAnswer: num1 + num2
    };
}

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
