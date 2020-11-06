import React from 'react';
import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import expandIcon from '../../assets/images/expand-icon-white.png';
import collapseIcon from '../../assets/images/collapse-icon-white.png';
import propTypes from 'prop-types';

class NutrientBar extends React.Component {
  static propTypes = {
    isExpanded: propTypes.bool.isRequired,
    label: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    backgroundColor: propTypes.object,
    style: propTypes.object,
  };
  handleOnChange = (isExpanded) => {
    this.props.onChange(isExpanded);
  };
  render() {
    const {isExpanded, backgroundColor, label} = this.props;
    return (
      <View
        style={[styles.nutrientBar, backgroundColor || styles.backgroundColor]}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.handleOnChange(!isExpanded);
          }}>
          <Image
            source={isExpanded ? collapseIcon : expandIcon}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: '7%',
  },
  backgroundColor: {
    backgroundColor: '#ed762c',
  },
  nutrientBar: {
    height: normalize(45),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: 0,
  },
  label: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#ffffff',
  },
  icon: {
    width: normalize(16),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 16 / 10,
  },
});

export default NutrientBar;
