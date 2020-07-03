import asyncStorage from '../asyncStorage';

export function getLoginError(loginResponse) {
  // input response
  // output error message or undefined;
  if (loginResponse.status >= 500) return 'Server error.';
  if (loginResponse.status === 401)
    return 'Password is incorrect. Please try a different password.';
  if (loginResponse.status === 400)
    return 'No account associated with this email. Please check for typos an try again.';
  if (loginResponse.status !== 200)
    return 'The email and password you have entered are incorrect.';
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
  const storedId = await asyncStorage._storeData(
    'USER_ID',
    JSON.stringify(userId),
  );
  // If data was not successfully stored, return error.
  if (!storedToken || !storedId)
    return 'An error has occurred. Please try again. If issue persists reach out to customer support for further assistance.';
  return 'success';
}
