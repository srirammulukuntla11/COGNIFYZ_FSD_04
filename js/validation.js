// Password strength checker
class PasswordValidator {
    static checkStrength(password) {
        let strength = 0;
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            numbers: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        
        strength = Object.values(checks).filter(Boolean).length;
        
        let level = 'weak';
        if (strength >= 4) level = 'strong';
        else if (strength >= 3) level = 'medium';
        
        return {
            level,
            score: strength,
            checks,
            message: this.getStrengthMessage(level, checks)
        };
    }
    
    static getStrengthMessage(level, checks) {
        const messages = {
            weak: 'Password is too weak. ' + this.getMissingRequirements(checks),
            medium: 'Password is medium. Add more variety for strong password.',
            strong: 'Excellent! Strong password!'
        };
        return messages[level];
    }
    
    static getMissingRequirements(checks) {
        const missing = [];
        if (!checks.length) missing.push('at least 8 characters');
        if (!checks.uppercase) missing.push('uppercase letter');
        if (!checks.lowercase) missing.push('lowercase letter');
        if (!checks.numbers) missing.push('number');
        if (!checks.special) missing.push('special character');
        
        return missing.length ? `Missing: ${missing.join(', ')}` : '';
    }
}

// Form validation rules
class FormValidator {
    constructor(formData) {
        this.errors = {};
        this.formData = formData;
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!email) return 'Email is required';
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return null;
    }
    
    validatePassword(password) {
        if (!password) return 'Password is required';
        if (password.length < 8) return 'Password must be at least 8 characters';
        return null;
    }
    
    validateConfirmPassword(password, confirmPassword) {
        if (password !== confirmPassword) return 'Passwords do not match';
        return null;
    }
    
    validateUsername(username) {
        if (!username) return 'Username is required';
        if (username.length < 3) return 'Username must be at least 3 characters';
        if (username.length > 20) return 'Username must be less than 20 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers, and underscores';
        return null;
    }
    
    validateAge(age) {
        if (!age) return null; // Optional field
        const ageNum = parseInt(age);
        if (isNaN(ageNum)) return 'Please enter a valid number';
        if (ageNum < 18) return 'You must be at least 18 years old';
        if (ageNum > 120) return 'Please enter a valid age';
        return null;
    }
    
    validatePhone(phone) {
        if (!phone) return null; // Optional field
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) return 'Please enter a valid phone number';
        return null;
    }
    
    validateAll() {
        this.errors = {};
        
        const emailError = this.validateEmail(this.formData.email);
        if (emailError) this.errors.email = emailError;
        
        const passwordError = this.validatePassword(this.formData.password);
        if (passwordError) this.errors.password = passwordError;
        
        const confirmError = this.validateConfirmPassword(this.formData.password, this.formData.confirmPassword);
        if (confirmError) this.errors.confirmPassword = confirmError;
        
        const usernameError = this.validateUsername(this.formData.username);
        if (usernameError) this.errors.username = usernameError;
        
        const ageError = this.validateAge(this.formData.age);
        if (ageError) this.errors.age = ageError;
        
        const phoneError = this.validatePhone(this.formData.phone);
        if (phoneError) this.errors.phone = phoneError;
        
        return {
            isValid: Object.keys(this.errors).length === 0,
            errors: this.errors
        };
    }
}

// Export for use in other files
window.PasswordValidator = PasswordValidator;
window.FormValidator = FormValidator;