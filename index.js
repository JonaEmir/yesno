const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const question = document.getElementById('question');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

// Resize canvas to full window
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// Confetti array
let confetti = [];
let confettiAnimation; // Store the animation frame ID

// Function to generate confetti
function createConfetti() {
    confetti = []; // Clear previous confetti
    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height,
            r: Math.random() * 5 + 2,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
}

// Function to draw confetti
function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();
    });
}

// Function to update confetti
function updateConfetti() {
    confetti.forEach(c => {
        c.x += c.dx;
        c.y += c.dy;

        if (c.x < 0 || c.x > confettiCanvas.width) c.dx *= -1;
        if (c.y > confettiCanvas.height) c.y = 0;
    });
}

// Animation loop
function animateConfetti() {
    drawConfetti();
    updateConfetti();
    confettiAnimation = requestAnimationFrame(animateConfetti);
}

// Stop confetti animation
function stopConfetti() {
    cancelAnimationFrame(confettiAnimation);
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

// Event listener for "No" button
noBtn.addEventListener('click', () => {
    noBtn.classList.add('shake');
    question.textContent = 'Ups, hubo un error. Intente nuevamente.';

    // Stop confetti if it's running
    stopConfetti();

    // After the shake animation, reposition the button
    setTimeout(() => {
        noBtn.classList.remove('shake');
        const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    }, 100); // Shake duration is 300ms

    // Reset question after 3 seconds
    setTimeout(() => {
        question.textContent = 'Jalas a un Vinito, ver movies y armar un leguito de harry potter el finde?';
    }, 1000);
});

// Event listener for "Yes" button
yesBtn.addEventListener('click', () => {
    question.textContent = '¡Wuuu!';
    createConfetti();
    animateConfetti();
});
