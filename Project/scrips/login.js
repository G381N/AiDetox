// Application State
let currentMode = 'register';

// Valid credentials for login
const VALID_CREDENTIALS = {
    username: 'gebin',
    password: '1234567890'
};

// Storage key for registered users
const USERS_STORAGE_KEY = 'aidetox_users';

/**
 * Get registered users from localStorage
 */
function getRegisteredUsers() {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
}

/**
 * Save a new user to localStorage
 */
function saveUser(user) {
    const users = getRegisteredUsers();
    users.push(user);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

/**
 * Check if email already exists
 */
function emailExists(email) {
    const users = getRegisteredUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

/**
 * Switch between Register and Login tabs
 */
function switchTab(mode) {
    currentMode = mode;

    // Reset form and errors
    document.getElementById('registrationForm').reset();
    clearAllErrors();
    hideSuccessMessage();

    // Get Elements
    const nameGroup = document.getElementById('nameGroup');
    const confirmGroup = document.getElementById('confirmPasswordGroup');
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    const tabRegister = document.getElementById('tab-register');
    const tabLogin = document.getElementById('tab-login');
    const socialGroup = document.getElementById('socialLoginGroup');
    const emailInput = document.getElementById('email');
    const emailLabel = document.querySelector('label[for="email"]');

    if (mode === 'login') {
        nameGroup.style.display = 'none';
        confirmGroup.style.display = 'none';
        socialGroup.style.display = 'block';
        formTitle.innerText = 'System Login';
        submitBtn.innerText = 'Login';

        // Change email label to Username for login
        emailLabel.innerText = 'Username:';
        emailInput.placeholder = 'Enter your username';
        emailInput.type = 'text';

        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        nameGroup.style.display = 'block';
        confirmGroup.style.display = 'block';
        socialGroup.style.display = 'none';
        formTitle.innerText = 'New User';
        submitBtn.innerText = 'Register';

        // Reset to email for registration
        emailLabel.innerText = 'Email:';
        emailInput.placeholder = 'Enter your email';
        emailInput.type = 'text';

        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
    }
}

/**
 * Clear all error messages
 */
function clearAllErrors() {
    document.getElementById('nameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';
    document.getElementById('confirmPasswordError').innerText = '';
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    const successEl = document.getElementById('successMessage');
    if (successEl) {
        successEl.innerText = message;
        successEl.classList.add('show');
    }
}

/**
 * Hide success message
 */
function hideSuccessMessage() {
    const successEl = document.getElementById('successMessage');
    if (successEl) {
        successEl.classList.remove('show');
    }
}

/**
 * Validate the form based on current mode
 */
function validateForm() {
    let isValid = true;
    clearAllErrors();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate based on mode
    if (currentMode === 'register') {
        // Name validation
        if (name === '') {
            document.getElementById('nameError').innerText = 'Name is required.';
            isValid = false;
        } else if (name.length < 2) {
            document.getElementById('nameError').innerText = 'Name must be at least 2 characters.';
            isValid = false;
        }

        // Email validation for registration
        if (email === '') {
            document.getElementById('emailError').innerText = 'Email is required.';
            isValid = false;
        } else if (!email.includes('@') || !email.includes('.')) {
            document.getElementById('emailError').innerText = 'Please enter a valid email address.';
            isValid = false;
        } else if (emailExists(email)) {
            document.getElementById('emailError').innerText = 'This email is already registered.';
            isValid = false;
        }

        // Confirm password validation
        if (confirmPassword === '') {
            document.getElementById('confirmPasswordError').innerText = 'Please confirm your password.';
            isValid = false;
        } else if (password !== confirmPassword) {
            document.getElementById('confirmPasswordError').innerText = 'Passwords do not match.';
            isValid = false;
        }
    } else {
        // Login mode - Username validation
        if (email === '') {
            document.getElementById('emailError').innerText = 'Username is required.';
            isValid = false;
        }
    }

    // Password validation (both modes)
    if (password === '') {
        document.getElementById('passwordError').innerText = 'Password is required.';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('passwordError').innerText = 'Password must be at least 6 characters.';
        isValid = false;
    }

    // If validation passed, handle form submission
    if (isValid) {
        if (currentMode === 'login') {
            return handleLogin(email, password);
        } else {
            return handleRegistration(name, email, password);
        }
    }

    return false;
}

/**
 * Handle login submission
 */
function handleLogin(username, password) {
    // Check against valid credentials
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
        // Store login state
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('currentUser', username);

        // Show success and redirect
        showSuccessMessage('Login successful! Redirecting...');

        // Disable submit button during redirect
        document.getElementById('submitBtn').disabled = true;

        // Redirect to todo page after brief delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);

        return false; // Prevent form submission
    } else {
        // Check registered users
        const users = getRegisteredUsers();
        const user = users.find(u =>
            (u.email.toLowerCase() === username.toLowerCase() || u.name.toLowerCase() === username.toLowerCase())
            && u.password === password
        );

        if (user) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('currentUser', user.name);

            showSuccessMessage('Login successful! Redirecting...');
            document.getElementById('submitBtn').disabled = true;

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);

            return false;
        }

        document.getElementById('emailError').innerText = 'Invalid username or password.';
        return false;
    }
}

/**
 * Handle registration submission
 */
function handleRegistration(name, email, password) {
    // Save new user
    const newUser = {
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };

    saveUser(newUser);

    // Show success message
    showSuccessMessage('Registration successful! Please login.');

    // Switch to login tab after delay
    setTimeout(() => {
        switchTab('login');
    }, 1500);

    return false; // Prevent form submission
}

/**
 * Initialize the application
 */
function init() {
    // Create success message element if it doesn't exist
    if (!document.getElementById('successMessage')) {
        const form = document.getElementById('registrationForm');
        const successDiv = document.createElement('div');
        successDiv.id = 'successMessage';
        successDiv.className = 'success-message';
        form.insertBefore(successDiv, form.firstChild);
    }

    // Add enter key support for form submission
    document.getElementById('registrationForm').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            validateForm();
        }
    });

    // Set initial state
    switchTab('register');
}

// Initialize when DOM is ready
// Info Modal Logic
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    init();
    initInfoModal();
});