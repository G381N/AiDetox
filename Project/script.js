 let currentMode = 'register';

        function switchTab(mode) {
            currentMode = mode;

            // Reset form and errors
            document.getElementById('registrationForm').reset();
            document.querySelectorAll('.error').forEach(el => el.innerText = '');

            // Get Elements
            const nameGroup = document.getElementById('nameGroup');
            const confirmGroup = document.getElementById('confirmPasswordGroup');
            const formTitle = document.getElementById('formTitle');
            const submitBtn = document.getElementById('submitBtn');
            const tabRegister = document.getElementById('tab-register');
            const tabLogin = document.getElementById('tab-login');
            const socialGroup = document.getElementById('socialLoginGroup'); // New

            if (mode === 'login') {
                nameGroup.style.display = 'none';
                confirmGroup.style.display = 'none';
                socialGroup.style.display = 'block'; // Show Social
                formTitle.innerText = 'System Login';
                submitBtn.innerText = 'Login';

                tabLogin.classList.add('active');
                tabRegister.classList.remove('active');
            } else {
                nameGroup.style.display = 'block';
                confirmGroup.style.display = 'block';
                socialGroup.style.display = 'none'; // Hide Social
                formTitle.innerText = 'New User';
                submitBtn.innerText = 'Register';

                tabRegister.classList.add('active');
                tabLogin.classList.remove('active');
            }
        }

        function validateForm() {
            let isValid = true;


            document.getElementById('nameError').innerText = '';
            document.getElementById('emailError').innerText = '';
            document.getElementById('passwordError').innerText = '';
            document.getElementById('confirmPasswordError').innerText = '';


            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;


            if (currentMode === 'register') {
                if (name === '') {
                    document.getElementById('nameError').innerText = 'Name is required.';
                    isValid = false;
                }
            }


            if (email === '') {
                document.getElementById('emailError').innerText = 'Email is required.';
                isValid = false;
            } else if (!email.includes('@')) {
                document.getElementById('emailError').innerText = 'Email must contain "@" symbol.';
                isValid = false;
            }


            if (password === '') {
                document.getElementById('passwordError').innerText = 'Password is required.';
                isValid = false;
            } else if (password.length < 6) {
                document.getElementById('passwordError').innerText = 'Password must be at least 6 characters long.';
                isValid = false;
            }


            if (currentMode === 'register') {
                if (confirmPassword === '') {
                    document.getElementById('confirmPasswordError').innerText = 'Please confirm your password.';
                    isValid = false;
                } else if (password !== confirmPassword) {
                    document.getElementById('confirmPasswordError').innerText = 'Passwords do not match.';
                    isValid = false;
                }
            }

            return isValid;
        }