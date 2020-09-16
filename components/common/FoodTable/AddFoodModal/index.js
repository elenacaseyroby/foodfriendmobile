import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {connect} from 'react-redux';
import {normalize} from '../../../../utils/deviceScaling';
import ExitButton from './ExitButton';
import FFNumberBox from '../../../forms/FFNumberBox';
import FFNarrowButton from '../../../common/FFNarrowButton';
import propTypes from 'prop-types';

class AddFoodModal extends React.Component {
  static propTypes = {
    onClose: propTypes.func.isRequired,
    food: propTypes.object,
  };
  state = {
    servingsCount: 0.5,
  };
  submit = () => {
    // submit using premade fun
    this.props.onClose();
  };
  handleServingsConsumed = (servingsCount) => {
    this.setState({servingsCount: servingsCount});
  };
  render() {
    const {food} = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isVisible}>
        <View style={styles.screen}>
          <View style={styles.backgroundColor} />
          <View style={styles.modalContainer}>
            <View style={styles.container}>
              <Text style={styles.text}>
                {food.name}
                {food.servingsNote ? `Serving size: ${food.servingsNote}` : ''}
              </Text>
              <Text style={[styles.text, styles.servingsContainer]}>
                Servings consumed:
              </Text>
              <FFNumberBox
                initialValue={1}
                iterateBy={0.5}
                onChange={this.handleServingsConsumed}
                style={styles.numberbox}
              />
              <FFNarrowButton
                onClick={this.submit}
                label="add"
                style={styles.addButton}
              />
            </View>
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
    padding: '10%',
    backgroundColor: '#ffffff',
    width: normalize(250),
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
  text: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    alignSelf: 'center',
  },
  servingsContainer: {
    marginTop: '10%',
  },
  addButton: {
    alignSelf: 'center',
  },
  numberbox: {
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AddFoodModal);
