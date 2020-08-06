import {postRequest} from './apiUtils';

export default {
  async login(email, password) {
    const endpoint = '/signin';
    const body = {
      email: email,
      password: password,
    };
    // Set default error response:
    const status = 500;
    const response = {message: 'Network request failed'};
    let loginResponse = {response: response, status: status};
    try {
      loginResponse = await postRequest(endpoint, body);
    } catch (error) {
      console.log(error);
    }
    return loginResponse;
  },
  async signUp(email, password, firstName, lastName) {
    const endpoint = '/signup';
    const body = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    // Set default error response:
    const status = 500;
    const response = {message: 'Network request failed'};
    let signUpResponse = {response: response, status: status};
    try {
      signUpResponse = await postRequest(endpoint, body);
    } catch (error) {
      console.log(error);
    }
    return signUpResponse;
  },
  async requestPasswordResetEmail(email) {
    const endpoint = '/sendPasswordResetEmail';
    const body = {
      email: email,
    };
    // Set default error response:
    const status = 500;
    const response = {message: 'Network request failed'};
    let resetResponse = {response: response, status: status};
    try {
      resetResponse = await postRequest(endpoint, body);
    } catch (error) {
      console.log(error);
    }
    return resetResponse;
  },
  async resetPassword(userId, newPassword, passwordResetToken) {
    const endpoint = '/resetPassword';
    const body = {
      userId: userId,
      newPassword: newPassword,
      passwordResetToken: passwordResetToken,
    };
    // Set default error response:
    const status = 500;
    const response = {message: 'Network request failed'};
    let resetResponse = {response: response, status: status};
    try {
      resetResponse = await postRequest(endpoint, body);
    } catch (error) {
      console.log(error);
    }
    return resetResponse;
  },
};
