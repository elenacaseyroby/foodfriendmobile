import React from 'react';
import {StyleSheet, ScrollView, Image, View, Text} from 'react-native';
import {connect} from 'react-redux';
import FoodMenu from './FoodMenu';
import OfflineNotificationBanner from '../common/OfflineNotificationBanner';
import ViewNutrientFoodsList from './ViewNutrientFoodsList';
import Recipes from './Recipes';
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
      return this.renderNutrientFoodsScreen();
    if (this.state.activeScreen === 'recipes')
      return <Recipes nutrients={this.props.user.activePath.nutrients} />;
  };
  renderNutrientFoodsScreen = () => {
    const {user} = this.props;
    if (!user && !user.activePath) return;
    if (!this.props.nutrients) return;
    const nutrients = this.props.nutrients.list;
    // get list of ids for nutrients in path.
    const pathNutrientIds = user.activePath.nutrients.map((nutrient) => {
      return nutrient.id;
    });
    // Expand only first nutrient.
    let nutrientHasBeenExpanded = false;
    return (
      <ScrollView>
        {nutrients.map((nutrient) => {
          if (!pathNutrientIds.includes(nutrient.id)) return <></>;
          const defaultIsExpanded = !nutrientHasBeenExpanded;
          nutrientHasBeenExpanded = true;
          return (
            <ViewNutrientFoodsList
              nutrient={nutrient}
              defaultIsExpanded={defaultIsExpanded}
            />
          );
        })}
        <View style={styles.navBarWhiteSpace} />
      </ScrollView>
    );
  };
  render() {
    return (
      <View style={styles.foodSectionContainer}>
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
  navBarWhiteSpace: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: normalize(380),
  },
  foodSectionContainer: {
    backgroundColor: '#ffffff',
    minHeight: '100%',
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  nutrients: state.nutrients,
});

export default connect(mapStateToProps)(FoodSection);
