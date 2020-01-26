import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import ProfileField from '../../../src/components/profile-field';

const mockedProps = {
  label: 'Nome',
  value: 'Gustavo',
  placeholder: 'Nome',
};

describe('ProfileField tests', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<ProfileField {...mockedProps} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should hide text input when not in edit mode', () => {
    const wrapper = shallow(<ProfileField {...mockedProps} canEdit={false} />);
    const TextInput = wrapper.find('TextInput').first();
    expect(TextInput.exists()).toBeFalsy();
  });

  it('should show text input when in edit mode', () => {
    const wrapper = shallow(<ProfileField {...mockedProps} canEdit />);
    const TextInput = wrapper.find('TextInput').first();
    expect(TextInput.exists()).toBeTruthy();
  });
});
