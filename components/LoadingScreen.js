import React from 'react';
import {Text} from 'react-native';
import {isNetworkAvailable} from '../utils/deviceStatus';

class LoadingScreen extends React.Component {
  state = {
    isConnected: true,
  };
  renderOfflineScreen() {
    return (
      <Text>No internet connection detected. Please check your settings.</Text>
    );
  }
  renderLoadingScreen() {
    return <Text>Loading...</Text>;
  }
  getConnection = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected !== this.state.isConnected) {
      this.setState({isConnected: isConnected});
    }
  };
  render() {
    this.getConnection();
    if (this.state.isConnected) return this.renderLoadingScreen();
    return this.renderOfflineScreen();
  }
}

export default LoadingScreen;
