import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {normalize} from '../../../utils/deviceScaling';
import propTypes from 'prop-types';
import ArrowButton from './ArrowButton';
import AddButton from './AddButton';
import blueBar from './assets/blue-bar.png';
import blueIcon from './assets/blue-icon.png';
import greenBar from './assets/green-bar.png';
import greenIcon from './assets/green-icon.png';
import orangeBar from './assets/orange-bar.png';
import orangeIcon from './assets/orange-icon.png';
import yellowBar from './assets/yellow-bar.png';
import yellowIcon from './assets/yellow-icon.png';
import redBar from './assets/red-bar.png';
import redIcon from './assets/red-icon.png';

// if theme is added, must update in Customize Path page.
const themes = {
  1: {
    bar: blueBar,
    icon: blueIcon,
  },
  2: {
    bar: greenBar,
    icon: greenIcon,
  },
  3: {
    bar: orangeBar,
    icon: orangeIcon,
  },
  4: {
    bar: yellowBar,
    icon: yellowIcon,
  },
  5: {
    bar: redBar,
    icon: redIcon,
  },
};

class NutrientButton extends React.Component {
  static propTypes = {
    style: propTypes.object,
    nutrient: propTypes.object,
    displayAddNutrientButton: propTypes.bool,
    onAddNutrientClick: propTypes.func,
    navigation: propTypes.object,
  };
  renderAddNutrientButton(nutrient) {
    if (!this.props.displayAddNutrientButton) return;
    return (
      <View style={styles.addButtonContainer}>
        <AddButton
          style={styles.addButton}
          onPress={() => {
            this.props.onAddNutrientClick(nutrient.id);
          }}
        />
      </View>
    );
  }
  render() {
    const {nutrient} = this.props;
    const theme = themes[nutrient.themeId];
    let benefitsText = '';
    let counter = 1;
    const firstFewBenefits = nutrient.benefits.slice(0, 6);
    firstFewBenefits.map((benefit) => {
      benefitsText = benefitsText + benefit.name.toLowerCase();
      if (counter !== firstFewBenefits.length) {
        benefitsText = benefitsText + ', ';
      }
      if (counter === firstFewBenefits.length) {
        benefitsText = benefitsText + '...';
      }
      counter++;
    });
    return (
      <View style={[styles.buttonContainer, this.props.style]}>
        <View style={styles.buttonContentContainer}>
          <View style={styles.buttonHeaderContainer}>
            <View style={styles.barAndTextContainer}>
              <Image style={styles.buttonBar} source={theme.bar} />
              <Text style={styles.buttonHeaderText}>{nutrient.name}</Text>
            </View>
            <View style={styles.benefitsTextContainer}>
              <Text style={styles.benefitsLabel}>
                Benefits the following...
              </Text>
              <Text style={styles.benefitsText}>{benefitsText}</Text>
            </View>
          </View>
        </View>
        <ArrowButton
          style={styles.arrowButton}
          onPress={() => {
            this.props.navigation.navigate('Nutrient Detail', {
              nutrient: nutrient,
            });
          }}
        />
        {/*render blank icon under real icon so if internet fails, blank icon appears.*/}
        <View style={styles.icon}>
          <Image style={styles.icon} source={theme.icon} />
          <Image
            style={styles.icon}
            source={{
              uri: nutrient.iconPath,
            }}
          />
        </View>
        {this.renderAddNutrientButton(nutrient)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    width: normalize(360),
    height: normalize(130),
  },
  buttonContentContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    height: normalize(110),
    width: normalize(303),
    backgroundColor: '#ffffff',
  },
  barAndTextContainer: {
    justifyContent: 'center',
    width: normalize(315),
    height: normalize(45),
  },
  buttonHeaderText: {
    alignSelf: 'flex-end',
    width: normalize(170),
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(18),
    color: '#ffffff',
  },
  buttonBar: {
    marginTop: 0,
    alignSelf: 'flex-end',
    position: 'absolute',
    height: normalize(45),
    width: undefined,
    // aspectRatio: width / height,
    aspectRatio: 315 / 47,
  },
  benefitsTextContainer: {
    marginTop: '2%',
    alignSelf: 'flex-end',
    width: normalize(230),
    height: normalize(65),
  },
  benefitsLabel: {
    color: '#555555',
    fontFamily: 'Cabin-Bold',
    fontSize: normalize(12),
  },
  benefitsText: {
    color: '#555555',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(12),
  },
  arrowButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
    marginRight: '1.5%',
  },
  addButtonContainer: {
    height: '100%',
  },
  addButton: {
    top: '1%',
  },
  icon: {
    position: 'absolute',
    width: normalize(127),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
  },
});

export default NutrientButton;
