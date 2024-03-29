import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {normalize} from '../../../utils/deviceScaling';
import FFSelectButton from './FFSelectButton';
import propTypes from 'prop-types';

class FFSelect extends React.Component {
  static propTypes = {
    onChange: propTypes.func.isRequired,
    label: propTypes.string.isRequired,
    instructions: propTypes.string.isRequired,
    // items: an array of objects each with
    // id and label properties.
    items: propTypes.array.isRequired,
    selectionCount: propTypes.number,
  };
  state = {
    selectedItems: [],
  };
  handleOnChange = () => {
    if (this.props.selectionCount && this.props.selectionCount === 1) {
      // if only returning one selection, don't return array
      const item =
        this.state.selectedItems.length > 0
          ? this.state.selectedItems[0]
          : null;
      this.props.onChange(item);
    } else {
      this.props.onChange(this.state.selectedItems);
    }
  };
  onSelect = (id) => {
    let selectedItems = [];
    // if selecting 1 item, change selected item with every click.
    if (this.props.selectionCount && this.props.selectionCount === 1) {
      selectedItems = [id];
    } else if (this.state.selectedItems.includes(id)) {
      // if already selected, remove from selected items array.
      this.state.selectedItems.map((itemId) => {
        if (itemId !== id) {
          selectedItems.push(itemId);
        }
      });
    } else if (
      this.props.selectionCount &&
      this.props.selectionCount <= this.state.selectedItems.length
    ) {
      // if max number of selections made, do nothing
      selectedItems = this.state.selectedItems;
    } else {
      // add to selected items array.
      selectedItems = this.state.selectedItems;
      selectedItems.push(id);
    }
    this.setState({selectedItems: selectedItems}, this.handleOnChange);
  };
  render() {
    return (
      <View style={styles.selectComponent}>
        <Text style={styles.label}>{this.props.label}</Text>
        <Text style={styles.instructions}>{this.props.instructions}</Text>
        {this.props.items.map((item) => {
          return (
            <FFSelectButton
              label={item.value}
              key={item.id}
              id={item.id}
              selected={
                this.state.selectedItems.includes(item.id) ? true : false
              }
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
  instructions: {
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
