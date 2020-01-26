import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import EmailInput from '../../../src/components/email-input';

const mockedProps = {
  email: '',
  onChangeText: jest.fn(),
};

describe('email-input tests', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<EmailInput {...mockedProps} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct border color when invalid', () => {
    const wrapper = shallow(<EmailInput {...mockedProps} valid={false} />);
    const View = wrapper.find('View').first();
    const { style } = View.props();
    expect(style[1].borderColor).toEqual('#ff000A');
  });

  it('should have correct border color when valid', () => {
    const wrapper = shallow(<EmailInput {...mockedProps} valid />);
    const View = wrapper.find('View').first();
    const { style } = View.props();
    expect(style[1].borderColor).toEqual('gray');
  });
});
