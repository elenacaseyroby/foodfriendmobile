import 'react-native';
import {getPasswordUpdateError} from '../utils/auth';

// passwordValidation is already tested in SignIn.test.js so they don't need to be tested here.

// 1. check for error with /resetpassword request
test('Returns error if /resetpassword request response is 500', () => {
  const signUpResponse = {
    status: 500,
    response: {},
  };
  const errorMessage = getPasswordUpdateError(signUpResponse);
  expect(errorMessage).toMatch(
    'Network error. Please make sure you are connected to the internet.',
  );
});
test('Returns error if /resetpassword request response is 401', () => {
  const signUpResponse = {
    status: 401,
    response: {},
  };
  const errorMessage = getPasswordUpdateError(signUpResponse);
  expect(errorMessage).toMatch(
    'Password reset request expired.  Please submit a new password reset request and try again.',
  );
});
test('Returns error if /resetpassword request response is 400', () => {
  const signUpResponse = {
    status: 400,
    response: {},
  };
  const errorMessage = getPasswordUpdateError(signUpResponse);
  expect(errorMessage).toMatch(
    'Password reset failed.  Please submit a new password reset request and try again.',
  );
});
test('Returns undefined if /resetpassword request response is 200', () => {
  const signUpResponse = {
    status: 200,
    response: {},
  };
  const errorMessage = getPasswordUpdateError(signUpResponse);
  expect(errorMessage).toBeUndefined();
});
