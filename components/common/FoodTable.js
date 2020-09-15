import React from 'react';
import propTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import orderBy from 'lodash/orderBy';

class FoodTable extends React.Component {
  static propTypes = {
    foods: propTypes.array.isRequired,
    // permissions: 'write', 'delete', 'read-only'
    permissions: propTypes.string.isRequired,
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
  renderColumnTwo(food) {
    if (this.props.permissions === 'read-only') {
      const percentDv = this.getPercentDv(food);
      return <Text style={styles.foodBody}>{percentDv}</Text>;
    } else if (this.props.permissions === 'write') {
    } else if (this.props.permissions === 'delete') {
    }
  }
  renderRow(food) {
    const foodDescription = this.getFoodDescription(food);
    return (
      <View key={food.id}>
        <View style={styles.foodRow}>
          <Text style={[styles.foodDescription, styles.foodBody]}>
            {foodDescription}
          </Text>
          {this.renderColumnTwo(food)}
        </View>
        <View style={styles.line} />
      </View>
    );
  }
  renderHeader() {
    if (this.props.permissions !== 'read-only') return;
    return (
      <View key={0}>
        <View style={styles.foodRow}>
          <Text style={[styles.foodDescription, styles.foodHeader]}>Food</Text>
          <Text style={styles.foodHeader}>% of Daily Value Per Serving</Text>
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
        {this.renderHeader()}
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
  line: {
    marginTop: '1%',
    borderBottomWidth: normalize(0.5),
    color: '#d9d9d9',
    width: '100%',
    opacity: 0.25,
  },
});

export default FoodTable;
