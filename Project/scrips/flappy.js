// Flappy Bird Game Script
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game State
let currentState = 'start'; // start, playing, gameover
let frames = 0;
let score = 0;
let highScore = 0;
let gameSpeed = 2;

// Persistent High Score
const HIGH_SCORE_KEY = 'aidetox_flappy_highscore';
function loadHighScore() {
    const saved = localStorage.getItem(HIGH_SCORE_KEY);
    if (saved) {
        highScore = parseInt(saved);
        updateHighScoreDisplay();
    }
}
function saveHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem(HIGH_SCORE_KEY, highScore);
        updateHighScoreDisplay();
    }
}
function updateHighScoreDisplay() {
    document.getElementById('highScoreDisplay').textContent = highScore;
    document.getElementById('bestScore').textContent = highScore;
}

// Bird Object
const bird = {
    x: 50,
    y: 150,
    width: 34,
    height: 24,
    gravity: 0.25,
    jump: 4.6,
    velocity: 0,
    radius: 12,

    draw: function () {
        ctx.fillStyle = '#fca311'; // Yellow bird
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;

        // Body
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Eye
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x + 20, this.y + 2, 10, 10);
        ctx.strokeRect(this.x + 20, this.y + 2, 10, 10);
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + 24, this.y + 4, 4, 4);

        // Beak
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(this.x + 30, this.y + 12, 12, 8);
        ctx.strokeRect(this.x + 30, this.y + 12, 12, 8);

        // Wing
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x + 4, this.y + 12, 16, 8);
        ctx.strokeRect(this.x + 4, this.y + 12, 16, 8);
    },

    update: function () {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // Floor collision
        if (this.y + this.height >= canvas.height - 20) {
            this.y = canvas.height - 20 - this.height;
            gameOver();
        }

        // Ceiling collision
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    },

    flap: function () {
        this.velocity = -this.jump;
    }
};

// Pipes
const pipes = {
    items: [],
    width: 52,
    gap: 120, // Increased gap for easier gameplay
    dx: 2,

    draw: function () {
        for (let i = 0; i < this.items.length; i++) {
            let p = this.items[i];

            // Green pipes
            ctx.fillStyle = '#22c55e';
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;

            // Top pipe
            ctx.fillRect(p.x, 0, this.width, p.top);
            ctx.strokeRect(p.x, 0, this.width, p.top);

            // Bottom pipe
            ctx.fillRect(p.x, canvas.height - p.bottom, this.width, p.bottom);
            ctx.strokeRect(p.x, canvas.height - p.bottom, this.width, p.bottom);

            // Caps
            ctx.fillStyle = '#4ade80'; // Lighter green for detail
            ctx.fillRect(p.x - 2, p.top - 20, this.width + 4, 20); // Top cap
            ctx.strokeRect(p.x - 2, p.top - 20, this.width + 4, 20);

            ctx.fillRect(p.x - 2, canvas.height - p.bottom, this.width + 4, 20); // Bottom cap
            ctx.strokeRect(p.x - 2, canvas.height - p.bottom, this.width + 4, 20);
        }
    },

    update: function () {
        // Add new pipe
        if (frames % 120 === 0) {
            // Calculate random positions
            let topHeight = Math.floor(Math.random() * (canvas.height / 2)) + 50;
            let bottomHeight = canvas.height - (topHeight + this.gap);

            // Ensure minimum pipe height
            if (bottomHeight < 50) {
                bottomHeight = 50;
                topHeight = canvas.height - (bottomHeight + this.gap);
            }

            this.items.push({
                x: canvas.width,
                top: topHeight,
                bottom: bottomHeight,
                passed: false
            });
        }

        // Move pipes
        for (let i = 0; i < this.items.length; i++) {
            let p = this.items[i];
            p.x -= this.dx;

            // Collision Detection
            // Top pipe
            if (bird.x + bird.width > p.x && bird.x < p.x + this.width && bird.y < p.top) {
                gameOver();
            }
            // Bottom pipe
            if (bird.x + bird.width > p.x && bird.x < p.x + this.width && bird.y + bird.height > canvas.height - p.bottom) {
                gameOver();
            }

            // Score update
            if (p.x + this.width < bird.x && !p.passed) {
                score++;
                p.passed = true;
                document.getElementById('gameScore').textContent = score;
                // Speed up slightly every 5 points
                if (score % 5 === 0) this.dx += 0.2;
            }

            // Remove off-screen pipes
            if (p.x + this.width < 0) {
                this.items.shift();
                i--;
            }
        }
    },

    reset: function () {
        this.items = [];
        this.dx = 2;
    }
};

