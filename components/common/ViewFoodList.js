import React from 'react';
import propTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import orderBy from 'lodash/orderBy';

class ViewFoodList extends React.Component {
  static propTypes = {
    foods: propTypes.array.isRequired,
  };
  getFoodDescription(food) {
    let foodDescription = food.name;
    if (food.servingSize) {
      foodDescription = `${food.name}  Serving Size: ${food.servingSize}`;
    }
    return foodDescription;
  }
  getPercentDv(food) {
    const percent = food.NutrientFood.percentDvPerServing;
    const percentDv = parseInt(percent * 100).toString() + '%';
    return percentDv;
  }
  renderRow(food) {
    const foodDescription = this.getFoodDescription(food);
    const percentDv = this.getPercentDv(food);
    return (
      <View key={food.id}>
        <View style={styles.foodRow}>
          <Text style={[styles.foodDescription, styles.foodBody]}>
            {foodDescription}
          </Text>
          <Text style={[styles.percentDv, styles.foodBody]}>{percentDv}</Text>
        </View>
        <View style={styles.line} />
      </View>
    );
  }

  render() {
    const {foods} = this.props;
    // Order food from highest to lowest in nutrient.
    // permissions: ‘write’, ‘delete’, ‘read-only’
    const foodsToRender = orderBy(
      foods,
      ['NutrientFood.percentDvPerServing'],
      ['desc'],
    );
    return (
      <>
        <View key={0}>
          <View style={styles.foodRow}>
            <Text style={[styles.foodDescription, styles.foodHeader]}>
              Food
            </Text>
            <Text style={[styles.percentDv, styles.foodHeader]}>
              % of Daily Value Per Serving
            </Text>
          </View>
          <View style={styles.line} />
        </View>
        {foodsToRender.map((food) => {
          return this.renderRow(food);
        })}
      </>
    );
  }
}

const styles = StyleSheet.create({
  foodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: normalize(340),
    alignSelf: 'center',
    marginTop: '4%',
    marginBottom: '4%',
    fontSize: normalize(14),
  },
  foodBody: {
    fontFamily: 'Cabin-Regular',
    color: '#555555',
  },
  foodHeader: {
    fontFamily: 'Cabin-Bold',
    color: '#555555',
  },
});

export default ViewFoodList;
