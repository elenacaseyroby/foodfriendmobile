import React from 'react';
import {
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {normalize, getIosStatusBarHeight} from '../../utils/deviceScaling';
import closeIcon from '../../assets/images/white-exit-icon.png';
import FFStatusBar from './FFStatusBar';
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
        <FFStatusBar
          backgroundColorStyle={{backgroundColor: '#36549a'}}
          barStyle="light-content"
        />
        <View style={styles.browserContainer}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={this.props.onClose}>
              <Image style={styles.closeIcon} source={closeIcon} />
            </TouchableOpacity>
          </View>
          <WebView style={styles.browser} source={{uri: this.props.uri}} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  whitePlaceholder: {
    width: '100%',
    height: normalize(50),
  },
  topBar: {
    opacity: 0.8,
    width: '100%',
    height: normalize(50),
    justifyContent: 'center',
    backgroundColor: '#36549a',
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  closeIcon: {
    width: normalize(15),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 32 / 31,
  },
  browserContainer: {
    height: '100%',
    width: '100%',
  },
  browser: {
    height: '100%',
    width: '100%',
  },
});

export default BrowserPopUpModal;
