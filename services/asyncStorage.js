import {AsyncStorage} from 'react-native';

export default {
  async _storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      return 'success';
    } catch (e) {
      console.log('Failed to save the data to the storage');
    }
  },
  async _retrieveData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log('Failed to fetch the data from storage');
    }
  },
};
