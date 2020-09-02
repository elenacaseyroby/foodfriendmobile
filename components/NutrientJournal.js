import React from 'react';
import {StyleSheet, Modal, TouchableOpacity, Image, View} from 'react-native';
import {normalize, getIosStatusBarHeight} from '../utils/deviceScaling';
import propTypes from 'prop-types';

class NutrientJournal extends React.Component {
  static propTypes = {
    isVisible: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
  };
  render() {
    return (
      <Modal
        animationType="swipe"
        transparent={false}
        visible={this.props.isVisible}></Modal>
    );
  }
}

const styles = StyleSheet.create({});

export default NutrientJournal;
