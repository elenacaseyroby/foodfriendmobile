import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {normalize} from '../../utils/sizeScaling';
import FFSelectButton from './FFSelectButton';
import propTypes from 'prop-types';

class FFSelect extends React.Component {
  // figure out how to deal with selecting multiple, up to 3, or 1
  // could maybe have possibleSelectionsCount
  // and requiredSelectionsCount
  static propTypes = {
    label: propTypes.string.isRequired,
    instructionalText: propTypes.string.isRequired,
    onChange: propTypes.string.isRequired,
    items: propTypes.array.isRequired,
  };
  state = {
    selectedItems: [],
  };
  onSelect = (key) => {
    let selectedItems = [];
    if (this.state.selectedItems.contains(key)) {
      this.state.selectedItems.map((itemKey) => {
        if (itemKey !== key) {
          selectedItems.push(key);
        }
      });
    } else {
      selectedItems = this.state.selectedItems;
      selectedItems = selectedItems.push(key);
    }
    this.setState(
      {selectedItems: selectedItems},
      this.props.onChange(this.state.selectedItems),
    );
  };
  render() {
    return (
      <>
        <Text style={styles.label}>{this.props.label}</Text>
        <Text style={styles.instructionalText}>
          {this.props.instructionalText}
        </Text>
        {/* see if this renders the buttons */}
        {this.props.items.forEach((item) => {
          return (
            <FFSelectButton
              onSelect={this.onSelect}
              key={item.key}
              selected={false}
              label={item.label}
            />
          );
        })}
      </>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginTop: '5%',
    fontSize: normalize(21),
    fontFamily: 'Cabin-SemiBold',
    color: '#555555',
  },
  instructionalText: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#aaaaaa',
  },
});

export default FFSelect;
