import React from 'react';
import {ScrollView, StyleSheet, Modal, Image, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {normalize, getIosStatusBarHeight} from '../../utils/deviceScaling';
import backgroundImage from './assets/background-image.png';
import FFStatusBar from '../common/FFStatusBar';
import OfflineNotificationBanner from '../common/OfflineNotificationBanner';
import ExitButton from '../common/ExitButton';
import Tab from './Tab';
import SearchBar from '../common/SearchBar';
import AddNutrientFoodsList from './AddNutrientFoodsList';
import FoodTable from '../common/FoodTable';
import searchIcon from '../../assets/images/search-icon-gray.png';
import listIcon from '../../assets/images/menu-icon-gray.png';
import {searchFoods} from '../../utils/dataProcessing';
import propTypes from 'prop-types';

class NutrientJournal extends React.Component {
  static propTypes = {
    isVisible: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'search',
      filteredFoods: null,
    };
  }
  search = (keyword) => {
    const foodsToRender = this.getFoodsToRender();
    const filteredFoods = searchFoods(foodsToRender, keyword);
    this.setState({filteredFoods: filteredFoods});
  };
  getFoodsToRender = () => {
    const recentlyConsumedFoods = this.props.recentlyConsumedFoods.list || [];
    const {user} = this.props;
    const nutrients = this.props.nutrients.list;
    // Combine list of foods in nutrients in active path
    // with list of recently consumed foods
    // to get list of foods to render.
    let addedfoodIds = [];
    let foodsToRender = [];
    // make sure recently consumed foods are at top of list.
    recentlyConsumedFoods.map((food) => {
      // weed out duplicate food records.
      if (!addedfoodIds.includes(food.id)) {
        addedfoodIds.push(food.id);
        foodsToRender.push(food);
      }
    });
    if (user && user.activePath) {
      // get list of ids for nutrients in active path.
      const pathNutrientIds = user.activePath.nutrients.map((nutrient) => {
        return nutrient.id;
      });
      // if nutrient in path, add nutrient's foods to foodsToRender list.
      nutrients.map((nutrient) => {
        if (!pathNutrientIds.includes(nutrient.id)) return;
        nutrient.foods.map((food) => {
          // weed out duplicate food records.
          if (!addedfoodIds.includes(food.id)) {
            addedfoodIds.push(food.id);
            foodsToRender.push(food);
          }
        });
      });
    }
    return foodsToRender;
  };
  renderSearch = () => {
    if (this.state.activeTab !== 'search') return;
    const {filteredFoods} = this.state;
    const foodsToRender = this.getFoodsToRender();
    const searchResults = filteredFoods || foodsToRender;
    return (
      <>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search foods"
            search={this.search}
            style={styles.searchBar}
          />
        </View>
        <ScrollView>
          <FoodTable foods={searchResults} permissions="write" />
        </ScrollView>
      </>
    );
  };
  renderListByNutrients = () => {
    if (this.state.activeTab !== 'listByNutrients') return;
    const {user} = this.props;
    if (!user && !user.activePath) return;
    if (!this.props.nutrients) return;
    const nutrients = this.props.nutrients.list;
    // get list of ids for nutrients in path.
    const pathNutrientIds = user.activePath.nutrients.map((nutrient) => {
      return nutrient.id;
    });
    // Expand only first nutrient.
    let nutrientHasBeenExpanded = false;
    return (
      <ScrollView>
        {nutrients.map((nutrient) => {
          if (!pathNutrientIds.includes(nutrient.id)) return <></>;
          const defaultIsExpanded = !nutrientHasBeenExpanded;
          nutrientHasBeenExpanded = true;
          return (
            <AddNutrientFoodsList
              nutrient={nutrient}
              defaultIsExpanded={defaultIsExpanded}
            />
          );
        })}
      </ScrollView>
    );
  };
  render() {
    const activeTab = this.state.activeTab;
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
        <OfflineNotificationBanner />
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <ExitButton
              onPress={() => {
                this.setState({filteredFoods: null});
                this.props.onClose();
              }}
              style={styles.exitIcon}
            />
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
        {this.renderSearch()}
        {this.renderListByNutrients()}
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
