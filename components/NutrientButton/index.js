import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import propTypes from 'prop-types';
import ArrowButton from './ArrowButton';
import AddButton from './AddButton';
import theme1 from './assets/bar-theme1.png';
import theme2 from './assets/bar-theme2.png';
import theme3 from './assets/bar-theme3.png';
import theme4 from './assets/bar-theme4.png';
import theme5 from './assets/bar-theme5.png';

const barThemes = {
  1: theme1, // blue
  2: theme2, // green
  3: theme3, // orange
  4: theme4, // yellow
  5: theme5, // red
};

class NutrientButton extends React.Component {
  static propTypes = {
    style: propTypes.object,
    nutrient: propTypes.object,
    displayAddNutrientButton: propTypes.bool,
    onAddNutrientClick: propTypes.func,
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
    const barTheme = barThemes[nutrient.themeId];
    let benefitsText = '';
    let counter = 1;
    const firstFewBenefits = nutrient.benefits.slice(0, 8);
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
              <Image style={styles.buttonBar} source={barTheme} />
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
            /*nav to nutrient page and pass nutrient in*/
          }}
        />
        <Image
          style={styles.icon}
          source={{
            uri: nutrient.iconPath,
          }}
        />
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
