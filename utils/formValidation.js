export function validateEmail(email) {
  // input string
  // output error message or undefined
  if (!email || '') {
    return 'Please enter a valid email address.';
  }
  if (email.length < 5) {
    return 'Please enter a valid email address.';
  }
  if (!email.includes('@')) {
    return 'Please enter a valid email address.';
  }
  return;
}
export function validatePassword(password) {
  // input string
  // output error message or undefined
  if (!password || '') {
    return 'Please enter a password.';
  }
  if (password.length < 8) {
    return 'Password must contain at least 8 characters.';
  }
  return;
}
export function validateName(name) {
  // input string
  // output error message or undefined
  if (!name || name === '') {
    return 'Please provide a name.';
  }
  return;
}
