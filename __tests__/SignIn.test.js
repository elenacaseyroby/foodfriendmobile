import 'react-native';
// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
import {validateEmail, validatePassword} from '../utils/formValidation';
import {storeAsyncLoginData, getLoginError} from '../utils/auth';
import asyncStorage from '../asyncStorage';

// Unit tests for login functionality:

// 1. Email validation
test('Returns error when email field entry is null', () => {
  const email = null;
  const errorMessage = validateEmail(email);
  expect(errorMessage).toMatch('Please enter a valid email address.');
});
test('Returns error when email field entry is empty string', () => {
  const email = '';
  const errorMessage = validateEmail(email);
  expect(errorMessage).toMatch('Please enter a valid email address.');
});
test('Returns error when email field entry is over 70 characters in length.', () => {
  const email =
    'ee2b8974b59c0e34e20dff464296c397edb4947833ee2b892222222222222222222222e';
  const errorMessage = validateEmail(email);
  expect(errorMessage).toMatch(
    'Email too long.  Please enter a shorter, valid email address.',
  );
});
test('Returns error when email field entry does not contain "@".', () => {
  const email = 'elenacaseyrobygmail.com';
  const errorMessage = validateEmail(email);
  expect(errorMessage).toMatch('Please enter a valid email address.');
});
test('Returns undefined when email passes validation', () => {
  const email = 'elenacaseyroby@gmail.com';
  const errorMessage = validateEmail(email);
  expect(errorMessage).toBeUndefined();
});
// 2. Password validation
test('Returns error when password field entry is null', () => {
  const password = null;
  const errorMessage = validatePassword(password);
  expect(errorMessage).toMatch('Please enter a valid password.');
});
test('Returns error when password field entry is over 70 characters in length', () => {
  const password =
    'ee2b8974b59c0e34e20dff464296c397edb4947833ee2b892222222222222222222222e';
  const errorMessage = validatePassword(password);
  expect(errorMessage).toMatch(
    'Password too long. Please shorten password and submit again.',
  );
});
test('Returns error when password field entry is less than 8 characters in length', () => {
  const password = '7777777';
  const errorMessage = validatePassword(password);
  expect(errorMessage).toMatch('Password must contain at least 8 characters.');
});
test('Returns undefined when password passes validation', () => {
  const password = '88888888';
  const errorMessage = validatePassword(password);
  expect(errorMessage).toBeUndefined();
});

// 3. test getLoginError(loginResponse): check errors returned based on login status
test('Returns error if login response is 500', async () => {
  const loginResponse = {
    status: 500,
    response: {},
  };
  const errorMessage = getLoginError(loginResponse);
  expect(errorMessage).toMatch('Server error. Please try again later.');
});
test('Returns error if login response is 404', async () => {
  const loginResponse = {
    status: 404,
    response: {},
  };
  const errorMessage = getLoginError(loginResponse);
  expect(errorMessage).toMatch(
    'Could not find account under this email. Please check for typos an try again.',
  );
});
test('Returns error if login response is 401', async () => {
  const loginResponse = {
    status: 401,
    response: {},
  };
  const errorMessage = getLoginError(loginResponse);
  expect(errorMessage).toMatch(
    'Password is incorrect. Please try a different password.',
  );
});
test('Returns undefined if login response is 200', async () => {
  const loginResponse = {
    status: 200,
    response: {},
  };
  const errorMessage = getLoginError(loginResponse);
  expect(errorMessage).toBeUndefined();
});
// 4. test storeAsyncLoginData
test('Returns error if USER_ID and ACCESS_TOKEN not set in async storage.', async () => {
  // mock _storeData function to output null as if USER_ID and ACCESS_TOKEN were not successfully stored.
  jest.spyOn(asyncStorage, '_storeData').mockImplementation(() => {
    return null;
  });
  const userId = 1;
  const accessToken = 'lkasdflkj';
  const errorMessage = await storeAsyncLoginData(userId, accessToken);
  expect(errorMessage).toMatch(
    'An error has occurred. Please try again. If issue persists reach out to customer support for further assistance.',
  );
});
test('Returns "success" if USER_ID and ACCESS_TOKEN are set in async storage.', async () => {
  // mock _storeData function to output 'success' as if USER_ID and ACCESS_TOKEN were successfully stored.
  jest.spyOn(asyncStorage, '_storeData').mockImplementation(() => {
    return 'success';
  });
  const userId = 1;
  const accessToken = 'lkasdflkj';
  const errorMessage = await storeAsyncLoginData(userId, accessToken);
  expect(errorMessage).toMatch('success');
});

//storeAsyncLoginData(userId, accessToken)

// test deep link to UpdatePassword works
// test updating state works.
