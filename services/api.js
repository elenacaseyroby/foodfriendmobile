import {getRequest, putRequest} from './apiUtils';

export default {
  async generateUserActivePath(menstruates, isVegan, pathName) {
    try {
      const endpoint = `/generateUserActivePath/?menstruates=${menstruates}&isVegan=${isVegan}&pathName=${pathName}`;
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
  async putCustomPath(userId, pathName, nutrientIds) {
    const body = {
      pathName: pathName,
      nutrientIds: nutrientIds,
    };
    try {
      const endpoint = `/users/${userId}/custompath`;
      const res = await putRequest(endpoint, body);
      return {response: JSON.stringify(res.response), status: res.status};
    } catch (error) {
      console.log(error);
      return {response: error, status: 500};
    }
  },
};
