import asyncStorage from '../asyncStorage';

//checkLoginSuccessful(loginResponse)

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
