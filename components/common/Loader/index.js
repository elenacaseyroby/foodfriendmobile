import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {isNetworkAvailable} from '../../../utils/deviceStatus';
import {normalize} from '../../../utils/deviceScaling';
import benny from '../../../assets/images/benny-white.png';
import LoaderAnimation from './LoaderAnimation';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      _isMounted: true,
    };
  }
  componentWillUnmount = () => {
    this.setState({_isMounted: false});
  };
  renderOfflineScreen() {
    return (
      <View style={styles.rectangle}>
        <View style={styles.bennyContainer}>
          <Text style={styles.ohNoText}>Oh no!</Text>
          <Image source={benny} style={styles.bennyImg} />
          <Text style={styles.noInternetText}>
            We can't detect an internet connection. Please check your settings
            and try restarting the app.
          </Text>
        </View>
      </View>
    );
  }
  renderLoadingScreen = () => {
    return <LoaderAnimation />;
  };
  getConnection = async () => {
    if (!this.state._isMounted) return;
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

const styles = StyleSheet.create({
  rectangle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  bennyContainer: {
    width: '80%',
  },
  ohNoText: {
    textAlign: 'center',
    width: '80%',
    fontFamily: 'Cabin-BoldItalic',
    fontSize: normalize(30),
    color: '#36549a',
  },
  noInternetText: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
    marginTop: '6%',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#36549a',
  },
  bennyImg: {
    alignSelf: 'center',
    width: normalize(150),
    height: undefined,
    aspectRatio: 400 / 521,
  },
});
