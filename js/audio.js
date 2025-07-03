// Audio Management
let audioPlaying = true;

// Simple birthday song using Web Audio API
function createBirthdaySong() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [262, 262, 294, 262, 349, 330, 262, 262, 294, 262, 392, 349];
    const durations = [0.5, 0.5, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 1, 2];
    
    let currentTime = audioContext.currentTime;
    
    notes.forEach((freq, i) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + durations[i]);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + durations[i]);
        
        currentTime += durations[i] * 0.5;
    });
    
    // Loop the song
    setTimeout(() => {
        if (audioPlaying) createBirthdaySong();
    }, currentTime * 1000);
}

function toggleAudio() {
    const audioControl = document.getElementById('audioControl');
    audioPlaying = !audioPlaying;
    
    if (audioPlaying) {
        audioControl.textContent = '🔊';
        createBirthdaySong();
    } else {
        audioControl.textContent = '🔇';
    }
}

function startAudio() {
    document.getElementById('audioControl').textContent = '🔊';
    createBirthdaySong();
}

// Make functions globally available
window.toggleAudio = toggleAudio;
window.startAudio = startAudio;
window.audioPlaying = audioPlaying;