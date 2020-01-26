import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AuthScreen from '../screens/auth-screen';
import TabNavigator from './tab-navigator';

const MainNavigator = createStackNavigator({
  Auth: { screen: AuthScreen },
  Tab: { screen: TabNavigator },
}, {
  headerMode: 'screen',
  initialRouteName: 'Auth',
  defaultNavigationOptions: {
    headerShown: false,
  },
});

export default createAppContainer(MainNavigator);
