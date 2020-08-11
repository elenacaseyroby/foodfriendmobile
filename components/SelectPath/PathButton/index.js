import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {normalize} from '../../../utils/deviceScaling';
import ArrowButton from './ArrowButton';
import propTypes from 'prop-types';

class PathButton extends React.Component {
  static propTypes = {
    path: propTypes.object.isRequired,
    onPress: propTypes.func.isRequired,
    navigation: propTypes.object.isRequired,
    style: propTypes.object,
    selected: propTypes.bool,
  };
  render() {
    const {path} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('hey!');
          this.props.onPress(path);
        }}
        key={path.name}
        style={[styles.buttonContainer, this.props.style]}>
        <Image
          style={styles.image}
          source={{
            uri: path.theme.button_img_path,
          }}
        />
        <View
          style={[
            styles.overlay,
            this.props.selected
              ? styles.selectedOverlay
              : styles.unselectedOverlay,
          ]}
        />
        <View style={styles.labelAndButtonContainer}>
          <View
            style={[
              styles.labelContainer,
              this.props.selected
                ? styles.selectedLabelContainer
                : styles.unselectedLabelContainer,
            ]}>
            <Text
              style={[
                styles.label,
                this.props.selected
                  ? styles.selectedLabel
                  : styles.unselectedLabel,
              ]}>
              {path.name.toLowerCase().split(' ')[0]}
            </Text>
          </View>
          <View style={styles.arrow}>
            <ArrowButton
              selected={this.props.selected}
              onPress={() => {
                this.props.navigation.navigate('Path Detail', {
                  path: path,
                  showBackArrow: true,
                });
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  labelContainer: {
    height: normalize(50),
    alignSelf: 'flex-start',
    flexWrap: 'nowrap',
    paddingRight: normalize(17),
    paddingLeft: normalize(40),
    marginLeft: normalize(-30),
    borderRadius: normalize(27),
  },
  label: {
    alignSelf: 'flex-end',
    fontSize: normalize(36),
    fontFamily: 'Bellota-Regular',
  },
  selectedLabelContainer: {
    backgroundColor: '#36549a',
    borderColor: '#ffffff',
    borderWidth: normalize(1),
  },
  unselectedLabelContainer: {
    backgroundColor: '#ffffff',
  },
  unselectedLabel: {
    color: '#555555',
  },
  selectedLabel: {
    color: '#ffffff',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 90,
  },
  arrow: {
    alignSelf: 'center',
    position: 'absolute',
    right: '2%',
  },
  overlay: {
    backgroundColor: '#000000',
    position: 'absolute',
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 90,
  },
  selectedOverlay: {
    opacity: 0.5,
  },
  unselectedOverlay: {
    opacity: 0.0,
  },
  labelAndButtonContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignContent: 'space-between',
    backgroundColor: '#5d80c1',
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 90,
  },
});

export default PathButton;
