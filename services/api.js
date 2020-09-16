import {getRequest, putRequest, postRequest, deleteRequest} from './apiUtils';

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
  async postUserFood(userId, foodId, servingsCount) {
    // servingsCount must be decimal 00.00
    const body = {
      foodId: foodId,
      servingsCount: servingsCount,
    };
    try {
      const endpoint = `/users/${userId}/userfoods`;
      const res = await postRequest(endpoint, body);
      return {response: JSON.stringify(res.response), status: res.status};
    } catch (error) {
      console.log(error);
      return {response: error, status: 500};
    }
  },
  async deleteUserFood(userId, userFoodId) {
    const body = {
      userFoodId: userFoodId,
    };
    try {
      const endpoint = `/users/${userId}/userfoods`;
      const res = await deleteRequest(endpoint, body);
      return {response: JSON.stringify(res.response), status: res.status};
    } catch (error) {
      console.log(error);
      return {response: error, status: 500};
    }
  },
};
