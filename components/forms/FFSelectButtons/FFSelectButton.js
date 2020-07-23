import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {normalize} from '../../utils/sizeScaling';
import propTypes from 'prop-types';
import {TouchableHighlight} from 'react-native-gesture-handler';

class FFSelectItem extends React.Component {
  // style active v not active
  static propTypes = {
    label: propTypes.string.isRequired,
    key: propTypes.string.isRequired,
    selected: propTypes.bool.isRequired,
    onSelect: propTypes.func.isRequired,
  };
  state = {
    selected: this.props.selected,
  };
  onClick = () => {
    this.props.onSelect(this.props.key);
    this.setState({selected: !this.state.selected});
  };
  render() {
    return (
      <>
        <TouchableHighlight onPress={this.onClick} style={styles.button}>
          <Text style={styles.label}>{this.props.label}</Text>
        </TouchableHighlight>
      </>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(17),
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    width: normalize(304),
    height: normalize(57),
    justifyContent: 'center',
    borderRadius: normalize(28.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: '#5f7ec6',
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default FFSelectItem;
