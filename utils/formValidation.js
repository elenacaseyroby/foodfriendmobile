// validateEmail(email)
// validatePassowrd(password)

export function validateEmail(email) {
  // input string
  // output error message or null
  if (!email) {
    return 'Please enter a valid email address.';
  }
  if (email.length < 5) {
    return 'Please enter a valid email address.';
  }
  if (email.length > 70) {
    return 'Email too long.  Please enter a shorter, valid email address.';
  }
  if (!email.includes('@')) {
    return 'Please enter a valid email address.';
  }
  return;
}
export function validatePassword(password) {
  // input string
  // output error message or null
  // if (!password) {
  //   return 'Please enter a valid password.';
  // }
  // if (password.length > 100) {
  //   return 'Password too long. Please shorten password and submit again.';
  // }
  // if (password.length < 8) {
  //   return 'Password must contain at least 8 characters.';
  // }
  return;
}
