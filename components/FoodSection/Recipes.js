import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import RecipeCarousel from './RecipeCarousel';
import {normalize} from '../../utils/deviceScaling';

class Recipes extends React.Component {
  renderNutrientRecipeCarousels = () => {
    const {activePathRecipes, userRecipes} = this.props;
    if (!activePathRecipes.list) return <></>;
    if (userRecipes.list === null) return <></>;
    const savedRecipeIds = userRecipes.list.map((recipe) => {
      return recipe.id;
    });
    return activePathRecipes.list.map((nutrient) => {
      return (
        <>
          <Text style={styles.sectionHeader}>{nutrient.name}</Text>
          <RecipeCarousel
            savedRecipeIds={savedRecipeIds}
            nutrientId={nutrient.id}
            recipes={nutrient.recipes || []}
          />
        </>
      );
    });
  };
  renderUserRecipeCarousel = () => {
    const {userRecipes} = this.props;
    if (userRecipes.list === null) return <></>;
    const savedRecipeIds = userRecipes.list.map((recipe) => {
      return recipe.id;
    });
    console.log('render user carousel');
    console.log(savedRecipeIds);
    return (
      <>
        <Text style={styles.sectionHeader}>Your Saved Recipes</Text>
        <RecipeCarousel
          savedRecipeIds={savedRecipeIds}
          nutrientId={0}
          recipes={userRecipes.list || []}
        />
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
  activePathRecipes: state.activePathRecipes,
});

export default connect(mapStateToProps)(Recipes);
