import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BrowserPopUpModal from '../common/BrowserPopUpModal';
import {normalize} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class RecipeCard extends React.Component {
  static propTypes = {
    recipe: propTypes.object.isRequired,
    recipeKey: propTypes.string.isRequired,
    style: propTypes.object,
  };
  state = {
    displayBrowser: false,
  };
  render() {
    const {recipe, style, recipeKey} = this.props;
    const urlRoot = 'https://foodfriendapp.s3.us-east-2.amazonaws.com/recipes/';
    return (
      <View key={recipeKey} style={[styles.recipeCardContainer, style]}>
        <View style={[styles.imagePlaceholder, styles.imageDims]} />
        <TouchableOpacity
          onPress={() => {
            this.setState({displayBrowser: true});
          }}>
          <Image
            style={[styles.image, styles.imageDims]}
            source={{uri: `${urlRoot}${recipe.imagePath}`}}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.reportLinkText}>Report Broken Link</Text>
          </TouchableOpacity>
          <Text style={styles.recipeNameText}>{recipe.name}</Text>
          <Text style={styles.trackableFoodsText}>
            Trackable Foods:{'\n'}
            {recipe.trackableFoods}
          </Text>
          <TouchableOpacity
            style={styles.sourceNoteContainer}
            onPress={() => {
              this.setState({displayBrowser: true});
            }}>
            <Text style={styles.sourceNote}>{recipe.sourceNote}</Text>
          </TouchableOpacity>
        </View>
        <BrowserPopUpModal
          uri={recipe.url}
          isVisible={this.state.displayBrowser}
          onClose={() => this.setState({displayBrowser: false})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageDims: {
    width: normalize(135),
    height: '100%',
  },
  imagePlaceholder: {
    backgroundColor: '#cc3904',
    position: 'absolute',
  },
  recipeCardContainer: {
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    width: normalize(300),
    height: normalize(175),
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
  textContainer: {
    padding: '4%',
    height: '100%',
    width: normalize(165),
    justifyContent: 'space-between',
  },
  reportLinkText: {
    alignSelf: 'flex-end',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(12),
    color: '#ff7547',
  },
  recipeNameText: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(15),
    color: '#555555',
    // marginTop: '7%',
  },
  trackableFoodsText: {
    // marginTop: '7%',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(12),
    color: '#a5a5a5',
  },
  sourceNoteContainer: {
    // position: 'absolute',
    // marginLeft: '8%',
    // bottom: '10%',
  },
  sourceNote: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(12),
    color: '#cc3904',
  },
});

export default RecipeCard;
