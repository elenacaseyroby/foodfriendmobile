import React from 'react';
import {Text, Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {normalize, getIosSwipeBarHeight} from '../../../utils/deviceScaling';
import activePath from './assets/path-icon-active.png';
import activeProgress from './assets/progress-icon-active.png';
import activeFood from './assets/food-icon-active.png';
import activeAccount from './assets/account-icon-active.png';
import path from './assets/path-icon-passive.png';
import progress from './assets/progress-icon-passive.png';
import food from './assets/food-icon-passive.png';
import account from './assets/account-icon-passive.png';
import plus from './assets/plus-icon.png';

import propTypes from 'prop-types';

class NavBar extends React.Component {
  static propTypes = {
    updateActiveScreen: propTypes.func.isRequired,
    // activeScreen: 'path', 'progress', 'journal', 'food', or 'account'
    activeScreen: propTypes.string.isRequired,
  };
  // state = {
  //   activeScreen: this.props.activeScreen || 'path',
  // };
  // updateActiveScreen = (screenName) => {
  //   this.setState({activeScreen: screenName});
  //   this.props.updateActiveScreen(screenName);
  // };
  handleClickAdd = () => {};
  render() {
    return (
      <>
        <View style={styles.navBarContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                this.props.updateActiveScreen('path');
              }}>
              <Image
                source={this.props.activeScreen === 'path' ? activePath : path}
                style={styles.path}
              />
              <Text
                style={[
                  styles.text,
                  this.props.activeScreen === 'path'
                    ? styles.activeText
                    : styles.passiveText,
                ]}>
                Path
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                this.props.updateActiveScreen('progress');
              }}>
              <Image
                source={
                  this.props.activeScreen === 'progress'
                    ? activeProgress
                    : progress
                }
                style={styles.progress}
              />
              <Text
                style={[
                  styles.text,
                  this.props.activeScreen === 'progress'
                    ? styles.activeText
                    : styles.passiveText,
                ]}>
                Progress
              </Text>
            </TouchableOpacity>
            <View style={styles.addContainer}>
              <View style={styles.grayCircle}>
                <TouchableOpacity
                  style={styles.blueCircle}
                  onPress={() => {
                    this.props.updateActiveScreen('journal');
                  }}>
                  <Image source={plus} style={styles.plusIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                this.props.updateActiveScreen('food');
              }}>
              <Image
                source={this.props.activeScreen === 'food' ? activeFood : food}
                style={styles.food}
              />
              <Text
                style={[
                  styles.text,
                  this.props.activeScreen === 'food'
                    ? styles.activeText
                    : styles.passiveText,
                ]}>
                Food
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                this.props.updateActiveScreen('account');
              }}>
              <Image
                source={
                  this.props.activeScreen === 'account'
                    ? activeAccount
                    : account
                }
                style={styles.account}
              />
              <Text
                style={[
                  styles.text,
                  this.props.activeScreen === 'account'
                    ? styles.activeText
                    : styles.passiveText,
                ]}>
                Account
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.swipeBarPlaceholder} />
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
  path: {
    alignSelf: 'center',
    width: undefined,
    height: normalize(25),
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
  },
  progress: {
    alignSelf: 'center',
    width: undefined,
    height: normalize(25),
    // aspectRatio: width / height,
    aspectRatio: 21 / 22,
  },
  addContainer: {
    height: normalize(95),
    width: normalize(77),
    // borderWidth: 0.5,
    // borderColor: 'blue',
  },
  grayCircle: {
    alignSelf: 'center',
    width: undefined,
    height: normalize(75),
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
    borderRadius: normalize(100 / 2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e4e2e2',
    // opacity: 0.9,
  },
  blueCircle: {
    width: undefined,
    height: normalize(50),
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
    borderRadius: normalize(100 / 2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5f7ec6',
    // opacity: 1.0,
  },
  plusIcon: {
    width: undefined,
    height: normalize(23),
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
  },
  food: {
    alignSelf: 'center',
    width: undefined,
    height: normalize(25),
    // aspectRatio: width / height,
    aspectRatio: 19 / 22,
  },
  account: {
    alignSelf: 'center',
    width: undefined,
    height: normalize(25),
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
  },
  swipeBarPlaceholder: {
    width: '100%',
    height: getIosSwipeBarHeight(),
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: normalize(65),
  },
  navBarContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#ffffff',
    borderColor: '#e4e2e2',
    borderWidth: normalize(1),
  },
});

export default NavBar;
