import React from 'react';
import propTypes from 'prop-types';
import {TextInput, Image, View, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import searchIcon from '../../assets/images/search-icon-white.png';
import debounce from 'lodash/debounce';

class SearchBar extends React.Component {
  static propTypes = {
    search: propTypes.func.isRequired,
    style: propTypes.object,
  };
  state = {
    searchTerm: '',
  };
  debounchedSearchDeals = debounce(this.props.search, 600);
  handleChange = (searchTerm) => {
    this.setState({searchTerm}, () => {
      // if no more is typed into search box for 600 milaseconds,
      // search & susequent api request are trigged.
      this.debounchedSearchDeals(this.state.searchTerm);
    });
  };
  render() {
    return (
      <View style={[styles.inputBox, this.props.style]}>
        <TextInput
          placeholderTextColor="#ffffff"
          placeholder="Search"
          style={styles.inputText}
          onChangeText={this.handleChange}
          maxLength={100}
        />
        <Image source={searchIcon} style={styles.searchIcon} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    width: normalize(340),
    height: normalize(35),
    backgroundColor: 'gray',
    borderRadius: 100 / 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputText: {
    color: '#ffffff',
    marginLeft: '7%',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
  },
  searchIcon: {
    marginRight: '7%',
    alignSelf: 'center',
    width: normalize(20),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
  },
});

export default SearchBar;
