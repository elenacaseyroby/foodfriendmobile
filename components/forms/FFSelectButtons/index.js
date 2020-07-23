import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {normalize} from '../../../utils/sizeScaling';
import FFSelectButton from './FFSelectButton';
import propTypes from 'prop-types';

class FFSelect extends React.Component {
  // figure out how to deal with selecting multiple, up to 3, or 1
  // could maybe have possibleSelectionsCount
  // and requiredSelectionsCount
  static propTypes = {
    label: propTypes.string.isRequired,
    instructionalText: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    // items: an array of objects each with
    // id and label properties.
    items: propTypes.array.isRequired,
  };
  state = {
    selectedItems: [],
  };
  handleOnChange = () => {
    this.props.onChange(this.state.selectedItems);
  };
  onSelect = (id) => {
    let newSelectedItems = [];
    if (this.state.selectedItems.includes(id)) {
      this.state.selectedItems.map((itemId) => {
        if (itemId !== id) {
          newSelectedItems.push(itemId);
        }
      });
    } else {
      newSelectedItems = this.state.selectedItems;
      newSelectedItems.push(id);
    }
    this.setState({selectedItems: newSelectedItems}, this.handleOnChange);
  };
  render() {
    return (
      <View style={styles.selectComponent}>
        <Text style={styles.label}>{this.props.label}</Text>
        <Text style={styles.instructionalText}>
          {this.props.instructionalText}
        </Text>
        {/* see if this renders the buttons */}
        {this.props.items.map((item) => {
          return (
            <FFSelectButton
              label={item.value}
              key={item.id}
              id={item.id}
              selected={false}
              onSelect={this.onSelect}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: normalize(21),
    fontFamily: 'Cabin-SemiBold',
    color: '#555555',
    marginBottom: '3%',
  },
  instructionalText: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#aaaaaa',
    marginBottom: '5%',
  },
  selectComponent: {
    marginBottom: '5%',
    marginTop: '5%',
  },
});

export default FFSelect;
