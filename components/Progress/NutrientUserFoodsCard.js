import React from 'react';
import {View, StyleSheet} from 'react-native';
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
  };
  state = {
    isExpanded: this.props.defaultIsExpanded,
  };
  handleOnChange = (isExpanded) => {
    this.setState({isExpanded});
  };
  render() {
    const {nutrientName, foods, nutrientBarBackgroundColor} = this.props;
    const {isExpanded} = this.state;
    return (
      <View style={styles.nutrientCard}>
        <NutrientBar
          backgroundColor={nutrientBarBackgroundColor}
          label={nutrientName}
          isExpanded={isExpanded}
          onChange={this.handleOnChange}
        />
        {isExpanded ? <FoodTable foods={foods} permissions="delete" /> : <></>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nutrientCard: {
    overflow: 'hidden',
    width: normalize(350),
    borderRadius: normalize(10),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.35,
    // shadowRadius: 2.22,
    // elevation: 3,
    borderWidth: normalize(0.5),
    borderEndColor: '#7c828a',
  },
});

export default NutrientUserFoodsCard;
