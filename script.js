// Konfetti generator
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');

// Dinamik kenglik va balandlik
function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const confettis = [];
const confettiCount = window.innerWidth < 768 ? 100 : 200; // Mobilda kamroq konfetti

// Ranglar
const colors = ['#ff6b6b', '#feca57', '#54a0ff', '#1dd1a1', '#ff9ff3'];

// Konfetti yaratish
function createConfetti() {
    for (let i = 0; i < confettiCount; i++) {
        confettis.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocityX: Math.random() * 4 - 2,
            velocityY: Math.random() * 4 + 2,
        });
    }
}

// Konfettini chizish
function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettis.forEach((confetti, index) => {
        ctx.fillStyle = confetti.color;
        ctx.beginPath();
        ctx.arc(confetti.x, confetti.y, confetti.size, 0, Math.PI * 2);
        ctx.fill();

        confetti.x += confetti.velocityX;
        confetti.y += confetti.velocityY;

        // Ekrandan chiqsa qayta joylash
        if (confetti.y > confettiCanvas.height) {
            confettis[index] = {
                x: Math.random() * confettiCanvas.width,
                y: -10,
                size: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                velocityX: Math.random() * 4 - 2,
                velocityY: Math.random() * 4 + 2,
            };
        }
    });

    requestAnimationFrame(drawConfetti);
}

// Animatsiyani boshlash
window.onload = () => {
    createConfetti();
    drawConfetti();
};
