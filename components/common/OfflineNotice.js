import React from 'react';
import {Text} from 'react-native';

class OfflineNotice extends React.Component {
  render() {
    return (
      <Text>No internet connection detected. Please check your settings.</Text>
    );
  }
}

export default OfflineNotice;
