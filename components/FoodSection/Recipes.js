import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import RecipeCarousel from './RecipeCarousel';
import Loader from '../common/Loader';
import {normalize} from '../../utils/deviceScaling';
import orderBy from 'lodash/orderBy';

class Recipes extends React.Component {
  renderNutrientRecipeCarousels = () => {
    const {activePathRecipes, userRecipes} = this.props;
    if (!activePathRecipes.list) return <></>;
    if (userRecipes.list === null) return <></>;
    const savedRecipeIds = userRecipes.list.map((recipe) => {
      return recipe.id;
    });
    return activePathRecipes.list.map((nutrient) => {
      // show newest recipes first.
      const nutrientRecipesNewestFirst = orderBy(
        nutrient.recipes,
        ['createdAt'],
        ['desc'],
      );
      return (
        <View key={`recipeCarousel-${nutrient.name}`}>
          <Text style={styles.sectionHeader}>{nutrient.name}</Text>
          <RecipeCarousel
            savedRecipeIds={savedRecipeIds}
            nutrientId={nutrient.id}
            recipes={nutrientRecipesNewestFirst}
          />
        </View>
      );
    });
  };
  renderUserRecipeCarousel = () => {
    const {userRecipes} = this.props;
    if (userRecipes.list === null) return <> </>;
    // order recipes by most recently saved first.
    const userRecipesNewestFirst = orderBy(
      userRecipes.list,
      ['UserRecipe.createdAt'],
      ['desc'],
    );
    const savedRecipeIds = userRecipesNewestFirst.map((recipe) => {
      return recipe.id;
    });
    return (
      <>
        {userRecipesNewestFirst.length > 0 ? (
          <Text style={styles.sectionHeader}>Your Saved Recipes</Text>
        ) : (
          <></>
        )}
        <RecipeCarousel
          savedRecipeIds={savedRecipeIds}
          nutrientId={0}
          recipes={userRecipesNewestFirst}
        />
      </>
    );
  };
  renderLoader() {
    return (
      <View style={styles.loader}>
        <Loader />
      </View>
    );
  }
  render() {
    const {userRecipes, activePathRecipes} = this.props;
    if (
      userRecipes &&
      activePathRecipes &&
      !activePathRecipes.list &&
      !userRecipes.list
    )
      return this.renderLoader();
    return (
      <ScrollView style={styles.container}>
        {this.renderUserRecipeCarousel()}
        {this.renderNutrientRecipeCarousels()}
        <View style={styles.navBarWhiteSpace} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    width: '100%',
    height: '50%',
  },
  container: {
    backgroundColor: '#f9f9f9',
    minHeight: normalize(350),
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
