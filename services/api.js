import {getRequest, putRequest} from './apiUtils';

export default {
  async getUserPaths(userId) {
    try {
      const endpoint = `/paths/${userId}`;
      const res = await getRequest(endpoint);
      return {response: JSON.stringify(res.response), status: res.status};
    } catch (error) {
      console.log(error);
      return {response: error, status: 500};
    }
  },
  async putUser(userId, body) {
    try {
      const endpoint = `/users/${userId}`;
      const res = await putRequest(endpoint, body);
      return {response: JSON.stringify(res.response), status: res.status};
    } catch (error) {
      console.log(error);
      return {response: error, status: 500};
    }
  },
  async putUserDiets(userId, dietIds) {
    const body = {
      dietIds: dietIds,
    };
    try {
      const endpoint = `/users/${userId}/diets`;
      const res = await putRequest(endpoint, body);
      return {response: JSON.stringify(res.response), status: res.status};
    } catch (error) {
      console.log(error);
      return {response: error, status: 500};
    }
  },
};
