import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {normalize} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class FFProgressRing extends React.Component {
  static propTypes = {
    rgb: propTypes.array.isRequired,
    percent: propTypes.number.isRequired,
    strokeWidth: propTypes.number.isRequired,
    radius: propTypes.number.isRequired,
    chartWidth: propTypes.number.isRequired,
    chartHeight: propTypes.number.isRequired,
    style: propTypes.object,
  };
  render() {
    const {
      rgb,
      strokeWidth,
      percent,
      style,
      chartWidth,
      chartHeight,
      radius,
    } = this.props;
    const chartConfig = {
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, ${opacity})`,
    };
    const fontSize = {fontSize: (21 / 70) * radius};
    const percentMax100 = percent > 1 ? 1 : percent;
    return (
      <View style={[styles.chart, style]}>
        <ProgressChart
          data={{
            data: [percentMax100],
          }}
          width={chartWidth}
          height={chartHeight}
          strokeWidth={strokeWidth}
          radius={radius}
          chartConfig={chartConfig}
          hideLegend={true}
        />
        <Text style={[styles.chartPercentLabel, fontSize]}>
          {`${parseInt(percent * 100).toString()}%`}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chart: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  chartPercentLabel: {
    position: 'absolute',
    alignSelf: 'center',
    fontFamily: 'Cabin-Regular',
    color: '#555555',
  },
});

export default FFProgressRing;
