// Main Initialization and Orchestration

// Initialize effects when page loads
window.addEventListener('DOMContentLoaded', async () => {
    await window.initializeEffects();
});

function startCelebration() {
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    
    introScreen.classList.add('hidden');
    setTimeout(() => {
        mainContent.classList.add('show');
        window.createBackgroundShapes();
        window.createParticles();
        // Wait a bit for confetti library to be ready
        setTimeout(() => {
            window.startContinuousConfetti();
        }, 100);
        window.startEmojis();
        window.startMessages();
        window.initializeCounters();
        // Auto-play music
        window.startAudio();
    }, 1000);
}

// Handle window resize
window.addEventListener('resize', window.handleResize);

// Make functions globally available for onclick handlers
window.startCelebration = startCelebration;