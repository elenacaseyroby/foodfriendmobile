import React from 'react';
import {StyleSheet, Modal} from 'react-native';
import {connect} from 'react-redux';
import {normalize, getIosStatusBarHeight} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class NutrientJournal extends React.Component {
  static propTypes = {
    isVisible: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
  };
  render() {
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
});

export default connect(mapStateToProps)(NutrientJournal);
