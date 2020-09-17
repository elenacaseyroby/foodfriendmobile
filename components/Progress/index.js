import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FFStatusBar from '../common/FFStatusBar';
import {normalize} from '../../utils/deviceScaling';
import {ProgressChart} from 'react-native-chart-kit';
import plantMascot from '../../assets/images/plant-mascot.png';
import greenCircle from './assets/green-circle.png';

class Progress extends React.Component {
  render() {
    // think about if this naming makes sense...
    const report = this.props.dailyProgress;
    if (!report.nutrientsTotalDvConsumed) return <></>;
    console.log(report);
    let wordsOfEncouragement = `Looks like you're just getting started! Click on the "+" to record foods you've eaten today, then return to this page to track your progress.`;
    if (report.nutrientsTotalDvConsumed > 0) {
      wordsOfEncouragement =
        'Off to a great start! Checkout the "Food" page to see which foods will help you reach your goals faster.';
    }
    if (report.nutrientsTotalDvConsumed > 0.5) {
      wordsOfEncouragement =
        'Nice work! Log more foods to reach 100% of the daily value for each nutrient in your path.';
    }
    if (report.nutrientsTotalDvConsumed === 1) {
      wordsOfEncouragement =
        'Wow! Great job reaching your goal today! Take a moment to thank yourself for taking such good care of you.';
    }
    report.nutrientReports.map((nutrientReport) => {
      console.log(nutrientReport.percentDvConsumed);
    });
    const totalChartConfig = {
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(95,126,198, ${opacity})`,
    };
    return (
      <View style={styles.rectangle}>
        <FFStatusBar />
        <View style={styles.header}>
          <Image source={greenCircle} style={styles.greenCircle} />
        </View>

        <View style={styles.progressCard}>
          <Image source={plantMascot} style={styles.plantMascot} />
          <Text style={styles.h1}>Progress</Text>
          <Text style={styles.h2}>{wordsOfEncouragement}</Text>
          <View style={styles.totalChart}>
            <ProgressChart
              data={{
                data: [report.nutrientsTotalDvConsumed],
              }}
              width={normalize(180)}
              height={normalize(180)}
              strokeWidth={normalize(23)}
              radius={normalize(75)}
              chartConfig={totalChartConfig}
              hideLegend={true}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#266407',
    height: normalize(220),
    width: '100%',
  },
  greenCircle: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    width: normalize(183),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
  },
  progressCard: {
    width: '100%',
    marginTop: normalize(-90),
    minHeight: 300,
    backgroundColor: '#ffffff',
    borderRadius: normalize(20),
  },
  plantMascot: {
    top: normalize(-110),
    alignSelf: 'center',
    position: 'absolute',
    width: normalize(150),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 118 / 113,
  },
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: '100%',
  },
  h1: {
    marginTop: '11%',
    alignSelf: 'center',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(21),
    color: '#555555',
  },
  h2: {
    width: normalize(300),
    textAlign: 'center',
    marginTop: '2%',
    alignSelf: 'center',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#555555',
  },
  totalChart: {
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  dailyProgress: state.dailyProgress,
});

export default connect(mapStateToProps)(Progress);
