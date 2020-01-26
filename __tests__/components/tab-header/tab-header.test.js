import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import { TabHeader } from '../../../src/components/tab-header';

const mockedProps = {
  title: 'Perfil',
  testID: 'perfilHeader',
  navigation: {
    dispatch: jest.fn(),
  },
  logoutAction: jest.fn(),
};

describe('TabHeader tests', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<TabHeader {...mockedProps} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
