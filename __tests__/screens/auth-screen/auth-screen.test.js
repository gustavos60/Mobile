import 'react-native';
import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import { AuthScreen } from '../../../src/screens/auth-screen';

const mockedProps = {
  user: null,
  authError: null,
  loggingIn: false,
  creatingAccount: false,
  navigation: {
    dispatch: jest.fn(),
  },
  loginAction: jest.fn(),
  clearErrorsAction: jest.fn(),
  createAccountAction: jest.fn(),
};

describe('AuthScreen tests', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<AuthScreen {...mockedProps} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should disable login button when logging in', () => {
    const wrapper = shallow(<AuthScreen {...mockedProps} loggingIn />);
    const View = wrapper.findWhere((node) => node.prop('testID') === 'loginButton');
    const { disabled } = View.props();
    expect(disabled).toBeTruthy();
  });

  it('should disable signIn button when logging in', () => {
    const wrapper = shallow(<AuthScreen {...mockedProps} loggingIn />);
    const View = wrapper.findWhere((node) => node.prop('testID') === 'signInButton');
    const { disabled } = View.props();
    expect(disabled).toBeTruthy();
  });

  it('should disable login button when creating account', () => {
    const wrapper = shallow(<AuthScreen {...mockedProps} creatingAccount />);
    const View = wrapper.findWhere((node) => node.prop('testID') === 'loginButton');
    const { disabled } = View.props();
    expect(disabled).toBeTruthy();
  });

  it('should disable signIn button when creating account', () => {
    const wrapper = shallow(<AuthScreen {...mockedProps} creatingAccount />);
    const View = wrapper.findWhere((node) => node.prop('testID') === 'signInButton');
    const { disabled } = View.props();
    expect(disabled).toBeTruthy();
  });

  it('should call login action when clicking on login with valid email and password', () => {
    const loginAction = jest.fn();
    const wrapper = mount(<AuthScreen {...mockedProps} loginAction={loginAction} />);
    const emailInput = wrapper.findWhere((node) => node.prop('testID') === 'emailInput').last();
    const passwordInput = wrapper.findWhere((node) => node.prop('testID') === 'passwordInput').last();
    emailInput.props().onChangeText('gustavo@email.com');
    passwordInput.props().onChangeText('123412341');
    const loginButton = wrapper.findWhere((node) => node.prop('testID') === 'loginButton').last();
    loginButton.props().onClick();
    expect(loginAction).toHaveBeenCalled();
  });

  it('should call login action when clicking on login with invalid email', () => {
    const loginAction = jest.fn();
    const wrapper = mount(<AuthScreen {...mockedProps} loginAction={loginAction} />);
    const emailInput = wrapper.findWhere((node) => node.prop('testID') === 'emailInput').last();
    const passwordInput = wrapper.findWhere((node) => node.prop('testID') === 'passwordInput').last();
    emailInput.props().onChangeText('gustavo');
    passwordInput.props().onChangeText('123412341');
    const loginButton = wrapper.findWhere((node) => node.prop('testID') === 'loginButton').last();
    loginButton.props().onClick();
    expect(loginAction).toHaveBeenCalledTimes(0);
  });
});
