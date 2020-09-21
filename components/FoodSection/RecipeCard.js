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
        <View style={[styles.imagePlaceholder, styles.imageDims]} />
        <Image
          style={[styles.image, styles.imageDims]}
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
  imageDims: {
    width: normalize(140),
    height: normalize(159),
  },
  imagePlaceholder: {
    backgroundColor: '#d9d9d9',
    position: 'absolute',
  },
  recipeCardContainer: {
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    width: normalize(300),
    height: normalize(159),
    borderColor: '#d0d0d0',
    borderWidth: normalize(1),
    flexDirection: 'row',
    borderRadius: normalize(9),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    alignSelf: 'center',

    resizeMode: 'cover',
  },
});

export default RecipeCard;
