import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import asyncStorage from '../../asyncStorage';
import {normalize} from '../../utils/deviceScaling';
import {setAuth} from '../../redux/actions/authActionCreator';
import FFStatusBar from '../common/FFStatusBar';
import BrowserPopUpModal from '../common/BrowserPopUpModal';
import MenuButton from './MenuButton';
import plantMascot from '../../assets/images/plant-mascot-blue.png';
import header from './assets/header-img.png';
import details from './assets/details.png';
import detailsIcon from './assets/details-icon.png';
import support from './assets/support.png';
import supportIcon from './assets/support-icon.png';
import privacy from './assets/privacy.png';
import privacyIcon from './assets/privacy-icon.png';
import terms from './assets/terms.png';
import termsIcon from './assets/terms-icon.png';

class AccountMenu extends React.Component {
  state = {
    displayBrowser: false,
  };
  handleSignOut = async () => {
    await asyncStorage._clearData();
    this.props.dispatch(setAuth());
  };
  render() {
    return (
      <>
        <FFStatusBar />

        <ScrollView style={styles.rectangle}>
          <View style={styles.headerSize}>
            <Image
              source={header}
              style={[styles.headerSize, styles.headerImg]}
            />
            <View style={styles.rowContainer}>
              <Image source={plantMascot} style={styles.plantMascot} />
              <Text style={styles.name}>{this.props.user.firstName}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View>
              <MenuButton
                backgroundImage={details}
                icon={detailsIcon}
                iconStyle={styles.detailsIcon}
                label="Account Details"
                onPress={() => {
                  this.props.navigation.navigate('Account Details');
                }}
              />
            </View>
            <View>
              <MenuButton
                backgroundImage={support}
                icon={supportIcon}
                iconStyle={styles.detailsIcon}
                label="Support"
                onPress={() => {
                  this.setState({displayBrowser: true});
                }}
              />
            </View>
            <View>
              <MenuButton
                backgroundImage={privacy}
                icon={privacyIcon}
                iconStyle={styles.detailsIcon}
                label="Privacy Policy"
                onPress={() => {
                  this.props.navigation.navigate('Privacy Policy');
                }}
              />
            </View>
            <View>
              <MenuButton
                backgroundImage={terms}
                icon={termsIcon}
                iconStyle={styles.detailsIcon}
                label="Terms & Conditions"
                onPress={() => {
                  this.props.navigation.navigate('Terms And Conditions');
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={this.handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
        <BrowserPopUpModal
          uri="http://www.foodfriend.io/contact-us"
          isVisible={this.state.displayBrowser}
          onClose={() => this.setState({displayBrowser: false})}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerSize: {
    width: '100%',
    height: undefined,
    aspectRatio: 1125 / 579,
  },
  headerImg: {
    position: 'absolute',
  },
  rowContainer: {
    height: normalize(190),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    // borderColor: '#000000',
    // borderWidth: 1.0,
  },
  plantMascot: {
    width: normalize(160),
    height: undefined,
    aspectRatio: 1 / 1,
  },
  name: {
    height: normalize(30),
    width: normalize(170),
    color: '#555555',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(18),
  },
  buttonContainer: {
    marginTop: '3%',
    alignSelf: 'center',
    flexDirection: 'row',
    width: normalize(330),
    flexWrap: 'wrap',
  },
  detailsIcon: {
    width: normalize(35),
    height: undefined,
    aspectRatio: 1 / 1,
  },
  signOutButton: {
    marginTop: '5%',
    marginBottom: normalize(100),
    alignSelf: 'center',
    width: normalize(320),
    height: normalize(60),
    backgroundColor: '#aebee6',
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
  },
  signOutText: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(18),
    color: '#ffffff',
    alignSelf: 'center',
  },
  rectangle: {
    backgroundColor: '#ffffff',
    position: 'relative',
    height: '100%',
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AccountMenu);
