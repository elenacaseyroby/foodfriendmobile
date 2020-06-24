import {AsyncStorage} from 'react-native';

export default {
  async _storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      return 'success';
    } catch (error) {
      console.log('Failed to save the data to the storage');
    }
  },
  async _retrieveData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log('Failed to fetch the data from storage');
    }
  },
  async _clearData() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      return 'success';
    } catch (error) {
      console.error('Error clearing app data.');
    }
  },
};
