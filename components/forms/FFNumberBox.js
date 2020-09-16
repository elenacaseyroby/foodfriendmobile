import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AddButton from '../common/AddButton';
import SubtractButton from '../common/SubtractButton';
import propTypes from 'prop-types';
import {normalize} from '../../utils/deviceScaling';

class FFNumberBox extends React.Component {
  static propTypes = {
    initialValue: propTypes.number.isRequired,
    iterateBy: propTypes.number.isRequired,
    onChange: propTypes.func.isRequired,
    style: propTypes.object,
  };
  state = {
    value: this.props.initialValue,
  };
  handleAdd = () => {
    // add to state and pass current value into onChange
    const newValue = this.state.value + this.props.iterateBy;
    this.setState({value: newValue}, this.props.onChange(newValue));
  };
  handleSubtract = () => {
    const newValue = this.state.value - this.props.iterateBy;
    this.setState({value: newValue}, this.props.onChange(newValue));
  };
  render() {
    const renderValue = parseInt(this.state.value).toFixed(2);
    return (
      <View style={[styles.numberBoxContainer, this.props.style]}>
        <View>
          <SubtractButton
            onPress={this.handleSubtract}
            style={styles.subtractButton}
          />
        </View>
        <View style={styles.textbox}>
          <Text style={styles.text}>{renderValue}</Text>
        </View>
        <View>
          <AddButton onPress={this.handleAdd} style={styles.addButton} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  numberBoxContainer: {
    flexDirection: 'row',
    marginBottom: '5%',
    marginTop: '5%',
  },
  textbox: {
    marginLeft: '5%',
    marginRight: '5%',
    height: normalize(35),
    paddingLeft: '10%',
    paddingRight: '10%',
    borderRadius: normalize(20.5),
    backgroundColor: '#f2f2f2',
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#555555',
    alignSelf: 'center',
  },
  subtractButton: {
    borderColor: 'green',
  },
  addButton: {
    borderColor: 'green',
  },
});
export default FFNumberBox;
