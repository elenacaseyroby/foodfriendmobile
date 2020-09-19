import React from 'react';
import {Text, Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';

import propTypes from 'prop-types';

class FoodMenu extends React.Component {
  static propTypes = {
    updateActiveScreen: propTypes.func.isRequired,
    // activeScreen: 'nutrientFoods', 'recipes
    activeScreen: propTypes.string.isRequired,
  };
  handleClickAdd = () => {};
  render() {
    return (
      <>
        <View style={styles.menuContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                this.props.updateActiveScreen('nutrientFoods');
              }}>
              <Text
                style={[
                  styles.text,
                  this.props.activeScreen === 'nutrientFoods'
                    ? styles.activeText
                    : styles.passiveText,
                ]}>
                Path
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                this.props.updateActiveScreen('recipes');
              }}>
              <Text
                style={[
                  styles.text,
                  this.props.activeScreen === 'recipes'
                    ? styles.activeText
                    : styles.passiveText,
                ]}>
                Progress
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  iconButton: {
    height: normalize(45),
    padding: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: normalize(50),
  },
  activeText: {
    color: '#5f7ec6',
  },
  passiveText: {
    color: '#a5a5a5',
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(13),
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: normalize(65),
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#e4e2e2',
    borderWidth: normalize(1),
  },
});

export default FoodMenu;
