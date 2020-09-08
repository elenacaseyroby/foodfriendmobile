import React from 'react';
import {StyleSheet, Modal} from 'react-native';
import {connect} from 'react-redux';
import {normalize, getIosStatusBarHeight} from '../../utils/deviceScaling';
import {getUserPath} from '../../utils/users';
import {
  getFoodsInPath,
  getNutrientsInPath,
  getHighValueFoodsInPath,
} from '../../utils/paths';
import propTypes from 'prop-types';

class NutrientJournal extends React.Component {
  static propTypes = {
    isVisible: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
  };
  // state = {
  //   path: null,
  // };
  // componentDidUpdate = (prevProps, prevState) => {
  //   const {customPath, paths, user} = this.props;
  //   // if path could have changed, updated it.
  //   if (
  //     prevProps.customPath !== this.props.customPath ||
  //     prevProps.paths !== this.props.paths ||
  //     prevProps.user !== this.props.user
  //   ) {
  //     const path = getUserPath(user, customPath, paths);
  //     // WARNING: if you move set state out of this if statement,
  //     // it will cause an infinite loop of updated state.
  //     this.setState({path: path});
  //     console.log(JSON.stringify(path));
  //   }
  // };
  render() {
    const {customPath, paths, user, nutrients} = this.props;
    const path = getUserPath(user, customPath, paths);
    const foodsInPath = getFoodsInPath(nutrients.list, path);
    // TODO: test this function.
    const nutrientsInPath = getNutrientsInPath(nutrients.list, path);
    // TODO: test this function.
    const highValueFoods = getHighValueFoodsInPath(nutrients.list, path);

    console.log(JSON.stringify(path));
    return (
      <Modal
        animationType="swipe"
        transparent={false}
        visible={this.props.isVisible}></Modal>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
  recommendedFoods: state.recommendedFoods,
  paths: state.paths,
  customPath: state.customPath,
  user: state.user,
  nutrients: state.nutrients,
});

export default connect(mapStateToProps)(NutrientJournal);
