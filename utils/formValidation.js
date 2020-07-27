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

export function validateDate(date) {
  // input string
  // output error message or undefined
  const dateArray = date.split('/');
  const monthStr = dateArray[0];
  const dayStr = dateArray[1];
  const yearStr = dateArray[2];
  if (dateArray.length > 3) {
    return 'Please use numerical values to express date. For example, 10/27/1954.';
  }

  let month;
  let day;
  let year;
  try {
    month = parseInt(monthStr);
    day = parseInt(dayStr);
    year = parseInt(yearStr);
  } catch (error) {
    return 'Please use numerical values to express date. For example, 10/27/1954.';
  }
  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    return 'Please use numerical values to express date. For example, 10/27/1954.';
  }
  if (month > 12 || month < 1) return 'MM must be between 1 and 12.';
  if (day > 31 || day < 1) return 'DD must be between 1 and 31.';
  if (year > 2050 || year < 1920) return 'YYYY must be a valid year.';
  return;
}
