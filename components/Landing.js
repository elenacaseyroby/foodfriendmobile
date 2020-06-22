import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import logo from '../assets/images/launch-logo.png';
import asyncStorage from '../services/asyncStorage';

class Landing extends React.Component {
  componentDidMount = async () => {
    // To test clear data:
    // const cleared = await asyncStorage._clearData();
    // if (cleared) return;

    const accessToken = await asyncStorage._retrieveData('ACCESS_TOKEN');
    const userId = await asyncStorage._retrieveData('USER_ID');
    // try to load user data w redux.
    this.timeoutHandle = setTimeout(() => {
      if (!accessToken || !userId)
        return this.props.navigation.navigate('Login');
      return this.props.navigation.navigate('Home');
    }, 3000);
    return;
  };
  componentWillUnmount() {
    // This is just necessary in the case that the screen is closed
    // before the timeout fires, otherwise it would cause a memory
    // leak that would trigger the transition regardless, breaking
    // the user experience.
    clearTimeout(this.timeoutHandle);
  }
  render() {
    return (
      <View style={styles.rectangle}>
        <Image source={logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {},
  rectangle: {
    backgroundColor: '#1f641e',
    minHeight: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Landing;
