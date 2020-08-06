import 'react-native';
import {getPasswordResetError} from '../utils/auth';

// emailValidation is already tested in SignIn.test.js so they don't need to be tested here.

// 1. check for error with /sendpasswordresetemail request
test('Returns error if /sendpasswordresetemail request response is 500', () => {
  const signUpResponse = {
    status: 500,
    response: {},
  };
  const errorMessage = getPasswordResetError(signUpResponse);
  expect(errorMessage).toMatch(
    'Network error. Please make sure you are connected to the internet.',
  );
});
test('Returns error if /sendpasswordresetemail request response is 404', () => {
  const signUpResponse = {
    status: 404,
    response: {},
  };
  const errorMessage = getPasswordResetError(signUpResponse);
  expect(errorMessage).toMatch(
    'Could not find account under this email. Please check for typos an try again.',
  );
});
test('Returns error if /sendpasswordresetemail request response is 400', () => {
  const signUpResponse = {
    status: 400,
    response: {},
  };
  const errorMessage = getPasswordResetError(signUpResponse);
  expect(errorMessage).toMatch(
    'Password reset failed.  Please submit a new request and try again.',
  );
});
test('Returns undefined if /sendpasswordresetemail request response is 200', () => {
  const signUpResponse = {
    status: 200,
    response: {},
  };
  const errorMessage = getPasswordResetError(signUpResponse);
  expect(errorMessage).toBeUndefined();
});
