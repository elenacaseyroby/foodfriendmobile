import React from 'react';
import {ScrollView, View, Image, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FFStatusBar from '../common/FFStatusBar';
import FFProgressRing from './FFProgressRing';
import NutrientUserFoodsCard from './NutrientUserFoodsCard';
import Loader from '../common/Loader';
import {normalize} from '../../utils/deviceScaling';
import plantMascot from '../../assets/images/plant-mascot.png';
import greenCircle from './assets/green-circle.png';

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
      <View style={styles.nutrientProgressRow}>
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
          ).toString()}% of your daily value (DV) of ${
            report.nutrientName
          }, based on a DV of ${report.nutrientDvNote}.`}</Text>
        </View>
      </View>
    );
  };
  renderProgressContent = () => {
    const {user} = this.props;
    const report = this.props.dailyProgress;
    if (user.id && !user.activePathId) return <></>;
    if (!report.nutrientsTotalDvConsumed)
      return (
        <View style={styles.loader}>
          <Loader />
        </View>
      );
    let wordsOfEncouragement = `Looks like you're just getting started! Click on the (+) to record foods you've eaten today, then return to this page to track your progress.`;
    if (report.nutrientsTotalDvConsumed > 0) {
      wordsOfEncouragement =
        'Off to a great start! Checkout the "Food" page to see which foods will help you reach your goals faster.';
    }
    if (report.nutrientsTotalDvConsumed > 0.5) {
      wordsOfEncouragement =
        'Nice work! Log more foods to reach 100% of the daily value for each nutrient in your path.';
    }
    if (report.nutrientsTotalDvConsumed === '1.00') {
      wordsOfEncouragement =
        'Wow! Great job reaching your goal today! Take a moment to thank yourself for taking such good care of you.';
    }

    const totalPercent = parseFloat(report.nutrientsTotalDvConsumed);
    return (
      <>
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
          // Don't render dash for last nutrient in report.
          const renderDash = index + 1 !== report.nutrientReports.length;
          const themeIndex = index % 3;
          return (
            <View key={`nutrientReport-${index.toString()}`}>
              {this.renderNutrientProgressRow(
                themes[themeIndex],
                nutrientReport,
              )}
              {renderDash ? <View style={styles.dash} /> : <></>}
            </View>
          );
        })}
        <View style={styles.line} />
        <View style={styles.nutrientCardsContainer}>
          {report.nutrientReports.map((nutrientReport, index) => {
            const themeIndex = index % 3;
            const backgroundColor = {
              backgroundColor: themes[themeIndex].hex,
            };
            return (
              <View key={`nutrientCard-${index.toString()}`}>
                <NutrientUserFoodsCard
                  nutrientName={nutrientReport.nutrientName}
                  foods={nutrientReport.consumedFoods}
                  defaultIsExpanded={true}
                  nutrientBarBackgroundColor={backgroundColor}
                  style={styles.nutrientCard}
                />
              </View>
            );
          })}
        </View>
      </>
    );
  };
  render() {
    return (
      <>
        <FFStatusBar />
        <ScrollView style={styles.rectangle}>
          <View style={styles.header}>
            <Image source={greenCircle} style={styles.greenCircle} />
          </View>
          <View style={styles.progressCard}>
            <Image source={plantMascot} style={styles.plantMascot} />
            <Text style={styles.h1}>Progress</Text>
            {this.renderProgressContent()}
          </View>
          <View>
            <Text style={styles.disclaimerText}>
              Please note, Daily Value (DV) is a term created by the Food and
              Drug Administration (FDA) to help consumers understand how
              nutritional contents of foods and supplements contribute to
              overall diet. The nutrient DVs in FoodFriend are based on the
              adult average recommended DVs from the National Institutes of
              Health: Office of Dietary Supplements online factsheets from June
              2020. The recommended DVs displayed on FoodFriend are in no way
              intended to fit every person's individual needs; rather they
              provide an estimate of what the average adult person might need in
              their diet. For example, if you are defficient in a given
              nutrient, you might need to consume more of that nutrient than
              FoodFriend suggests. Additionally, the percentages you see on this
              page are estimates, not exact reprepresentations, of the nutrients
              you have consumed based on the food servings you record through
              the app. As always, we encourage you to explore how the
              introduction of new nutrients or foods into your diet might impact
              your health with your doctor or other qualified healthcare
              provider.
            </Text>
          </View>
          <View style={styles.navBarWhiteSpace} />
        </ScrollView>
      </>
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
    borderBottomWidth: normalize(2),
    borderBottomColor: '#d6d9dc',
    width: '100%',
  },
  dash: {
    borderBottomColor: '#d6d9dc',
    borderBottomWidth: normalize(2),
    alignSelf: 'center',
    width: normalize(282),
  },
  nutrientProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: normalize(282),
    height: normalize(120),
    alignSelf: 'center',
  },
  nutrientLabel: {
    alignSelf: 'center',
    width: normalize(150),
  },
  nutrientH1: {
    textAlign: 'left',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(18),
    color: '#555555',
  },
  nutrientH2: {
    marginTop: '2%',
    textAlign: 'left',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(12),
    color: '#555555',
  },
  nutrientCardsContainer: {
    marginTop: '3%',
  },
  nutrientCard: {
    alignSelf: 'center',
    marginTop: '2%',
  },
  disclaimerText: {
    marginTop: '15%',
    width: normalize(250),
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(9),
    color: '#aaaaaa',
  },
  loader: {
    width: '100%',
    height: '55%',
  },
  navBarWhiteSpace: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: normalize(160),
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  dailyProgress: state.dailyProgress,
});

export default connect(mapStateToProps)(Progress);
