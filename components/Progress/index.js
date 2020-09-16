import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FFStatusBar from '../common/FFStatusBar';
import {normalize} from '../../utils/deviceScaling';
import plantMascot from '../../assets/images/plant-mascot.png';
import greenCircle from './assets/green-circle.png';

class Progress extends React.Component {
  render() {
    const reports = this.props.dailyProgress.nutrientReports;
    console.log(reports);
    let wordsOfEncouragement = `Looks like you're just getting started! Click on the "+" to record foods you've eaten today, then return to this page to track your progress.`;
    if (reports.totalDvConsumed > 0) {
      wordsOfEncouragement =
        'Off to a great start! Checkout the "Food" page to see which foods will help you reach your goals faster.';
    }
    if (reports.totalDvConsumed > 0.5) {
      wordsOfEncouragement =
        'Nice work! Log more foods to reach 100% of the daily value for each nutrient in your path.';
    }
    if (reports.totalDvConsumed === 1) {
      wordsOfEncouragement =
        'Wow! Great job reaching your goal today! Keep up the good work and feel like your best you.';
    }
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
});

const mapStateToProps = (state) => ({
  user: state.user,
  dailyProgress: state.dailyProgress,
});

export default connect(mapStateToProps)(Progress);
