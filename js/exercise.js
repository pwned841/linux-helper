document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = null;
    let score = 0;
    let totalQuestions = 0;

    const commandDescription = document.getElementById('command-description');
    const userAnswer = document.getElementById('user-answer');
    const submitButton = document.getElementById('submit-answer');
    const nextButton = document.getElementById('next-question');
    const feedbackDiv = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('score');

    // Filtrer les commandes pour exclure les commandes avec '📦'
    const availableCommands = commands.filter(cmd => !cmd.name.includes('📦'));

    function getRandomCommand() {
        const randomIndex = Math.floor(Math.random() * availableCommands.length);
        return availableCommands[randomIndex];
    }

    function displayQuestion() {
        currentQuestion = getRandomCommand();
        commandDescription.textContent = currentQuestion.description;
        userAnswer.value = '';
        feedbackDiv.style.display = 'none'; // Cacher le feedback lors d'une nouvelle question
        feedbackDiv.textContent = '';
        userAnswer.disabled = false;
        submitButton.disabled = false;
        nextButton.disabled = true;
    }

    function formatExample(example) {
        // Remplacer les \n par des sauts de ligne HTML
        return example.replace(/\n/g, '<br>');
    }

    function checkAnswer() {
        const userInput = userAnswer.value.trim().toLowerCase();
        const correctAnswer = currentQuestion.name.toLowerCase();

        userAnswer.disabled = true;
        submitButton.disabled = true;
        nextButton.disabled = false;

        // Afficher le feedback avec les exemples
        let feedbackContent = '';

        if (userInput === correctAnswer) {
            score++;
            feedbackContent = `
                <div class="feedback-result correct">✅ Correct ! La commande est bien : ${currentQuestion.name}</div>
                <div class="feedback-examples">
                    <h3>Exemples d'utilisation :</h3>
                    <pre>${formatExample(currentQuestion.example)}</pre>
                </div>
            `;
            feedbackDiv.className = 'feedback correct';
        } else {
            feedbackContent = `
                <div class="feedback-result incorrect">❌ Incorrect. La bonne commande était : ${currentQuestion.name}</div>
                <div class="feedback-examples">
                    <h3>Exemples d'utilisation :</h3>
                    <pre>${formatExample(currentQuestion.example)}</pre>
                </div>
            `;
            feedbackDiv.className = 'feedback incorrect';
        }

        feedbackDiv.innerHTML = feedbackContent;
        feedbackDiv.style.display = 'block'; // S'assurer que le feedback est visible

        totalQuestions++;
        scoreDisplay.textContent = `Score : ${score} / ${totalQuestions}`;
    }

    submitButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', displayQuestion);

    userAnswer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !userAnswer.disabled) {
            checkAnswer();
        }
    });

    // Afficher la première question
    displayQuestion();
});