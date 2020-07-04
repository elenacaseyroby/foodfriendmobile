import 'react-native';
import {validateName} from '../utils/formValidation';

// emailValidation, passwordValidation and storeAsyncLoginData (storing/persisiting login errors) are
// tested in SignIn.test.js so they don't need to be tested here

// 1. Name validation
test('Returns error when name field entry is null', () => {
  const name = null;
  const errorMessage = validateName(name);
  expect(errorMessage).toMatch('Please provide a name.');
});
test('Returns error when name field entry is over 29 characters in length.', () => {
  const name = 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj';
  const errorMessage = validateName(name);
  expect(errorMessage).toMatch('Name must be under 30 characters.');
});
test('Returns undefined when name field entry is under 30 characters.', () => {
  const name = 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj';
  const errorMessage = validateName(name);
  expect(errorMessage).toBeUndefined();
});
