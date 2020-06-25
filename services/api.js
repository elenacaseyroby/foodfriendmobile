import {getRequest} from './apiUtils';

export default {
  async getUser(userId) {
    try {
      const endpoint = `/users/${userId}`;
      const response = await getRequest(endpoint);
      const responseJson = await response.json();
      return {response: responseJson, status: response.status};
    } catch (error) {
      console.log(error);
    }
  },
};
