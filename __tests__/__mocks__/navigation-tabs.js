jest.mock('react-navigation-tabs', () => () => ({
  ThemeColors: {},
  createBottomTabNavigator: jest.fn(),
}));
