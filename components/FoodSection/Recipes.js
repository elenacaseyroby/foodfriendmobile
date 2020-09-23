import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
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
  renderUserRecipeCarousel = () => {
    const {userRecipes} = this.props;
    console.log('////////////////////');
    console.log(JSON.stringify(userRecipes));
    return (
      <>
        <Text style={styles.sectionHeader}>Your Saved Recipes</Text>
        <RecipeCarousel nutrientId={0} recipes={userRecipes.list || []} />
      </>
    );
  };
  render() {
    return (
      <ScrollView style={styles.menuContainer}>
        {this.renderUserRecipeCarousel()}
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
    marginTop: '5%',
    marginBottom: '2%',
    marginLeft: normalize(40),
  },
  navBarWhiteSpace: {
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: normalize(380),
  },
});

const mapStateToProps = (state) => ({
  userRecipes: state.userRecipes,
});

export default connect(mapStateToProps)(Recipes);
