import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {connect} from 'react-redux';
import {fetchRecentlyConsumedFoods} from '../../../redux/actions/recentlyConsumedFoodsActionCreator';
import {fetchDailyProgress} from '../../../redux/actions/dailyProgressActionCreator';
import {normalize} from '../../../utils/deviceScaling';
import api from '../../../services/api';
import ExitButton from './ExitButton';
import FFNumberBox from '../../forms/FFNumberBox';
import FFNarrowButton from '../../common/FFNarrowButton';
import FFErrorMessage from '../../forms/FFErrorMessage';
import propTypes from 'prop-types';

class DeleteFoodModal extends React.Component {
  static propTypes = {
    onClose: propTypes.func.isRequired,
    food: propTypes.object.isRequired,
  };

  state = {
    errorMessage: null,
  };
  delete = async () => {
    const {user, food} = this.props;
    try {
      const deleteUserFood = await api.deleteUserFood(user.id, food.userFoodId);
      // if submits, close window.
      if (deleteUserFood.status === 200) {
        this.props.dispatch(fetchRecentlyConsumedFoods(user.id));
        this.props.dispatch(fetchDailyProgress(user.id));
        return this.props.onClose();
      } else {
        const error = `userId: ${user.id} userFoodId: ${
          food.userFoodId
        } response status:${deleteUserFood.status.toString()} \n response message:${
          deleteUserFood.response
        }`;
        console.log(error);
      }
    } catch (error) {
      // log error to console.
      console.log(error);
    }
    // render error for user.
    this.setState({
      errorMessage:
        'Whoops! We were not able to delete your meal. Please check your internet connection and try again.',
    });
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
              <Text style={styles.text}>{food.name}</Text>
              <Text style={styles.text}>
                {`Servings Count: ${food.userFoodServingsCount}`}
              </Text>
              <FFErrorMessage errorMessage={this.state.errorMessage} />
              <FFNarrowButton
                onClick={this.delete}
                label="delete"
                style={styles.deleteButton}
                backgroundColor={styles.deleteButtonBackgroundColor}
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
    textAlign: 'center',
  },
  servingsContainer: {
    marginTop: '10%',
  },
  deleteButton: {
    marginTop: '5%',
    alignSelf: 'center',
  },
  deleteButtonBackgroundColor: {
    backgroundColor: '#cc3904',
  },
  numberbox: {
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(DeleteFoodModal);
