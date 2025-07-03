// Easter Eggs and DevOps Interactive Elements

// Easter Egg Functions
function triggerEasterEgg(type) {
    const effects = {
        docker: () => {
            window.createSpecialConfetti(['#0db7ed', '#2496ed'], '🐳');
            window.showToast("Docker containers are running smoothly! 🐳");
        },
        kubernetes: () => {
            window.createSpecialConfetti(['#326ce5', '#ffffff'], '☸️');
            window.showToast("Kubernetes cluster is healthy! ☸️");
        },
        deployment: () => {
            window.createSpecialConfetti(['#00d084', '#00a86b'], '🚀');
            window.showToast("Deployment successful! Zero downtime! 🚀");
        },
        pipeline: () => {
            window.createSpecialConfetti(['#ff6b35', '#f7931e'], '🔧');
            window.showToast("CI/CD pipeline is green! All tests passing! ✅");
        },
        guatemala: () => {
            window.createSpecialConfetti(['#4997d0', '#ffffff', '#ce1126'], '🇬🇹');
            window.showToast("¡Saludos desde Guatemala! 🎵🎶");
        },
        guatemala2: () => {
            window.createSpecialConfetti(['#4997d0', '#ffffff', '#ce1126'], '🇬🇹');
            window.showToast("¡Pura vida guatemalteca! ¡Con banda! 🎺");
        },
        guatemala3: () => {
            window.createSpecialConfetti(['#4997d0', '#ffffff', '#ce1126'], '🇬🇹');
            window.showToast("¡Chapin power! ¡Que suene la banda! 🥳🎵");
        },
        security: () => {
            window.createSpecialConfetti(['#28a745', '#ffc107'], '🔐');
            window.showToast("Security protocols active! 🛡️");
        },
        database: () => {
            window.createSpecialConfetti(['#336791', '#f29111'], '💾');
            window.showToast("Database optimized! Query time < 1ms! ⚡");
        },
        network: () => {
            window.createSpecialConfetti(['#0078d4', '#40e0d0'], '🌐');
            window.showToast("Network latency: PERFECT! 📡");
        }
    };
    
    if (effects[type]) {
        effects[type]();
    }
}

// Initialize counters with animation
function initializeCounters() {
    // Calculate hours saved based on 99.95% uptime
    // Assuming 8760 hours in a year, 0.05% downtime would be ~4.38 hours
    // So Jose saved us from potential 8755.62 hours of uptime
    const hoursSaved = Math.floor(8760 * 0.9995);
    
    // Calculate banda music hours listened (fun metric for Guatemala)
    // Let's say Jose listens to 8 hours of banda music per week for 7 years
    let bandaHours = Math.floor(8 * 52 * 7); // 2,912 hours
    
    // Animate the counters with slight delays for visual effect
    animateCounter('savedHours', 0, hoursSaved, 'hours');
    setTimeout(() => {
        animateCounter('bandaHours', 0, bandaHours, 'hours');
        
        // Start continuous banda music counter after initial animation
        setTimeout(() => {
            startBandaMusicCounter(bandaHours);
        }, 2000);
    }, 500);
}

// Continuous banda music counter that increases every 3 seconds
function startBandaMusicCounter(initialHours) {
    let currentHours = initialHours;
    
    setInterval(() => {
        currentHours += 1; // Add 1 hour every 3 seconds (Jose is always listening!)
        const bandaElement = document.getElementById('bandaHours');
        if (bandaElement) {
            bandaElement.textContent = currentHours.toLocaleString();
            
            // Add a subtle animation effect when number changes
            bandaElement.style.transform = 'scale(1.1)';
            bandaElement.style.color = '#FF6B47';
            setTimeout(() => {
                bandaElement.style.transform = 'scale(1)';
                bandaElement.style.color = '#4ECDC4';
            }, 200);
        }
    }, 3000); // Update every 3 seconds
}

function animateCounter(elementId, start, end, suffix) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 2000; // 2 seconds
    const increment = (end - start) / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        const value = Math.floor(current);
        if (suffix === 'hours') {
            element.textContent = value.toLocaleString();
        } else {
            element.textContent = value;
        }
    }, 16);
}

// Make functions globally available
window.triggerEasterEgg = triggerEasterEgg;
window.initializeCounters = initializeCounters;