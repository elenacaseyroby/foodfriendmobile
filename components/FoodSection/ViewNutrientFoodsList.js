import React from 'react';
import NutrientBar from '../common/NutrientBar';
import FoodTable from '../common/FoodTable';
import propTypes from 'prop-types';

class ViewNutrientFoodsList extends React.Component {
  static propTypes = {
    nutrient: propTypes.object.isRequired,
    defaultIsExpanded: propTypes.bool.isRequired,
  };
  state = {
    isExpanded: this.props.defaultIsExpanded,
  };
  handleOnChange = (isExpanded) => {
    this.setState({isExpanded});
  };
  render() {
    const {nutrient} = this.props;
    const {isExpanded} = this.state;
    return (
      <>
        <NutrientBar
          backgroundColor={{backgroundColor: '#cc3904'}}
          label={nutrient.name}
          isExpanded={isExpanded}
          onChange={this.handleOnChange}
        />
        {isExpanded ? (
          <FoodTable
            keyPrefix={`vwNutrientFoodTable-${nutrient.id}`}
            foods={nutrient.foods}
            permissions="read-only"
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default ViewNutrientFoodsList;
