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

// if theme is added, must update in orderNutrientsByTheme function.
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
    selected: propTypes.bool,
  };
  renderAddNutrientButton(nutrient) {
    if (!this.props.displayAddNutrientButton) return;
    return (
      <View style={styles.addButtonContainer}>
        <AddButton
          style={styles.addButton}
          showCheckmark={this.props.selected}
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
    nutrient.benefits.map((benefit, index) => {
      const roughCharacterLimit = 70;
      // If benefits exceed characterLimit, don't add more.
      if (benefitsText.length >= roughCharacterLimit) return;
      benefitsText = benefitsText + benefit.name.toLowerCase();
      // If has not reached character limit and there are still more benefits to add, append comma.
      if (
        benefitsText.length < roughCharacterLimit &&
        nutrient.benefits.length > index + 1
      ) {
        benefitsText = benefitsText + ', ';
      }
      // Append '...' if character limit is reached and there are still more benefits to add.
      if (
        benefitsText.length >= roughCharacterLimit &&
        nutrient.benefits.length > index + 1
      ) {
        benefitsText = benefitsText + '...';
      }
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
              <Text style={styles.benefitsLabel}>Benefits the following:</Text>
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
    width: normalize(50),
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
