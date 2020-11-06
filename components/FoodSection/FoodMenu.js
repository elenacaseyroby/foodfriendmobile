import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';

import propTypes from 'prop-types';

class FoodMenu extends React.Component {
  static propTypes = {
    updateActiveScreen: propTypes.func.isRequired,
    // activeScreen: 'nutrientFoods', 'recipes'
    activeScreen: propTypes.string.isRequired,
  };
  render() {
    return (
      <>
        <View style={styles.menuContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                this.props.activeScreen === 'recipes'
                  ? styles.activeButton
                  : styles.passiveButton,
              ]}
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
                Recipes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                this.props.activeScreen === 'nutrientFoods'
                  ? styles.activeButton
                  : styles.passiveButton,
              ]}
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
                Food
              </Text>
            </TouchableOpacity>
            {/* add new touchable menu item here and update styles.button.width */}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    // width: iPhone 8 width / number of menu items
    // remember to change the diviser if you add
    // a new menu item
    width: normalize(375 / 2),
    borderBottomWidth: normalize(4),
    height: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    borderBottomColor: '#cc3904',
  },
  passiveButton: {
    borderBottomColor: '#d9d9d9',
  },
  activeText: {
    fontFamily: 'Cabin-Bold',
    color: '#cc3904',
  },
  passiveText: {
    fontFamily: 'Cabin-Regular',
    color: '#555555',
  },
  text: {
    fontSize: normalize(16),
  },
  buttonContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  menuContainer: {
    backgroundColor: '#ffffff',
  },
});

export default FoodMenu;
