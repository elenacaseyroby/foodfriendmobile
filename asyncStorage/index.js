import AsyncStorage from '@react-native-community/async-storage';

// BE CAREFUL CHANGING THESE OUTPUTS.
// IF YOU DO, THINGS WILL BREAK ALL OVER APP
// BUT TESTS WILL STILL PASS.
export default {
  async _storeData(key, value) {
    // output 'success' or undefined
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return 'success';
    } catch (error) {
      console.log(error);
      console.log('Failed to save the data to the storage');
      return;
    }
  },
  async _retrieveData(key) {
    // output 'success' or undefined
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
    // output 'success' or undefined
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
