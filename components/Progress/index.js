import React from 'react';
import {ScrollView, View, Image, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FFStatusBar from '../common/FFStatusBar';
import FFProgressRing from './FFProgressRing';
import {normalize} from '../../utils/deviceScaling';
import plantMascot from '../../assets/images/plant-mascot.png';
import greenCircle from './assets/green-circle.png';

// if theme is added, must update in orderNutrientsByTheme function.
const themes = [
  {
    rgb: [50, 119, 16],
    hex: '#327710',
  },
  {
    rgb: [204, 57, 4],
    hex: '#cc3904',
  },
  {
    rgb: [255, 131, 53],
    hex: '#ff8335',
  },
];

class Progress extends React.Component {
  renderNutrientProgressRow = (theme, report) => {
    const percent = parseFloat(report.percentDvConsumed);
    return (
      <View key={report.nutrientId} style={styles.nutrientProgressRow}>
        <FFProgressRing
          rgb={theme.rgb}
          percent={percent}
          strokeWidth={normalize(8)}
          radius={normalize(40)}
          chartWidth={normalize(110)}
          chartHeight={100}
        />
        <View style={styles.nutrientLabel}>
          <Text style={styles.nutrientH1}>{report.nutrientName}</Text>
          <Text style={styles.nutrientH2}>{`You have consumed ${(
            report.percentDvConsumed * 100
          ).toString()}% of your daily value of ${report.nutrientName}.`}</Text>
        </View>
      </View>
    );
  };
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
    // report.nutrientReports.map((nutrientReport) => {
    //   console.log(nutrientReport.percentDvConsumed);
    // });

    const totalPercent = parseFloat(report.nutrientsTotalDvConsumed);
    return (
      <ScrollView style={styles.rectangle}>
        <FFStatusBar />
        <View style={styles.header}>
          <Image source={greenCircle} style={styles.greenCircle} />
        </View>

        <View style={styles.progressCard}>
          <Image source={plantMascot} style={styles.plantMascot} />
          <Text style={styles.h1}>Progress</Text>
          <Text style={styles.h2}>{wordsOfEncouragement}</Text>
          <FFProgressRing
            rgb={[95, 126, 198]}
            percent={totalPercent}
            strokeWidth={normalize(23)}
            radius={normalize(70)}
            chartWidth={normalize(180)}
            chartHeight={180}
            style={styles.totalChart}
          />
          <View style={styles.line} />
          {report.nutrientReports.map((nutrientReport, index) => {
            const themeIndex = index % 3;
            return this.renderNutrientProgressRow(
              themes[themeIndex],
              nutrientReport,
            );
          })}
        </View>
        <View style={styles.menuWhiteSpace} />
      </ScrollView>
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
    fontSize: normalize(14),
    color: '#555555',
  },
  h3: {
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
    marginTop: '3%',
    marginBottom: '3%',
  },
  line: {
    marginTop: '1%',
    borderBottomWidth: normalize(0.5),
    color: '#d9d9d9',
    width: '100%',
    opacity: 0.25,
  },
  nutrientProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: normalize(282),
    height: normalize(120),
    alignSelf: 'center',
    borderBottomColor: '#d6d9dc',
    borderBottomWidth: normalize(2),
  },
  nutrientLabel: {
    alignSelf: 'center',
    width: normalize(150),
  },
  nutrientH1: {
    textAlign: 'left',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(21),
    color: '#555555',
  },
  nutrientH2: {
    marginTop: '2%',
    textAlign: 'left',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(14),
    color: '#555555',
  },
  menuWhiteSpace: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: normalize(100),
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  dailyProgress: state.dailyProgress,
});

export default connect(mapStateToProps)(Progress);
