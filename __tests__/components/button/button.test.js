import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Button from '../../../src/components/button';

const mockedProps = {
  label: 'Butao',
};

describe('Button tests', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<Button {...mockedProps} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should show activity indicator when loading', () => {
    const wrapper = shallow(<Button {...mockedProps} loading />);
    const View = wrapper.find('ActivityIndicator').first();
    expect(View.exists()).toBeTruthy();
  });

  it('should hide activity indicator when not loading', () => {
    const wrapper = shallow(<Button {...mockedProps} loading={false} />);
    const View = wrapper.find('ActivityIndicator').first();
    expect(View.exists()).toBeFalsy();
  });
});