// Ground
const ground = {
    height: 20,
    draw: function () {
        ctx.fillStyle = '#dada48'; // Sand color
        ctx.fillRect(0, canvas.height - this.height, canvas.width, this.height);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(0, canvas.height - this.height, canvas.width, this.height);

        // Grass pattern
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(0, canvas.height - this.height, canvas.width, 5);
    }
};

// Game Loop
function loop() {
    if (currentState === 'playing') {
        // Update
        bird.update();
        pipes.update();
        frames++;

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw
        pipes.draw();
        ground.draw();
        bird.draw();

        requestAnimationFrame(loop);
    }
}

// Game Control
function startGame() {
    currentState = 'playing';
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('gameScore').classList.remove('hidden');

    // Reset objects
    bird.y = 150;
    bird.velocity = 0;
    bird.jump = 4.6;
    pipes.reset();
    score = 0;
    frames = 0;
    document.getElementById('gameScore').textContent = 0;

    loop();
}

function gameOver() {
    currentState = 'gameover';

    // Save Score
    saveHighScore();
    document.getElementById('currentScore').textContent = score;

    document.getElementById('gameOverScreen').classList.remove('hidden');
}

// Input Handling
function handleInput(e) {
    if (e.type === 'keydown' && e.code !== 'Space') return;
    if (e.type !== 'touchstart' && e.type !== 'mousedown' && e.code !== 'Space') return;

    if (e.type === 'keydown') e.preventDefault();

    if (currentState === 'start') {
        startGame();
    } else if (currentState === 'playing') {
        bird.flap();
    } else if (currentState === 'gameover') {
        // Debounce restart slightly
        setTimeout(() => {
            // Let button handle restart to avoid accidental double clicks
        }, 100);
    }
}

// Resize Canvas
function resize() {
    const container = document.querySelector('.game-container');
    if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadHighScore();
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('keydown', handleInput);
    canvas.addEventListener('mousedown', handleInput);
    canvas.addEventListener('touchstart', handleInput, { passive: false });

    document.getElementById('restartBtn').addEventListener('click', startGame);

    // Auth Check
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'index.html';
    } else {
        const username = sessionStorage.getItem('currentUser');
        if (document.getElementById('userBadge')) document.getElementById('userBadge').textContent = username || 'USER';
    }

    // Initialize common mascot/modal stuff
    initMascot();
    initInfoModal();
});

// Logout function
window.logout = function () {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
};

// Mascot & Info Logic (shared with other pages so reusing similar code)
function initInfoModal() {
    const infoBtn = document.getElementById('infoIcon');
    const infoModal = document.getElementById('infoModal');
    const closeInfoBtn = document.getElementById('closeInfoModal');

    if (infoBtn && infoModal && closeInfoBtn) {
        infoBtn.addEventListener('click', () => {
            infoModal.classList.add('active');
        });

        closeInfoBtn.addEventListener('click', () => {
            infoModal.classList.remove('active');
        });

        infoModal.addEventListener('click', (e) => {
            if (e.target === infoModal) {
                infoModal.classList.remove('active');
            }
        });
    }
}

function initMascot() {
    const mascotBoy = document.getElementById('mascotBoy');
    const speechBubble = document.getElementById('speechBubble');
    const closeBubble = document.getElementById('closeBubble');
    const ctaBubble = document.getElementById('ctaBubble');

    if (!mascotBoy || !speechBubble) return;

    mascotBoy.addEventListener('click', function (e) {
        e.stopPropagation();
        speechBubble.classList.toggle('active');
        if (ctaBubble) ctaBubble.classList.toggle('hidden', speechBubble.classList.contains('active'));
    });

    if (ctaBubble) {
        ctaBubble.addEventListener('click', function (e) {
            e.stopPropagation();
            speechBubble.classList.add('active');
            ctaBubble.classList.add('hidden');
        });
    }

    if (closeBubble) {
        closeBubble.addEventListener('click', function (e) {
            e.stopPropagation();
            speechBubble.classList.remove('active');
            if (ctaBubble) ctaBubble.classList.remove('hidden');
        });
    }

    document.addEventListener('click', function (e) {
        if (!speechBubble.contains(e.target) && !mascotBoy.contains(e.target)) {
            speechBubble.classList.remove('active');
            if (ctaBubble) ctaBubble.classList.remove('hidden');
        }
    });
}
