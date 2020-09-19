import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import FoodMenu from './FoodMenu';
import OfflineNotificationBanner from '../common/OfflineNotificationBanner';
import FFStatusBar from '../common/FFStatusBar';
import groceryPile from './assets/grocery-pile.png';
import {normalize} from '../../utils/deviceScaling';

class FoodSection extends React.Component {
  state = {
    activeScreen: 'nutrientFoods',
  };
  updateActiveScreen = (screenName) => {
    this.setState({activeScreen: screenName});
  };
  renderActiveScreen = () => {
    // do not allow user to access the following pages without selecting a path.
    if (this.state.activeScreen === 'nutrientFoods')
      return <Text> Nutrient Foods </Text>;
    if (this.state.activeScreen === 'recipes')
      return <Text>Food and Recipes</Text>;
  };
  render() {
    return (
      <View>
        <FFStatusBar />
        <OfflineNotificationBanner />
        <View style={styles.header}>
          <Image source={groceryPile} style={styles.groceryPile} />
        </View>
        <FoodMenu
          updateActiveScreen={this.updateActiveScreen}
          activeScreen={this.state.activeScreen}
        />
        {this.renderActiveScreen()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#cc3904',
    width: '100%',
    height: normalize(190),
    justifyContent: 'center',
    alignItems: 'center',
  },
  groceryPile: {
    width: normalize(354),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 354 / 154,
  },
});

export default FoodSection;
