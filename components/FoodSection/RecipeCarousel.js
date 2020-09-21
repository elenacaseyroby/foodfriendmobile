import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
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
      <View style={[styles.menuContainer, style]}>
        <ScrollView
          horizontal={true}
          // contentContainerStyle={{
          //   ...styles.scrollView,
          //   width: `100%`,
          // }}
          showsHorizontalScrollIndicator={false}>
          {recipes.map((recipe) => {
            // return <Text>{recipe.name}</Text>;
            return (
              <View style={styles.card}>
                <RecipeCard
                  recipeKey={`${nutrientId}${recipe.id}`}
                  recipe={recipe}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuContainer: {
    width: '100%',
  },
  // card: {
  //   marginRight: '4%',
  // },
});

export default RecipeCarousel;
