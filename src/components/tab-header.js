import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackActions, NavigationActions } from 'react-navigation';

import { logout } from '../redux/profile/actions';

import colors from '../colors';

export const TabHeader = ({
  title,
  testID,
  navigation,
  logoutAction,
}) => (
  <View style={styles.header}>
    <Text
      style={styles.title}
      testID={testID}
    >
      {title}
    </Text>
    <TouchableOpacity
      testID="logoutButton"
      style={styles.logout}
      activeOpacity={0.7}
      onPress={() => {
        logoutAction();
        navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Auth' })],
        }));
      }}
    >
      <Icon
        name="logout"
        color={colors.white}
        size={30}
      />
    </TouchableOpacity>
  </View>
);

TabHeader.propTypes = {
  title: PropTypes.string,
  testID: PropTypes.string,
  logoutAction: PropTypes.func.isRequired,
};

TabHeader.defaultProps = {
  title: '',
  testID: '',
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    height: 90,
  },
  title: {
    fontSize: 28,
    color: colors.white,
    fontWeight: 'bold',
  },
  logout: {
    position: 'absolute',
    right: 20,
    top: 30,
  },
});

const mapDispatchToProps = (dispatch) => ({
  logoutAction: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(TabHeader);
