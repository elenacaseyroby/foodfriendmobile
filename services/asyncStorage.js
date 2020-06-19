import {AsyncStorage} from 'react-native';

export default {
  async _storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
      return;
    }
  },
  async _retrieveData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },
};
