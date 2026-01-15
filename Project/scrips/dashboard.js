// ============================================
// DASHBOARD APP - 8-bit Retro Style
// ============================================

/**
 * Check authentication on page load
 */
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'index.html';
        return false;
    }

    const currentUser = sessionStorage.getItem('currentUser') || 'GUEST';
    document.getElementById('userBadge').textContent = currentUser.toUpperCase();
    return true;
}

/**
 * Logout and redirect to login page
 */
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

/**
 * Initialize mascot and speech bubble interactions
 */
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

            // Hide after random time (2-4 seconds)
            const hideDelay = 2000 + Math.random() * 2000;
            setTimeout(hideCTA, hideDelay);
        }
    }

    // Function to hide CTA
    function hideCTA() {
        if (ctaBubble && !speechBubble.classList.contains('active')) {
            ctaBubble.classList.add('hidden');

            // Show again after random short interval (1.5-3 seconds)
            const showDelay = 1500 + Math.random() * 1500;
            setTimeout(showCTA, showDelay);
        }
    }

    // Start the CTA cycle - initially hidden, then show after a short delay
    if (ctaBubble) {
        ctaBubble.classList.add('hidden');
        setTimeout(showCTA, 1000); // First appearance after 1 second
    }

    // Toggle speech bubble on mascot click
    mascotBoy.addEventListener('click', function (e) {
        e.stopPropagation();
        speechBubble.classList.toggle('active');

        // Hide/show CTA bubble
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

    // Close bubble on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && speechBubble.classList.contains('active')) {
            speechBubble.classList.remove('active');
            if (ctaBubble) {
                ctaBubble.classList.remove('hidden');
            }
        }
    });
}

/**
 * Initialize the application
 */
function init() {
    if (!checkAuth()) return;

    // Initialize mascot speech bubble functionality
    initMascot();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
