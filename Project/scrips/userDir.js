// Check authentication
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'index.html';
    } else {
        const username = sessionStorage.getItem('currentUser');
        const userBadge = document.getElementById('userBadge');
        if (userBadge) {
            userBadge.textContent = username || 'USER';
        }
    }
}

// Global logout function
window.logout = function () {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
};

// DOM Elements
const userList = document.getElementById('user-list');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const searchInput = document.getElementById('search');

// State
let users = [];

// Fetch Users
function fetchUsers() {
    loading.style.display = 'block';
    error.style.display = 'none';

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(data => {
            users = data;
            displayUsers(users);
            loading.style.display = 'none';
        })
        .catch(err => {
            console.error(err);
            loading.style.display = 'none';
            error.textContent = 'ERROR 404: DATA NOT FOUND';
            error.style.display = 'block';
        });
}

// Display Users as Pokemon Cards
function displayUsers(usersToDisplay) {
    userList.innerHTML = '';

    if (usersToDisplay.length === 0) {
        userList.innerHTML = '<div style="color:#fff; text-align:center; width:100%; grid-column: span 3;">NO USERS FOUND IN DATABASE</div>';
        return;
    }

    usersToDisplay.forEach((user, index) => {
        const card = document.createElement('div');
        card.className = 'user-card';
        // Add random tilt for more table-top feel
        const rotate = (Math.random() * 2 - 1).toFixed(1);
        card.style.transform = `rotate(${rotate}deg)`;

        // Generate deterministic HP based on ID
        const hp = 50 + (user.id * 10);

        card.innerHTML = `
            <div class="card-header">
                <span>${user.username.toUpperCase()}</span>
                <span class="user-hp">HP ${hp}</span>
            </div>
            <div class="card-image-box">
                <img src="https://api.dicebear.com/9.x/pixel-art/svg?seed=${user.username}" class="user-avatar" alt="${user.username}" loading="lazy">
            </div>
            <div class="card-info">
                <div class="info-row">
                    <span class="info-label">NAME</span>
                    <span class="info-val">${user.name}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">CITY</span>
                    <span class="info-val">${user.address.city}</span>
                </div>
                 <div class="info-row">
                    <span class="info-label">EMAIL</span>
                    <span class="info-val" style="font-size:5px">${user.email.toLowerCase()}</span>
                </div>
            </div>
        `;

        // Add hover effect clean up logic in CSS, but explicit click could open detail modal in future
        userList.appendChild(card);
    });
}

// Search Handler
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(term) ||
            user.username.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term)
        );
        displayUsers(filtered);
    });
}

// Mascot Logic (Direct copy from dashboard.js for consistency)
function initMascot() {
    const mascotBoy = document.getElementById('mascotBoy');
    const speechBubble = document.getElementById('speechBubble');
    const closeBubble = document.getElementById('closeBubble');
    const ctaBubble = document.getElementById('ctaBubble');
    const ctaText = document.getElementById('ctaText');

    if (!mascotBoy || !speechBubble) return;

    // Random CTA messages
    const ctaMessages = [
        "Click me!",
        "Hey there!",
        "Projects!",
        "Explore!",
        "Tap here!",
        "See more!",
        "What's up?",
        "Yo!",
        "Over here!",
        "Check this!"
    ];

    // Function to show CTA with random message
    function showCTA() {
        if (ctaText && ctaBubble && !speechBubble.classList.contains('active')) {
            const randomIndex = Math.floor(Math.random() * ctaMessages.length);
            ctaText.textContent = ctaMessages[randomIndex];
            ctaBubble.classList.remove('hidden');

            const hideDelay = 2000 + Math.random() * 2000;
            setTimeout(hideCTA, hideDelay);
        }
    }

    // Function to hide CTA
    function hideCTA() {
        if (ctaBubble && !speechBubble.classList.contains('active')) {
            ctaBubble.classList.add('hidden');

            const showDelay = 1500 + Math.random() * 1500;
            setTimeout(showCTA, showDelay);
        }
    }

    // Start the CTA cycle
    if (ctaBubble) {
        ctaBubble.classList.add('hidden');
        setTimeout(showCTA, 1000);
    }

    // Toggle speech bubble on mascot click
    mascotBoy.addEventListener('click', function (e) {
        e.stopPropagation();
        speechBubble.classList.toggle('active');

        if (ctaBubble) {
            ctaBubble.classList.toggle('hidden', speechBubble.classList.contains('active'));
        }
    });

    // Also toggle on CTA bubble click
    if (ctaBubble) {
        ctaBubble.addEventListener('click', function (e) {
            e.stopPropagation();
            speechBubble.classList.add('active');
            ctaBubble.classList.add('hidden');
        });
    }

    // Close bubble on close button click
    if (closeBubble) {
        closeBubble.addEventListener('click', function (e) {
            e.stopPropagation();
            speechBubble.classList.remove('active');
            if (ctaBubble) {
                ctaBubble.classList.remove('hidden');
            }
        });
    }

    // Close bubble when clicking outside
    document.addEventListener('click', function (e) {
        if (!speechBubble.contains(e.target) && !mascotBoy.contains(e.target)) {
            speechBubble.classList.remove('active');
            if (ctaBubble) {
                ctaBubble.classList.remove('hidden');
            }
        }
    });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    fetchUsers();
    initMascot();
});
