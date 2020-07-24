import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {normalize} from '../../../utils/sizeScaling';
import propTypes from 'prop-types';

class FFSelectButton extends React.Component {
  static propTypes = {
    label: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
    selected: propTypes.bool.isRequired,
    onSelect: propTypes.func.isRequired,
  };
  onClick = () => {
    this.props.onSelect(this.props.id);
  };
  render() {
    let buttonStyles = [styles.button];
    let labelStyles = [styles.label];
    if (this.props.selected) {
      buttonStyles.push(styles.selectedButton);
      labelStyles.push(styles.selectedLabel);
    } else {
      buttonStyles.push(styles.unselectedButton);
      labelStyles.push(styles.unselectedLabel);
    }
    return (
      <>
        <TouchableOpacity onPress={this.onClick} style={buttonStyles}>
          <Text style={labelStyles}>{this.props.label}</Text>
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  selectedLabel: {
    color: '#ffffff',
  },
  selectedButton: {
    backgroundColor: '#5d80c1',
  },
  unselectedLabel: {
    color: '#c2c2c2',
  },
  unselectedButton: {
    backgroundColor: '#f4f4f4',
  },
  label: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(17),
    textAlign: 'center',
  },
  button: {
    width: normalize(310),
    height: normalize(57),
    justifyContent: 'center',
    borderRadius: normalize(28.5),
    marginBottom: '2%',
  },
});

export default FFSelectButton;
