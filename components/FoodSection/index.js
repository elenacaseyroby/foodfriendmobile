import React from 'react';
import {StyleSheet, ScrollView, Image, View, Text} from 'react-native';
import {connect} from 'react-redux';
import FoodMenu from './FoodMenu';
import ViewNutrientFoodsList from './ViewNutrientFoodsList';
import Recipes from './Recipes';
import FFStatusBar from '../common/FFStatusBar';
import Loader from '../common/Loader';
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
    if (this.state.activeScreen === 'nutrientFoods')
      return this.renderNutrientFoodsScreen();
    if (this.state.activeScreen === 'recipes') return <Recipes />;
  };
  renderLoader() {
    return (
      <View style={styles.loader}>
        <Loader />
      </View>
    );
  }
  renderNutrientFoodsScreen = () => {
    const {user, nutrients} = this.props;
    // if data hasn't loaded, render load page
    if (!user || (user && !user.activePath)) return this.renderLoader();
    if (!nutrients || (nutrients && !nutrients.list))
      return this.renderLoader();
    // get list of ids for nutrients in path.
    const pathNutrientIds = user.activePath.nutrients.map((nutrient) => {
      return nutrient.id;
    });
    // Expand only first nutrient.
    let nutrientHasBeenExpanded = false;
    return (
      <ScrollView>
        <View style={styles.whiteSpaceUnderMenu} />
        {nutrients.list.map((nutrient, index) => {
          if (!pathNutrientIds.includes(nutrient.id)) return;
          const defaultIsExpanded = !nutrientHasBeenExpanded;
          nutrientHasBeenExpanded = true;
          const key = `foodVwNutrientFoodTable-${index.toString()}`;
          return (
            <View key={key}>
              <ViewNutrientFoodsList
                nutrient={nutrient}
                defaultIsExpanded={defaultIsExpanded}
              />
            </View>
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
    aspectRatio: 361 / 158,
  },
  loader: {
    height: '50%',
    width: '100%',
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
  whiteSpaceUnderMenu: {
    backgroundColor: '#ffffff',
    height: normalize(10),
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  nutrients: state.nutrients,
});

export default connect(mapStateToProps)(FoodSection);
