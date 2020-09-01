import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class FFRadioButton extends React.Component {
  static propTypes = {
    label: propTypes.string.isRequired,
    allowOptOut: propTypes.bool.isRequired,
    onChange: propTypes.func.isRequired,
    // can only be 'yes', 'no', 'none':
    defaultSelectedValue: propTypes.string,
  };
  onClick = () => {
    this.props.onSelect(this.props.id);
  };
  state = {
    selected: this.props.defaultSelectedValue || null,
  };
  handleOnChange = () => {
    const {selected} = this.state;
    let value = null;
    if (selected === 'yes') {
      value = true;
    } else if (selected === 'no') {
      value = false;
    }
    // Only pass 'yes' or 'no' answers back to the onChange function.
    this.props.onChange(value);
  };
  renderOptOut() {
    if (!this.props.allowOptOut) return;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({selected: 'none'}, this.handleOnChange);
        }}
        style={[
          styles.button,
          this.state.selected === 'none' && styles.selectedButtonColor,
          this.state.selected !== 'none' && styles.unselectedButtonColor,
          styles.bigButton,
        ]}>
        <Text
          style={[
            styles.text,
            this.state.selected === 'none' && styles.selectedTextColor,
            this.state.selected !== 'none' && styles.unselectedTextColor,
          ]}>
          Prefer Not To Answer
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.radioButtonComponent}>
        <Text style={styles.label}>{this.props.label}</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({selected: 'yes'}, this.handleOnChange);
            }}
            style={[
              styles.button,
              this.state.selected === 'yes' && styles.selectedButtonColor,
              this.state.selected !== 'yes' && styles.unselectedButtonColor,
              styles.smallButton,
            ]}>
            <Text
              style={[
                styles.text,
                this.state.selected === 'yes' && styles.selectedTextColor,
                this.state.selected !== 'yes' && styles.unselectedTextColor,
              ]}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({selected: 'no'}, this.handleOnChange);
            }}
            style={[
              styles.button,
              this.state.selected === 'no' && styles.selectedButtonColor,
              this.state.selected !== 'no' && styles.unselectedButtonColor,
              styles.smallButton,
            ]}>
            <Text
              style={[
                styles.text,
                this.state.selected === 'no' && styles.selectedTextColor,
                this.state.selected !== 'no' && styles.unselectedTextColor,
              ]}>
              No
            </Text>
          </TouchableOpacity>
        </View>
        {this.renderOptOut()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: normalize(21),
    fontFamily: 'Cabin-SemiBold',
    color: '#555555',
    marginBottom: '5%',
  },
  selectedTextColor: {
    color: '#ffffff',
  },
  selectedButtonColor: {
    backgroundColor: '#5d80c1',
  },
  unselectedTextColor: {
    color: '#c2c2c2',
  },
  unselectedButtonColor: {
    backgroundColor: '#f4f4f4',
  },
  text: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(17),
    textAlign: 'center',
  },
  button: {
    marginBottom: '2%',
    justifyContent: 'center',
  },
  smallButton: {
    width: normalize(152),
    height: normalize(57),
    borderRadius: normalize(28.5),
    marginRight: '1%',
  },
  bigButton: {
    width: normalize(310),
    height: normalize(57),
    borderRadius: normalize(28.5),
  },
  rowContainer: {
    flexDirection: 'row',
  },
  radioButtonComponent: {
    marginBottom: '5%',
    marginTop: '5%',
  },
});

export default FFRadioButton;
