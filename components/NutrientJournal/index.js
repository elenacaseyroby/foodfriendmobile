import React from 'react';
import {StyleSheet, Modal, Image, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {normalize, getIosStatusBarHeight} from '../../utils/deviceScaling';
import backgroundImage from './assets/background-image.png';
import FFStatusBar from '../common/FFStatusBar';
import ExitButton from '../common/ExitButton';
import Tab from './Tab';
import SearchBar from '../common/SearchBar';
import searchIcon from '../../assets/images/search-icon-gray.png';
import listIcon from '../../assets/images/menu-icon-gray.png';
import {filterObjectArray} from '../../utils/dataProcessing';
import propTypes from 'prop-types';

class NutrientJournal extends React.Component {
  static propTypes = {
    isVisible: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
  };
  state = {
    // 'search', 'listByNutrients'
    activeTab: 'search',
    filteredFoods: null,
  };
  search = (keyword) => {
    const searchFoods = this.props.recentlyConsumedFoods.list.concat(
      this.props.user.activePath.foods,
    );
    // I don't think this works
    // how do I most efficiently filter through this array of objects? lodash?
    const filteredFoods = filterObjectArray(searchFoods, keyword, 'name');
    this.setState({filteredFoods: filteredFoods});
  };
  render() {
    const recentlyConsumedFoods = this.props.recentlyConsumedFoods.list || [];
    console.log(this.props.recentlyConsumedFoods);
    const {user} = this.props;
    let pathFoods = [];
    if (user && user.activePath) {
      pathFoods = user.activePath.foods;
    }
    const activeTab = this.state.activeTab;
    const searchFoods = recentlyConsumedFoods.concat(pathFoods);
    const tabDescription =
      activeTab === 'search'
        ? 'Search for foods in your path'
        : 'Scroll to view foods by nutrient';
    return (
      <Modal
        animationType="swipe"
        transparent={false}
        visible={this.props.isVisible}>
        <FFStatusBar />
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <ExitButton onPress={this.props.onClose} style={styles.exitIcon} />
            <Text style={styles.headerText}>What did you eat today?</Text>
          </View>
          <Image source={backgroundImage} style={styles.backgroundImage} />
          <View style={styles.tabs}>
            <Tab
              active={activeTab === 'search'}
              iconSource={searchIcon}
              style={styles.searchTab}
              onPress={() => {
                this.setState({activeTab: 'search'});
              }}
            />
            <Tab
              active={activeTab === 'listByNutrients'}
              iconSource={listIcon}
              style={styles.nutrientsTab}
              onPress={() => {
                this.setState({activeTab: 'listByNutrients'});
              }}
            />
          </View>
        </View>
        <View style={styles.tabDescription}>
          <Text style={styles.tabDescriptionText}>{tabDescription}</Text>
        </View>
        <View style={styles.searchContainer}>
          <SearchBar search={this.search} style={styles.searchBar} />
        </View>
        <Text>
          {(this.state.filteredFoods || searchFoods).map((food) => {
            return food.name;
          })}
        </Text>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  headerContent: {
    alignSelf: 'center',
    width: normalize(340),
  },
  exitIcon: {
    marginTop: '10%',
    // marginLeft: '5%',
  },
  headerText: {
    marginTop: '10%',
    width: normalize(125),
    fontFamily: 'Cabin-Regular',
    color: '#ffffff',
    fontSize: normalize(30),
  },
  headerContainer: {
    height: normalize(280),
    width: '100%',
    backgroundColor: '#ed762c',
  },
  backgroundImage: {
    position: 'absolute',
    width: normalize(240),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 240 / 270,
    right: 0,
  },
  tabs: {
    width: normalize(340),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -2,
  },
  tabDescription: {
    height: normalize(60),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabDescriptionText: {
    fontFamily: 'Cabin-Regular',
    color: '#555555',
    fontSize: normalize(18),
  },
  searchBar: {
    alignSelf: 'center',
    marginTop: '2%',
    marginBottom: '2%',
  },
  searchContainer: {
    borderTopWidth: normalize(0.5),
    borderBottomWidth: normalize(0.5),
    color: '#d9d9d9',
    width: '100%',
    opacity: 0.25,
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  nutrients: state.nutrients,
  recentlyConsumedFoods: state.recentlyConsumedFoods,
});

export default connect(mapStateToProps)(NutrientJournal);
