import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import RecipeCard from './RecipeCard';
import {normalize} from '../../utils/deviceScaling';

import propTypes from 'prop-types';

class RecipeCarousel extends React.Component {
  static propTypes = {
    nutrientId: propTypes.number.isRequired,
    recipes: propTypes.array.isRequired,
    style: propTypes.object,
  };
  render() {
    const {recipes, style, nutrientId} = this.props;
    return (
      <ScrollView horizontal={true} style={[styles.menuContainer, style]}>
        {recipes.map((recipe) => {
          // return <Text>{recipe.name}</Text>;
          return (
            <RecipeCard
              recipeKey={`${nutrientId}${recipe.id}`}
              recipe={recipe}
              style={styles.card}
            />
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {},
});

export default RecipeCarousel;
