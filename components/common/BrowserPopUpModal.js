import React from 'react';
import {StyleSheet, Modal, TouchableOpacity, Image, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {normalize, getIosStatusBarHeight} from '../../utils/deviceScaling';
import closeIcon from '../../assets/images/close-icon.png';
import propTypes from 'prop-types';

class BrowserPopUpModal extends React.Component {
  static propTypes = {
    uri: propTypes.string.isRequired,
    isVisible: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
  };
  render() {
    return (
      <Modal
        animationType="swipe"
        transparent={false}
        visible={this.props.isVisible}>
        <View style={styles.browserContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.props.onClose}>
            <Image style={styles.closeIcon} source={closeIcon} />
          </TouchableOpacity>
          <WebView style={styles.browser} source={{uri: this.props.uri}} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  closeButton: {
    marginTop: getIosStatusBarHeight() + normalize(2),
    marginRight: '2%',
    alignSelf: 'flex-end',
  },
  closeIcon: {
    width: normalize(15),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 32 / 31,
  },
  browserContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  browser: {
    margin: '2%',
    maxHeight: '98%',
    width: normalize(365),
    bottom: 0,
    // borderRadius: normalize(28.5),
    // borderColor: '#555555',
    // borderWidth: 0.5,
  },
});

export default BrowserPopUpModal;
