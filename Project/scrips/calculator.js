// ============================================
// CALCULATOR APP - 8-bit Retro Style
// ============================================

// Calculator State
let currentValue = '0';
let previousValue = '';
let operator = null;
let waitingForOperand = false;
let expression = '';

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
 * Update the display
 */
function updateDisplay() {
    const resultEl = document.getElementById('result');
    const expressionEl = document.getElementById('expression');

    resultEl.textContent = currentValue;
    expressionEl.textContent = expression;
}

/**
 * Input a digit
 */
const MAX_DIGITS = 12;

function inputDigit(digit) {
    if (waitingForOperand) {
        currentValue = digit;
        waitingForOperand = false;
    } else {
        if (currentValue.replace('.', '').length >= MAX_DIGITS) {
            return;
        }
        currentValue = currentValue === '0' ? digit : currentValue + digit;
    }
    updateDisplay();
}

/**
 * Input decimal point
 */
function inputDecimal() {
    if (waitingForOperand) {
        currentValue = '0.';
        waitingForOperand = false;
        updateDisplay();
        return;
    }

    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay();
    }
}

/**
 * Clear calculator
 */
function clearCalculator() {
    currentValue = '0';
    previousValue = '';
    operator = null;
    waitingForOperand = false;
    expression = '';
    updateDisplay();
}

/**
 * Backspace - remove last digit
 */
function backspace() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

/**
 * Calculate percentage
 */
function calculatePercent() {
    const current = parseFloat(currentValue);
    currentValue = String(current / 100);
    updateDisplay();
}

/**
 * Perform calculation
 */
function performCalculation() {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    if (isNaN(prev) || isNaN(current)) {
        return current;
    }

    let result;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 'Error';
            break;
        default:
            return current;
    }

    // Round to avoid floating point issues
    if (typeof result === 'number') {
        result = Math.round(result * 1000000000) / 1000000000;
    }

    return result;
}

/**
 * Handle operator input
 */
function handleOperator(nextOperator) {
    const current = parseFloat(currentValue);
    const operatorSymbols = {
        '+': '+',
        '-': '−',
        '*': '×',
        '/': '÷'
    };

    if (operator && waitingForOperand) {
        // Just change the operator
        operator = nextOperator;
        expression = `${previousValue} ${operatorSymbols[nextOperator]}`;
        updateDisplay();
        return;
    }

    if (previousValue === '') {
        previousValue = currentValue;
    } else if (operator) {
        const result = performCalculation();
        currentValue = String(result);
        previousValue = currentValue;
    }

    waitingForOperand = true;
    operator = nextOperator;
    expression = `${previousValue} ${operatorSymbols[nextOperator]}`;
    updateDisplay();
}

/**
 * Calculate result
 */
function calculateResult() {
    if (!operator || waitingForOperand) {
        return;
    }

    const operatorSymbols = {
        '+': '+',
        '-': '−',
        '*': '×',
        '/': '÷'
    };

    const fullExpression = `${previousValue} ${operatorSymbols[operator]} ${currentValue}`;
    expression = `${fullExpression} =`;
    const result = performCalculation();

    // Add to history
    addToHistory(fullExpression, String(result));

    currentValue = String(result);
    previousValue = '';
    operator = null;
    waitingForOperand = false;
    updateDisplay();
}

/**
 * History management
 */
let calculationHistory = [];

function addToHistory(expr, result) {
    calculationHistory.unshift({ expr, result });
    if (calculationHistory.length > 10) {
        calculationHistory.pop();
    }
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;

    if (calculationHistory.length === 0) {
        historyList.innerHTML = `
            <div class="history-empty">
                <span class="empty-icon">📝</span>
                <span class="empty-text">No calculations yet</span>
            </div>
        `;
        return;
    }

    historyList.innerHTML = calculationHistory.map((item, index) => `
        <div class="history-item" data-index="${index}">
            <div class="expr">${item.expr}</div>
            <div class="result">= ${item.result}</div>
        </div>
    `).join('');

    // Add click listeners
    historyList.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', function () {
            const index = parseInt(this.dataset.index);
            const historyItem = calculationHistory[index];
            if (historyItem) {
                currentValue = historyItem.result;
                expression = '';
                previousValue = '';
                operator = null;
                waitingForOperand = false;
                updateDisplay();
            }
        });
    });
}

function clearHistory() {
    calculationHistory = [];
    renderHistory();
}

/**
 * Handle button clicks
 */
function handleButtonClick(e) {
    const button = e.target.closest('.calc-btn');
    if (!button) return;

    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value !== undefined) {
        if (value === '.') {
            inputDecimal();
        } else {
            inputDigit(value);
        }
    } else if (action) {
        switch (action) {
            case 'clear':
                clearCalculator();
                break;
            case 'backspace':
                backspace();
                break;
            case 'percent':
                calculatePercent();
                break;
            case 'add':
                handleOperator('+');
                break;
            case 'subtract':
                handleOperator('-');
                break;
            case 'multiply':
                handleOperator('*');
                break;
            case 'divide':
                handleOperator('/');
                break;
            case 'equals':
                calculateResult();
                break;
        }
    }
}

/**
 * Handle keyboard input
 */
function handleKeyboard(e) {
    const key = e.key;

    if (/[0-9]/.test(key)) {
        e.preventDefault();
        inputDigit(key);
    } else if (key === '.') {
        e.preventDefault();
        inputDecimal();
    } else if (key === '+') {
        e.preventDefault();
        handleOperator('+');
    } else if (key === '-') {
        e.preventDefault();
        handleOperator('-');
    } else if (key === '*') {
        e.preventDefault();
        handleOperator('*');
    } else if (key === '/') {
        e.preventDefault();
        handleOperator('/');
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculateResult();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        e.preventDefault();
        clearCalculator();
    } else if (key === 'Backspace') {
        e.preventDefault();
        backspace();
    } else if (key === '%') {
        e.preventDefault();
        calculatePercent();
    }
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

    updateDisplay();

    // Add event listener for calculator buttons
    document.querySelector('.calc-buttons').addEventListener('click', handleButtonClick);

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyboard);

    // Initialize mascot
    initMascot();

    // Initialize history
    renderHistory();

    // Clear history button
    const clearHistoryBtn = document.getElementById('clearHistory');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearHistory);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
