/* eslint-disable react/prop-types */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MapScreen from '../screens/map-screen';
import ListScreen from '../screens/list-screen';
import ProfileScreen from '../screens/profile-screen';
import colors from '../colors';

const TabNavigator = createBottomTabNavigator({
  Map: MapScreen,
  List: ListScreen,
  Profile: ProfileScreen,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      const color = focused ? colors.secondary : colors.primary;
      let iconName;
      switch (routeName) {
        case 'Map':
          iconName = 'google-maps';
          break;
        case 'List':
          iconName = 'format-list-bulleted';
          break;
        case 'Profile':
          iconName = 'account';
          break;
        default:
          break;
      }
      return <Icon color={color} name={iconName} size={30} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: colors.secondary,
    inactiveTintColor: colors.primary,
    showLabel: false,
  },
});

export default createAppContainer(TabNavigator);
