import asyncStorage from '../asyncStorage';

export function getLoginError(loginResponse) {
  // input response
  // output error message or undefined;
  if (loginResponse.status >= 500)
    return 'Network error. Please make sure you are connected to the internet.';
  if (loginResponse.status === 401)
    return 'Password is incorrect. Please try a different password.';
  if (loginResponse.status === 404)
    return 'Could not find account under this email. Please check for typos and try again.';
  if (loginResponse.status !== 200)
    return 'The email and password you have entered are incorrect.';
  return;
}

export function getSignUpError(signUpResponse) {
  // input response
  // output error message or undefined;
  if (signUpResponse.status >= 500)
    return 'Network error. Please make sure you are connected to the internet.';
  if (signUpResponse.status === 401)
    return 'There is already an account under this email.';
  if (signUpResponse.status !== 200)
    return 'Invalid form field(s).  Could not create account.';
  return;
}

export function getPasswordResetError(resetResponse) {
  // input response
  // output error message or undefined;
  if (resetResponse.status >= 500)
    return 'Network error. Please make sure you are connected to the internet.';
  if (resetResponse.status === 404)
    return 'Could not find account under this email. Please check for typos and try again.';
  if (resetResponse.status !== 200)
    return 'Password reset failed.  Please submit a new request and try again.';
  return;
}

export function getPasswordUpdateError(resetResponse) {
  // input response
  // output error message or undefined;
  if (resetResponse.status >= 500)
    return 'Network error. Please make sure you are connected to the internet.';
  if (resetResponse.status === 401)
    return 'Password reset request expired.  Please submit a new password reset request and try again.';
  if (resetResponse.status !== 200)
    return 'Password reset failed.  Please submit a new password reset request and try again.';
  return;
}

export async function storeAsyncLoginData(userId, accessToken) {
  // input user id and access token
  // output error message or 'success'
  // If logs in successfully, store user_id and access_token in AsyncStorage.
  const storedToken = await asyncStorage._storeData(
    'ACCESS_TOKEN',
    accessToken,
  );
  const storedId = await asyncStorage._storeData('USER_ID', userId);
  // If data was not successfully stored, return error.
  if (!storedToken || !storedId) {
    return 'An error has occurred. Please try again. If issue persists reach out to customer support for further assistance.';
  }
  return 'success';
}
