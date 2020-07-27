import React from 'react';
import {View, StyleSheet} from 'react-native';
import propTypes from 'prop-types';
import {normalize} from '../../utils/deviceScaling';

class ProgressBar extends React.Component {
  static propTypes = {
    // Must be between 1 and 5
    activeCircleIndex: propTypes.number.isRequired,
  };
  render() {
    const circleIndices = Object.keys(fillColorByCircleIndex);
    return (
      <View style={styles.progressBar}>
        {circleIndices.map((circleIndexStr) => {
          // eslint-disable-next-line radix
          const circleIndex = parseInt(circleIndexStr);
          if (circleIndex === this.props.activeCircleIndex) {
            return (
              <View
                key={circleIndex}
                style={[
                  styles.filledCircle,
                  fillColorByCircleIndex[this.props.activeCircleIndex],
                ]}
              />
            );
          }
          return <View key={circleIndex} style={styles.emptyCircle} />;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filledCircle: {
    height: normalize(6),
    width: normalize(6),
    borderRadius: 100 / 2,
    backgroundColor: '#6e9d4c',
  },
  emptyCircle: {
    height: normalize(6),
    width: normalize(6),
    borderRadius: 100 / 2,
    opacity: 0.25,
    backgroundColor: '#000000',
  },
  progressBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: normalize(71),
    maxHeight: 7,
  },
});
// Define color of circle when active. Define by circle index.
const fillColorByCircleIndex = StyleSheet.create({
  1: {
    backgroundColor: '#5d80c1',
  },
  2: {
    backgroundColor: '#5d80c1',
  },
  3: {
    backgroundColor: '#ffe3b3',
  },
  4: {
    backgroundColor: '#1f641e',
  },
  5: {
    backgroundColor: '#7c91cb',
  },
});

export default ProgressBar;
