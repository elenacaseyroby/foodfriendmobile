import React from 'react';
import {
  Alert,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchUserRecipes} from '../../redux/actions/userRecipesActionCreator';
import BrowserPopUpModal from '../common/BrowserPopUpModal';
import fullStar from './assets/full-star.png';
import emptyStar from './assets/empty-star.png';
import {normalize} from '../../utils/deviceScaling';
import api from '../../services/api';
import propTypes from 'prop-types';

class RecipeCard extends React.Component {
  static propTypes = {
    recipe: propTypes.object.isRequired,
    recipeKey: propTypes.string.isRequired,
  };
  state = {
    displayBrowser: false,
  };
  handleReportBrokenLink = () => {
    const {recipe} = this.props;
    Alert.alert(
      'Report Broken Link',
      `Are you sure you would like to report ${recipe.name}'s link as broken?`,
      [
        {
          text: 'Yes',
          onPress: this.reportBrokenLink,
        },
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {cancelable: true},
      ],
    );
  };
  reportBrokenLink = () => {
    const {user, recipe} = this.props;
    const reported = api.reportRecipeLink(user.id, recipe.id);
    if (reported) {
      //update activePath recipes
    }
  };
  handleLikeRecipe = () => {
    const {user, recipe} = this.props;
    const favorite = api.postUserRecipe(user.id, recipe.id);
    if (favorite) {
      this.props.dispatch(fetchUserRecipes(user.id));
    }
  };
  handleDislikeRecipe = () => {
    const {user, recipe} = this.props;
    const unfavorite = api.deleteUserRecipe(user.id, recipe.id);
    if (unfavorite) {
      this.props.dispatch(fetchUserRecipes(user.id));
    }
  };
  renderLikeButton = () => {
    return (
      <TouchableOpacity
        style={styles.starButton}
        onPress={this.handleLikeRecipe}>
        <Image source={emptyStar} style={styles.star} />
      </TouchableOpacity>
    );
  };
  renderDislikeButton = () => {
    return (
      <TouchableOpacity
        style={styles.starButton}
        onPress={this.handleDislikeRecipe}>
        <Image source={fullStar} style={styles.star} />
      </TouchableOpacity>
    );
  };
  renderReportRecipeLink = () => {
    if (this.props.recipe.isUnderReview) {
      return <Text style={styles.linkUnderReviewText}>Link Under Review</Text>;
    }
    return (
      <TouchableOpacity onPress={this.handleReportBrokenLink}>
        <Text style={styles.reportLinkText}>Report Broken Link</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const {recipe, recipeKey} = this.props;
    const urlRoot = 'https://foodfriendapp.s3.us-east-2.amazonaws.com/recipes/';
    return (
      <View key={recipeKey} style={styles.recipeCardContainer}>
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
          {this.renderReportRecipeLink()}
          <Text style={styles.recipeNameText}>{recipe.name}</Text>
          <Text style={styles.trackableFoodsText}>
            Contains:{'\n'}
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
        {this.renderLikeButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageDims: {
    width: normalize(135),
    height: '100%',
  },
  starButton: {
    position: 'absolute',
    marginTop: '2%',
    marginLeft: '2%',
  },
  star: {
    width: normalize(32),
    height: undefined,
    aspectRatio: 1 / 1,
  },
  imagePlaceholder: {
    backgroundColor: '#cc3904',
    position: 'absolute',
  },
  recipeCardContainer: {
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    // if you change the width you must update
    // onScroll function in carousel.
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
  linkUnderReviewText: {
    alignSelf: 'flex-end',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(12),
    color: '#5d80c1',
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

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(RecipeCard);
