import 'react-native';
// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
import {validateEmail} from '../utils/formValidation';

// Test login functionality:

// 1. Email validation
test('Returns error when email field entry is empty string', () => {
  const email = '';
  const errorMessage = validateEmail(email);
  expect(errorMessage).toMatch('Please enter a valid email address.');
});
test('Returns error when email field entry is null', () => {
  const email = null;
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

// test deep link to UpdatePassword works
// test updating state works.
