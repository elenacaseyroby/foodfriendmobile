import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FFStatusBar from '../common/FFStatusBar';
import {normalize} from '../../utils/deviceScaling';
import plantMascot from '../../assets/images/plant-mascot.png';
import greenCircle from './assets/green-circle.png';

class Progress extends React.Component {
  render() {
    return (
      <View style={styles.rectangle}>
        <FFStatusBar />
        <View style={styles.header}>
          <Image source={greenCircle} style={styles.greenCircle} />
        </View>

        <View style={styles.progressCard}>
          <Image source={plantMascot} style={styles.plantMascot} />
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
});

const mapStateToProps = (state) => ({
  user: state.user,
  dailyProgress: state.dailyProgress,
});

export default connect(mapStateToProps)(Progress);
