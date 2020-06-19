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
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  },
  // async fetchDealDetail(dealId) {
  //   try {
  //     const response = await fetch(`${apiHost}/api/deals/${dealId}`);
  //     const responseJson = await response.json();
  //     return responseJson;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // async fetchDealsSearchResults(searchTerm) {
  //   try {
  //     const response = await fetch(
  //       `${apiHost}/api/deals?searchTerm=${searchTerm}`,
  //     );
  //     const responseJson = await response.json();
  //     return responseJson;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};
