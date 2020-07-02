import 'react-native';
// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
import {validateEmail, validatePassword} from '../utils/formValidation';
import {storeAsyncLoginData} from '../utils/auth';
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

// 4. check access token and user id store in async storage
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
