function validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateEmails(emails: string[]) {
    return emails.every(validateEmail);
}

function validatePassword(password: string) {
    return password.length >= 6;
}

export { validateEmail, validateEmails, validatePassword };
