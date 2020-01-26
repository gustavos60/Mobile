jest.mock('react-navigation', () => () => {
  const NavigationContainer = () => null;

  return () => ({
    createAppContainer: jest.fn().mockReturnValue(NavigationContainer),
    createDrawerNavigator: jest.fn(),
    createMaterialTopTabNavigator: jest.fn(),
    createStackNavigator: jest.fn(),
    StackActions: {
      push: jest.fn().mockImplementation((x) => ({ ...x, type: 'Navigation/PUSH' })),
      replace: jest.fn().mockImplementation((x) => ({ ...x, type: 'Navigation/REPLACE' })),
      reset: jest.fn().mockImplementation((x) => ({ ...x, type: 'Navigation/RESET' })),
    },
    NavigationActions: {
      navigate: jest.fn().mockImplementation((x) => x),
    },
    ThemeColors: {

    },
  });
});
