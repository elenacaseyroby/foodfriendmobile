import React from 'react';
import {View, StyleSheet} from 'react-native';
import propTypes from 'prop-types';

class ProgressBar extends React.Component {
  static propTypes = {
    // Must be between 1 and 5
    activePageNumber: propTypes.number.isRequired,
  };
  render() {
    const pageNumbers = [...Array(5).keys()];

    return (
      <View style={styles.progressBar}>
        {pageNumbers.map((number) => {
          if (number === this.props.activePageNumber - 1) {
            return (
              <View
                key={number}
                style={[
                  styles.filledCircle,
                  fillColorByPageNumber[this.props.activePageNumber],
                ]}
              />
            );
          }
          return <View key={number} style={styles.emptyCircle} />;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filledCircle: {
    height: 6,
    width: 6,
    borderRadius: 100 / 2,
    backgroundColor: '#6e9d4c',
  },
  emptyCircle: {
    height: 6,
    width: 6,
    borderRadius: 100 / 2,
    opacity: 0.25,
    backgroundColor: '#000000',
  },
  progressBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 71,
    maxHeight: 7,
  },
});
const fillColorByPageNumber = StyleSheet.create({
  1: {
    backgroundColor: '#5d80c1',
  },
  2: {
    backgroundColor: '#6e9d4c',
  },
  3: {
    backgroundColor: '#513d51',
  },
  4: {
    backgroundColor: '#ffe3b3',
  },
  5: {
    backgroundColor: '#7c91cb',
  },
});

export default ProgressBar;
