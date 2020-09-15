import React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {connect} from 'react-redux';
import {normalize} from '../../../../utils/deviceScaling';
import ExitButton from './ExitButton';
import propTypes from 'prop-types';

class AddFoodModal extends React.Component {
  static propTypes = {
    visible: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    food: propTypes.obj,
  };
  state = {};
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isVisible}>
        <View style={styles.screen}>
          <View style={styles.backgroundColor} />
          <View style={styles.modalContainer}>
            <View style={styles.container}></View>
            <ExitButton
              onPress={this.props.onClose}
              style={styles.exitButton}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  backgroundColor: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
    opacity: 0.25,
  },
  screen: {
    position: 'relative',
    minHeight: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#ffffff',
    height: normalize(200),
    width: normalize(300),
    borderRadius: 100 / 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    elevation: 3,
  },
  exitButton: {
    position: 'absolute',
    marginTop: normalize(-10),
    right: normalize(-7),
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AddFoodModal);
