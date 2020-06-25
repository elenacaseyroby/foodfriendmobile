import asyncStorage from '../asyncStorage';

const API_HOST = 'http://localhost:5000';

export async function getRequest(endpoint) {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  // accessToken granted on login. need accessToken to get any user data.
  const accessToken = await asyncStorage._retrieveData('ACCESS_TOKEN');
  if (accessToken) {
    headers.authorization = accessToken;
  }
  const response = await fetch(`${API_HOST}${endpoint}`, {
    method: 'GET',
    headers: headers,
  });
  const responseJson = await response.json();
  return {response: responseJson, status: response.status};
}
