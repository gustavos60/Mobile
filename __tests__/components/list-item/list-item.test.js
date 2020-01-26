import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import ListItem from '../../../src/components/list-item';

const mockedProps = {
  place: {
    latitude: 11,
    longitude: 22,
    name: 'Gustavo',
    uri: 'https://dubsism.files.wordpress.com/2017/12/image-not-found.png?w=547',
  },
};

describe('ListItem tests', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<ListItem {...mockedProps} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
