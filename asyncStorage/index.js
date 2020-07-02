import {AsyncStorage} from '@react-native-community/async-storage';

export default {
  async _storeData(key, value) {
    // output 'success' or null
    try {
      await AsyncStorage.setItem(key, value);
      return 'success';
    } catch (error) {
      console.log('Failed to save the data to the storage');
      return;
    }
  },
  async _retrieveData(key) {
    // output 'success' or null
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log('Failed to fetch the data from storage');
      return;
    }
  },
  async _clearData() {
    // output 'success' or null
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      return 'success';
    } catch (error) {
      console.error('Error clearing app data.');
      return;
    }
  },
};
