import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import RecipeCarousel from './RecipeCarousel';
import {normalize} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class Recipes extends React.Component {
  static propTypes = {
    nutrients: propTypes.array.isRequired,
    // userRecipes: propTypes.array.isRequired,
  };
  // Immediately bugs out when this is called...
  renderNutrientRecipeCarousels = () => {
    const {nutrients} = this.props;
    return nutrients.map((nutrient) => {
      return (
        <>
          <Text style={styles.sectionHeader}>{nutrient.name}</Text>
          <RecipeCarousel
            nutrientId={nutrient.id}
            recipes={nutrient.recipes || []}
          />
        </>
      );
    });
  };
  render() {
    return (
      <ScrollView style={styles.menuContainer}>
        {this.renderNutrientRecipeCarousels()}
        <View style={styles.navBarWhiteSpace} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: '#f9f9f9',
  },
  sectionHeader: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#555555',
    marginTop: '4%',
    marginBottom: '2%',
  },
  navBarWhiteSpace: {
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: normalize(380),
  },
});

export default Recipes;
