const API_HOST = 'http://localhost:5000';

export default {
  async login(email, password) {
    try {
      const response = await fetch(`${API_HOST}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const responseJson = await response.json();
      return {response: responseJson, status: response.status};
    } catch (error) {
      console.log(error);
    }
  },
  async signUp(email, password, first_name, last_name) {
    try {
      const response = await fetch(`${API_HOST}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          first_name: first_name,
          last_name: last_name,
        }),
      });
      const responseJson = await response.json();
      return {response: responseJson, status: response.status};
    } catch (error) {
      console.log(error);
    }
  },
};
