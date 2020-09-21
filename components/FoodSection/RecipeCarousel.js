import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import RecipeCard from './RecipeCard';
import {normalize} from '../../utils/deviceScaling';

import propTypes from 'prop-types';

class RecipeCarousel extends React.Component {
  static propTypes = {
    nutrientId: propTypes.number.isRequired,
    recipes: propTypes.array.isRequired,
    style: propTypes.object,
  };
  state = {
    currentIndex: 0,
    startIndex: 0,
    endIndex: 3,
  };
  keyExtractor = (item, index) => {
    return index.toString();
  };
  renderRecipeCard = (item) => {
    const recipe = item.item;
    return (
      <View style={styles.card}>
        <RecipeCard recipe={recipe} />
      </View>
    );
  };
  onScroll = (event) => {
    const {recipes} = this.props;
    const recipeCardWidth = normalize(300);
    const cardMarginRight = 0;
    const recipeWidth = recipeCardWidth + cardMarginRight;
    const index = parseInt(event.nativeEvent.contentOffset.x / recipeWidth);
    if (this.state.currentIndex !== index) {
      this.setState({
        currentIndex: index,
      });
    }
  };
  render() {
    const {recipes, style, nutrientId} = this.props;
    return (
      <View style={[styles.menuContainer, style]}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={this.keyExtractor}
          data={recipes}
          renderItem={this.renderRecipeCard}
          onScroll={this.onScroll}
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
