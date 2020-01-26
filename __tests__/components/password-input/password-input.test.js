import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import PasswordInput from '../../../src/components/password-input';

const mockedProps = {
  password: '',
  onChangeText: jest.fn(),
};

describe('PasswordInput tests', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<PasswordInput {...mockedProps} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct border color when invalid', () => {
    const wrapper = shallow(<PasswordInput {...mockedProps} valid={false} />);
    const View = wrapper.find('View').first();
    const { style } = View.props();
    expect(style[1].borderColor).toEqual('#ff000A');
  });

  it('should have correct border color when valid', () => {
    const wrapper = shallow(<PasswordInput {...mockedProps} valid />);
    const View = wrapper.find('View').first();
    const { style } = View.props();
    expect(style[1].borderColor).toEqual('gray');
  });
});
