import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import NutrientBar from '../common/NutrientBar';
import FoodTable from '../common/FoodTable';
import propTypes from 'prop-types';
import {normalize} from '../../utils/deviceScaling';

class NutrientUserFoodsCard extends React.Component {
  static propTypes = {
    nutrientName: propTypes.string.isRequired,
    foods: propTypes.array.isRequired,
    defaultIsExpanded: propTypes.bool.isRequired,
    nutrientBarBackgroundColor: propTypes.object.isRequired,
    style: propTypes.object.isRequired,
  };
  state = {
    isExpanded: this.props.defaultIsExpanded,
  };
  handleOnChange = (isExpanded) => {
    this.setState({isExpanded});
  };
  render() {
    const {nutrientName, foods, nutrientBarBackgroundColor, style} = this.props;
    const {isExpanded} = this.state;
    return (
      <View style={[styles.nutrientCard, style]}>
        <NutrientBar
          backgroundColor={nutrientBarBackgroundColor}
          label={nutrientName}
          isExpanded={isExpanded}
          onChange={this.handleOnChange}
        />
        {isExpanded ? (
          <FoodTable
            keyPrefix={`nutrientMeal-${nutrientName}`}
            foods={foods}
            permissions="delete"
          />
        ) : (
          <></>
        )}
        <View style={styles.descriptionTextContainer}>
          <Text style={styles.descriptionText}>
            Foods added using the add food page (+) will appear here.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nutrientCard: {
    overflow: 'hidden',
    width: normalize(350),
    borderRadius: normalize(10),
    borderWidth: normalize(0.5),
    borderColor: '#7c828a',
  },
  descriptionTextContainer: {
    justifyContent: 'center',
    height: normalize(30),
    backgroundColor: '#f9f9f9',
  },
  descriptionText: {
    alignSelf: 'center',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(12),
    color: '#9e9e9e',
  },
});

export default NutrientUserFoodsCard;
