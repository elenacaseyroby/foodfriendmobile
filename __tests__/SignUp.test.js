import 'react-native';
import {validateName} from '../utils/formValidation';
import {getSignUpError} from '../utils/auth';

// emailValidation, passwordValidation and storeAsyncLoginData (storing/persisiting login errors) are
// tested in SignIn.test.js so they don't need to be tested here

// 1. Name validation
test('Returns error when name field entry is null', () => {
  const name = null;
  const errorMessage = validateName(name);
  expect(errorMessage).toMatch('Please provide a name.');
});
test('Returns undefined when name field entry is under 30 characters.', () => {
  const name = 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj';
  const errorMessage = validateName(name);
  expect(errorMessage).toBeUndefined();
});

// 2. check for error with signup request
test('Returns error if sign up response is 500', () => {
  const signUpResponse = {
    status: 500,
    response: {},
  };
  const errorMessage = getSignUpError(signUpResponse);
  expect(errorMessage).toMatch('Network error. Please try again later.');
});
test('Returns error if sign up response is 401', () => {
  const signUpResponse = {
    status: 401,
    response: {},
  };
  const errorMessage = getSignUpError(signUpResponse);
  expect(errorMessage).toMatch('There is already an account under this email.');
});
test('Returns error if sign up response is 400', () => {
  const signUpResponse = {
    status: 400,
    response: {},
  };
  const errorMessage = getSignUpError(signUpResponse);
  expect(errorMessage).toMatch(
    'Invalid form field(s).  Could not create account.',
  );
});
test('Returns undefined if sign up response is 200', () => {
  const signUpResponse = {
    status: 200,
    response: {},
  };
  const errorMessage = getSignUpError(signUpResponse);
  expect(errorMessage).toBeUndefined();
});
