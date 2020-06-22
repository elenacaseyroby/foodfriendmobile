const API_HOST = 'http://localhost:5000';

export default {
  async getUser(userId, accessToken) {
    try {
      const response = await fetch(`${API_HOST}/users/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      });
      const responseJson = await response.json();
      return {response: responseJson, status: response.status};
    } catch (error) {
      console.log(error);
    }
  },
};
