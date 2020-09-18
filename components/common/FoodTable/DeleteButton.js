import React from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import {normalize} from '../../../utils/deviceScaling';
import deleteIcon from '../../../assets/images/delete-icon-red.png';
import propTypes from 'prop-types';

class DeleteButton extends React.Component {
  static propTypes = {
    onPress: propTypes.func.isRequired,
    style: propTypes.object,
  };
  render() {
    return (
      <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
        <Image source={deleteIcon} style={styles.deleteIcon} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  deleteIcon: {
    width: normalize(20),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
  },
  container: {
    flex: 1,
  },
});

export default DeleteButton;
