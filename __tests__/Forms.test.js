import 'react-native';
import {validateDate} from '../utils/formValidation';

test('Returns error if MM DD or YYYY not numbers', () => {
  const errorMessage = validateDate('M//DD/YYYY');
  expect(errorMessage).toMatch(
    'Please use numerical values to express date. For example, 10/27/1954.',
  );
});
test('Returns error if MM is out of range', () => {
  const errorMessage = validateDate('13/21/1991');
  expect(errorMessage).toMatch('MM must be between 1 and 12.');
});
test('Returns error if DD is out of range', () => {
  const errorMessage = validateDate('11/32/1991');
  expect(errorMessage).toMatch('DD must be between 1 and 31.');
});
test('Returns error if YYYY is out of range', () => {
  const errorMessage = validateDate('11/22/1919');
  expect(errorMessage).toMatch('YYYY must be a valid year.');
});
test('Returns error if MM DD or YYYY are empty', () => {
  const errorMessage = validateDate('MM/DD/YYYY');
  expect(errorMessage).toMatch(
    'Please use numerical values to express date. For example, 10/27/1954.',
  );
});
test('Returns undefined for valid date', () => {
  const errorMessage = validateDate('10/27/1954');
  expect(errorMessage).toBeUndefined();
});
