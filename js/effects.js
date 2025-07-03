// Visual Effects Management
let confettiInterval;

// Load confetti library dynamically
function loadConfettiLibrary() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load confetti library'));
        document.head.appendChild(script);
    });
}

function createBackgroundShapes() {
    const shapes = 8;
    for (let i = 0; i < shapes; i++) {
        const shape = document.createElement('div');
        shape.className = 'bg-shape';
        shape.style.width = Math.random() * 300 + 100 + 'px';
        shape.style.height = shape.style.width;
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.animationDelay = Math.random() * 10 + 's';
        shape.style.animationDuration = (15 + Math.random() * 10) + 's';
        document.getElementById('mainContent').appendChild(shape);
    }
}

function createParticles() {
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.background = ['#FFD93D', '#FF6B6B', '#4ECDC4', '#6C5CE7'][Math.floor(Math.random() * 4)];
        
        document.getElementById('mainContent').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 12000);
    }, 300);
}

function startContinuousConfetti() {
    // Check if confetti is loaded
    if (typeof confetti === 'undefined') {
        console.error('Confetti library not loaded');
        return;
    }
    
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7', '#95E1D3', '#FFB6C1', '#87CEEB'];
    
    // Initial burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors,
        startVelocity: 45,
        gravity: 0.5,
        zIndex: 15
    });
    
    // Continuous confetti from different angles
    confettiInterval = setInterval(() => {
        // Random side confetti
        confetti({
            particleCount: 30,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors: colors,
            startVelocity: 35,
            zIndex: 15
        });
        
        confetti({
            particleCount: 30,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            colors: colors,
            startVelocity: 35,
            zIndex: 15
        });
        
        // Center burst every few seconds
        if (Math.random() < 0.3) {
            confetti({
                particleCount: 80,
                spread: 80,
                origin: { y: Math.random() * 0.6 + 0.2 },
                colors: colors,
                startVelocity: 40,
                gravity: 0.6,
                zIndex: 15
            });
        }
    }, 700);
}

function startEmojis() {
    const emojis = ['🎉', '🎂', '🎈', '🎊', '🎁', '🍰', '🥳', '⭐', '✨', '🎯', '🚀', '💻', '🔥', '🌟', '🎆', '🎇', '💝', '🏆', '🇬🇹', '🇬🇹'];
    
    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.fontSize = (1.5 + Math.random() * 2) + 'em';
        emoji.style.animationDuration = (6 + Math.random() * 4) + 's';
        emoji.style.animationDelay = Math.random() * 2 + 's';
        
        // Random rotation
        emoji.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Click to pop effect
        emoji.onclick = function() {
            this.style.transform = 'scale(2) rotate(720deg)';
            this.style.opacity = '0';
            setTimeout(() => this.remove(), 300);
        };
        
        document.getElementById('mainContent').appendChild(emoji);
        
        setTimeout(() => {
            emoji.remove();
        }, 10000);
    }, 400);
}

function createSpecialConfetti(colors, emoji) {
    if (typeof confetti === 'undefined') return;
    
    // Special confetti burst
    confetti({
        particleCount: 100,
        spread: 160,
        origin: { y: 0.6 },
        colors: colors,
        startVelocity: 50,
        gravity: 0.7,
        zIndex: 20
    });
    
    // Create floating emoji
    for (let i = 0; i < 5; i++) {
        const floatingEmoji = document.createElement('div');
        floatingEmoji.className = 'floating-emoji';
        floatingEmoji.textContent = emoji;
        floatingEmoji.style.left = Math.random() * 100 + '%';
        floatingEmoji.style.fontSize = (2 + Math.random()) + 'em';
        floatingEmoji.style.animationDuration = (3 + Math.random() * 2) + 's';
        
        document.getElementById('mainContent').appendChild(floatingEmoji);
        
        setTimeout(() => {
            floatingEmoji.remove();
        }, 5000);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        color: #333;
        padding: 15px 20px;
        border-radius: 10px;
        font-family: 'Fredoka One', cursive;
        font-size: 14px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.5s forwards;
        max-width: 300px;
        border: 2px solid rgba(255, 255, 255, 0.3);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

// Initialize effects when page loads
async function initializeEffects() {
    try {
        await loadConfettiLibrary();
        console.log('Confetti library loaded successfully');
    } catch (error) {
        console.error('Error loading confetti library:', error);
    }
}

// Make functions globally available
window.initializeEffects = initializeEffects;
window.createBackgroundShapes = createBackgroundShapes;
window.createParticles = createParticles;
window.startContinuousConfetti = startContinuousConfetti;
window.startEmojis = startEmojis;
window.createSpecialConfetti = createSpecialConfetti;
window.showToast = showToast;