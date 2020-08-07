import React from 'react';
import {Text} from 'react-native';
// import {useNetInfo} from '@react-native-community/netinfo';

class LoadingScreen extends React.Component {
  renderOfflineScreen() {
    return (
      <Text>No internet connection detected. Please check your settings.</Text>
    );
  }
  renderLoadingScreen() {
    return <Text>Loading...</Text>;
  }
  render() {
    // const netInfo = useNetInfo();
    // if (netInfo.isInternetReachable()) return this.renderLoadingScreen();
    return this.renderOfflineScreen();
  }
}

export default LoadingScreen;
