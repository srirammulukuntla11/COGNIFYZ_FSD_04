
class RegisterComponent {
    constructor() {
        console.log('RegisterComponent constructor called');
        this.users = this.loadUsers();
    }
    
    loadUsers() {
        const users = localStorage.getItem('app_users');
        return users ? JSON.parse(users) : [];
    }
    
    saveUsers() {
        localStorage.setItem('app_users', JSON.stringify(this.users));
    }
    
    render() {
        return `
            <div class="register-page">
                <h2>User Registration</h2>
                <p style="color: #6c757d; margin-bottom: 30px;">Please fill in the form below to create an account</p>
                
                <form id="registrationForm">
                    <div class="form-group">
                        <label for="username">Username *</label>
                        <input type="text" id="username" name="username" placeholder="Enter username (min 3 characters)">
                        <div class="error-message" id="usernameError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" placeholder="Enter email address">
                        <div class="error-message" id="emailError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password *</label>
                        <input type="password" id="password" name="password" placeholder="Enter password (min 8 characters)">
                        <div class="password-strength">
                            <div class="strength-bar">
                                <div class="strength-fill" id="strengthFill"></div>
                            </div>
                            <div class="strength-text" id="strengthText"></div>
                        </div>
                        <div class="error-message" id="passwordError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password *</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password">
                        <div class="error-message" id="confirmPasswordError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="age">Age (Optional)</label>
                        <input type="number" id="age" name="age" placeholder="Enter your age (must be 18+)">
                        <div class="error-message" id="ageError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone Number (Optional)</label>
                        <input type="tel" id="phone" name="phone" placeholder="Enter phone number">
                        <div class="error-message" id="phoneError"></div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Register Account</button>
                    <button type="button" class="btn btn-secondary" onclick="document.getElementById('registrationForm').reset()">Reset Form</button>
                </form>
            </div>
        `;
    }
    
    init() {
        this.setupFormValidation();
        this.setupPasswordStrength();
    }
    
    setupFormValidation() {
        const form = document.getElementById('registrationForm');
        const inputs = ['username', 'email', 'password', 'confirmPassword', 'age', 'phone'];
        
        // Real-time validation
        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', () => this.validateField(inputId));
                input.addEventListener('blur', () => this.validateField(inputId));
            }
        });
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    validateField(fieldName) {
        const value = document.getElementById(fieldName)?.value || '';
        const validator = new FormValidator({ [fieldName]: value });
        
        let error = null;
        switch(fieldName) {
            case 'username':
                error = validator.validateUsername(value);
                break;
            case 'email':
                error = validator.validateEmail(value);
                break;
            case 'password':
                error = validator.validatePassword(value);
                break;
            case 'confirmPassword':
                const password = document.getElementById('password').value;
                error = validator.validateConfirmPassword(password, value);
                break;
            case 'age':
                error = validator.validateAge(value);
                break;
            case 'phone':
                error = validator.validatePhone(value);
                break;
        }
        
        this.showFieldError(fieldName, error);
        return !error;
    }
    
    showFieldError(fieldName, error) {
        const errorElement = document.getElementById(`${fieldName}Error`);
        const inputElement = document.getElementById(fieldName);
        
        if (error) {
            errorElement.textContent = error;
            errorElement.classList.add('show');
            inputElement.classList.add('error');
        } else {
            errorElement.classList.remove('show');
            inputElement.classList.remove('error');
        }
    }
    
    setupPasswordStrength() {
        const passwordInput = document.getElementById('password');
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const strength = PasswordValidator.checkStrength(password);
            
            // Update strength indicator
            strengthFill.className = `strength-fill ${strength.level}`;
            strengthText.textContent = strength.message;
            strengthText.style.color = strength.level === 'strong' ? '#28a745' : 
                                      strength.level === 'medium' ? '#ffc107' : '#dc3545';
        });
    }
    
    handleSubmit() {
        // Validate all fields
        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            age: document.getElementById('age').value,
            phone: document.getElementById('phone').value
        };
        
        const validator = new FormValidator(formData);
        const result = validator.validateAll();
        
        // Show individual field errors
        Object.keys(result.errors).forEach(field => {
            this.showFieldError(field, result.errors[field]);
        });
        
        if (result.isValid) {
            // Check if user already exists
            const userExists = this.users.some(user => user.email === formData.email);
            if (userExists) {
                this.showToast('User with this email already exists!', 'error');
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now(),
                username: formData.username,
                email: formData.email,
                age: formData.age || 'Not specified',
                phone: formData.phone || 'Not specified',
                registeredAt: new Date().toISOString()
            };
            
            this.users.push(newUser);
            this.saveUsers();
            
            this.showToast('Registration successful! 🎉', 'success');
            document.getElementById('registrationForm').reset();
            
            // Navigate to dashboard after 1 second
            setTimeout(() => {
                window.router.navigate('/dashboard');
            }, 1000);
        } else {
            this.showToast('Please fix the errors in the form', 'error');
        }
    }
    
    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

window.RegisterComponent = RegisterComponent;