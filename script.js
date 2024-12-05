// Konfetti generator
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');

// Canvas o'lchamini dinamik o'zgartirish
function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Konfetti parametrlarini sozlash
const confettis = [];
const confettiColors = ['#ff6b6b', '#feca57', '#54a0ff', '#1dd1a1', '#ff9ff3'];
const confettiCount = window.innerWidth < 768 ? 150 : 300; // Mobil uchun kamroq konfetti

function createConfetti() {
    for (let i = 0; i < confettiCount; i++) {
        confettis.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 7 + 3,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            rotation: Math.random() * 360,
            velocityX: Math.random() * 4 - 2,
            velocityY: Math.random() * 4 + 3,
            opacity: Math.random() * 0.8 + 0.2,
        });
    }
}

// Konfettini chizish
function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettis.forEach((confetti, index) => {
        ctx.save();
        ctx.globalAlpha = confetti.opacity;
        ctx.translate(confetti.x, confetti.y);
        ctx.rotate((confetti.rotation * Math.PI) / 180);
        ctx.fillStyle = confetti.color;
        ctx.beginPath();
        ctx.arc(0, 0, confetti.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        confetti.x += confetti.velocityX;
        confetti.y += confetti.velocityY;
        confetti.rotation += confetti.velocityX;

        // Ekrandan chiqib ketganda qayta joylash
        if (confetti.y > confettiCanvas.height) {
            confettis[index] = {
                x: Math.random() * confettiCanvas.width,
                y: -10,
                size: Math.random() * 7 + 3,
                color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                rotation: Math.random() * 360,
                velocityX: Math.random() * 4 - 2,
                velocityY: Math.random() * 4 + 3,
                opacity: Math.random() * 0.8 + 0.2,
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
