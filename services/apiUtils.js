import asyncStorage from '../asyncStorage';

const API_HOST = __DEV__
  ? 'http://localhost:5000/api'
  : 'http://foodfriend.io/api';

export async function getRequest(endpoint) {
  const date = new Date();
  const offsetInHours = date.getTimezoneOffset() / 60;
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    utcoffsetinhours: offsetInHours,
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

export async function postRequest(endpoint, body = {}) {
  return request('POST', endpoint, body);
}

export async function putRequest(endpoint, body = {}) {
  return request('PUT', endpoint, body);
}

export async function deleteRequest(endpoint, body = {}) {
  return request('DELETE', endpoint, body);
}

export async function request(method, endpoint, body = {}) {
  const date = new Date();
  const offsetInHours = date.getTimezoneOffset() / 60;
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    utcoffsetinhours: offsetInHours,
  };
  // accessToken granted on login. need accessToken to get any user data.
  const accessToken = await asyncStorage._retrieveData('ACCESS_TOKEN');
  if (accessToken) {
    headers.authorization = accessToken;
  }
  const response = await fetch(`${API_HOST}${endpoint}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });
  const responseJson = await response.json();
  return {response: responseJson, status: response.status};
}
