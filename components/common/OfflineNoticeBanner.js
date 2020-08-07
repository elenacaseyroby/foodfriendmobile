import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import {statusBarHeight} from '../../utils/deviceScaling';
import NetInfo from '@react-native-community/netinfo';

class OfflineNoticeBanner extends React.Component {
  state = {
    isConnected: true,
  };
  componentDidMount() {
    NetInfo.addEventListener((state) => {
      this.setState({isConnected: state.isConnected});
    });
  }
  render() {
    if (this.state.isConnected) return <></>;
    return (
      <View style={styles.banner}>
        <Text style={[styles.text, styles.bold]}>
          Oh no! It looks like you’re offline.
        </Text>
        <Text style={[styles.text, styles.regular]}>
          Content will be limited until you reconnect.
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  banner: {
    marginTop: statusBarHeight + normalize(6),
    position: 'absolute',
    alignSelf: 'center',
    width: normalize(365),
    height: normalize(40),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  regular: {
    fontFamily: 'Cabin-Regular',
  },
  bold: {
    fontFamily: 'Cabin-Bold',
  },
  text: {
    textAlign: 'center',
    fontSize: normalize(12),
    color: '#ffffff',
  },
});

export default OfflineNoticeBanner;
