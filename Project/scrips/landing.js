document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const title = document.querySelector('.glitch');
    const body = document.body;

    // Start System Button Interaction
    startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        startBtn.querySelector('span').textContent = 'INITIALIZING...';

        // Glitch effect on body
        const originalBg = getComputedStyle(body).backgroundColor;

        // Simulation of system boot sequence
        let i = 0;
        const interval = setInterval(() => {
            if (i % 2 === 0) {
                body.style.transform = 'translateX(2px)';
                body.style.filter = 'invert(1)';
            } else {
                body.style.transform = 'translateX(-2px)';
                body.style.filter = 'invert(0)';
            }
            i++;

            if (i > 10) {
                clearInterval(interval);
                body.style.transform = 'none';
                body.style.filter = 'none';

                // Fade out effect
                body.style.transition = 'opacity 1s';
                body.style.opacity = '0';

                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
            }
        }, 100);
    });

    // Mascot Interaction
    const characterWrapper = document.querySelector('.character-wrapper');
    const speechBubble = document.querySelector('.speech-bubble');

    const messages = [
        "Don't pinch me!",
        "Go ahead, press start!",
        "Don't waste time!",
        "I'm watching you...",
        "Tick tock...",
        "System is waiting...",
        "No touching!",
        "Focus on the mission!"
    ];

    if (characterWrapper && speechBubble) {
        characterWrapper.addEventListener('click', () => {
            // Random message
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            speechBubble.innerHTML = randomMsg;

            // Show bubble
            speechBubble.classList.remove('visible');
            void speechBubble.offsetWidth; // Trigger reflow
            speechBubble.classList.add('visible');

            // Hide after 2 seconds
            setTimeout(() => {
                speechBubble.classList.remove('visible');
            }, 3000);
        });
    }

    // Random Glitch Effect for Title
    setInterval(() => {
        if (Math.random() > 0.95) {
            title.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #fca311,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #22c55e
            `;
            setTimeout(() => {
                title.style.textShadow = '4px 4px 0px #000';
            }, 100);
        }
    }, 2000);

    // Konami Code Easter Egg (optional fun)
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let currentKey = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[currentKey]) {
            currentKey++;
            if (currentKey === konamiCode.length) {
                activateGodMode();
                currentKey = 0;
            }
        } else {
            currentKey = 0;
        }
    });

    function activateGodMode() {
        alert('GOD MODE ACTIVATED: UNLIMITED COFFEE ☕');
        document.documentElement.style.setProperty('--accent-color', '#ffd700');
        document.documentElement.style.setProperty('--text-color', '#ff00ff');
    }
});
