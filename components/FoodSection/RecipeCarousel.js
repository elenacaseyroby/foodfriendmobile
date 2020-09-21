import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ParallaxImage from 'react-native-snap-carousel';
import RecipeCard from './RecipeCard';
import {normalize} from '../../utils/deviceScaling';

import propTypes from 'prop-types';

class RecipeCarousel extends React.Component {
  static propTypes = {
    nutrientId: propTypes.number.isRequired,
    recipes: propTypes.array.isRequired,
    style: propTypes.object,
  };
  renderRecipeCard = (item) => {
    const recipe = item.item;
    return (
      <View style={styles.card}>
        <RecipeCard recipe={recipe} />
      </View>
    );
  };
  render() {
    const {recipes, style, nutrientId} = this.props;
    const recipeCardWidth = normalize(300);
    const cardMarginRight = 0;
    const recipeWidth = recipeCardWidth + cardMarginRight;
    return (
      <View style={[styles.menuContainer, style]}>
        <ParallaxImage
          ref={(c) => {
            this._carousel = c;
          }}
          data={recipes}
          renderItem={this.renderRecipeCard}
          sliderWidth={normalize(375)}
          itemWidth={recipeWidth}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuContainer: {
    width: '100%',
  },
  // card: {
  //   marginRight: noramlize(10),
  // },
});

export default RecipeCarousel;
