import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class RecipeCard extends React.Component {
  static propTypes = {
    recipe: propTypes.object.isRequired,
    recipeKey: propTypes.string.isRequired,
    style: propTypes.object,
  };
  render() {
    const {recipe, style, recipeKey} = this.props;
    const urlRoot = 'https://foodfriendapp.s3.us-east-2.amazonaws.com/recipes/';
    return (
      <View key={recipeKey} style={[styles.recipeCardContainer, style]}>
        <Image
          style={styles.image}
          source={{uri: `${urlRoot}${recipe.imagePath}`}}
        />
        <View>
          <Text>{recipe.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recipeCardContainer: {
    backgroundColor: '#ffffff',
    width: normalize(300),
    borderColor: '#d0d0d0',
    borderWidth: normalize(1),
    flexDirection: 'row',
  },
  image: {
    alignSelf: 'center',
    width: normalize(140),
    height: normalize(159),
    resizeMode: 'cover',
  },
});

export default RecipeCard;
