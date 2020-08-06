import React from 'react';
import {Text} from 'react-native';

class NoConnectionScreen extends React.Component {
  render() {
    return (
      <Text>No internet connection detected. Please check your settings.</Text>
    );
  }
}

export default NoConnectionScreen;
