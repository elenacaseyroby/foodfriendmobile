import React from 'react';
import propTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import {normalize} from '../../../utils/deviceScaling';
import AddButton from '../AddButton';
import DeleteButton from './DeleteButton';
import AddFoodModal from './AddFoodModal';
import DeleteFoodModal from './DeleteFoodModal';
import orderBy from 'lodash/orderBy';

class FoodTable extends React.Component {
  static propTypes = {
    foods: propTypes.array.isRequired,
    // permissions: 'write', 'delete', 'read-only'
    permissions: propTypes.string.isRequired,
    style: propTypes.object,
  };
  state = {
    foodToAdd: null,
    foodToDelete: null,
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
      return (
        <View>
          <AddButton
            onPress={() => {
              this.setState({foodToAdd: food});
            }}
          />
        </View>
      );
    } else if (this.props.permissions === 'delete') {
      return (
        <>
          <Text
            style={
              styles.foodBody
            }>{`Servings: ${food.userFoodServingsCount}`}</Text>
          <DeleteButton
            onPress={() => {
              this.setState({foodToDelete: food});
            }}
            style={styles.deleteButton}
          />
        </>
      );
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
  renderAddFoodModal = () => {
    if (!this.state.foodToAdd) return;
    return (
      <AddFoodModal
        food={this.state.foodToAdd}
        onClose={() => this.setState({foodToAdd: null})}
      />
    );
  };
  renderDeleteFoodModal = () => {
    if (!this.state.foodToDelete) return;
    const {foodToDelete} = this.state;
    return (
      <DeleteFoodModal
        food={foodToDelete}
        onClose={() => this.setState({foodToDelete: null})}
      />
    );
  };
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
      <View style={this.props.style}>
        {this.renderHeader()}
        {foodsToRender.map((food) => {
          return this.renderRow(food);
        })}
        {this.renderAddFoodModal()}
        {this.renderDeleteFoodModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  foodRow: {
    width: '90%',
    alignSelf: 'center',
    minHeight: normalize(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2%',
    marginBottom: '2%',
    fontSize: normalize(14),
  },
  foodBody: {
    alignSelf: 'center',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#555555',
  },
  foodHeader: {
    alignSelf: 'center',
    fontFamily: 'Cabin-Bold',
    fontSize: normalize(16),
    color: '#555555',
  },
  line: {
    // marginTop: '1%',
    borderBottomWidth: normalize(0.5),
    color: '#d9d9d9',
    width: '100%',
    opacity: 0.25,
  },
  deleteButton: {
    marginTop: '2%',
  },
});

export default FoodTable;
