import {postRequest} from './apiUtils';

export default {
  async login(email, password) {
    try {
      const endpoint = '/login';
      const body = {
        email: email,
        password: password,
      };
      return postRequest(endpoint, body);
    } catch (error) {
      console.log(error);
    }
  },
  async signUp(email, password, first_name, last_name) {
    try {
      const endpoint = '/signup';
      const body = {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
      };
      return postRequest(endpoint, body);
    } catch (error) {
      console.log(error);
    }
  },
  async requestPasswordResetEmail(email) {
    try {
      const endpoint = '/sendPasswordResetEmail';
      const body = {
        email: email,
      };
      return postRequest(endpoint, body);
    } catch (error) {
      console.log(error);
    }
  },
  async resetPassword(userId, newPassword, passwordResetToken) {
    try {
      const endpoint = '/resetPassword';
      const body = {
        userId: userId,
        newPassword: newPassword,
        passwordResetToken: passwordResetToken,
      };
      return postRequest(endpoint, body);
    } catch (error) {
      console.log(error);
    }
  },
};
