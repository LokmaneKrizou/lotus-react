export const validateField = (field, value, password) => {
    switch (field) {
        case 'firstName':
        case 'lastName':
            const nameRegex = /^[a-zA-Z]+\s?[a-zA-Z]*$/;
            if (!value || !nameRegex.test(value)) {
                return 'Name is required and should only contain letters.';
            }
            return '';

        case 'email':
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!value || !emailRegex.test(value)) {
                return 'Please enter a valid email address.';
            }
            return '';
        case 'newPassword':
        case 'currentPassword':
        case 'password':
            if (value.length < 6) {
                return 'Password should be at least 6 characters long.';
            }
            return '';

        case 'confirmPassword':
            if (value !== password) {
                return "Passwords do not match.";
            }
            return '';

        case 'phone':
            if (value && !/^[\d]+$/.test(value)) {
                return 'Phone number should only contain numbers.';
            } else if (value.length < 10) {
                return 'Phone number should be at least 10 digits long.';
            }
            return '';

        default:
            return '';
    }
}