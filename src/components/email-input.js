import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../colors';

const DEVICE_WIDTH = Dimensions.get('screen').width;

const EmailInput = ({
  valid,
  email,
  inputTestId,
  onChangeText,
}) => (
  <View
    style={[
      styles.container,
      { borderColor: valid ? colors.gray : colors.secondary },
    ]}
  >
    <Icon
      style={styles.icon}
      name="email"
      size={30}
      color="gray"
    />
    <TextInput
      testID={inputTestId}
      value={email}
      keyboardType="email-address"
      onChangeText={onChangeText}
      placeholder="Email"
      style={styles.input}
      autoCompleteType="email"
    />
  </View>
);

const styles = StyleSheet.create({
  input: {
    padding: 10,
    fontSize: 18,
    flex: 1,
  },
  container: {
    margin: 10,
    width: DEVICE_WIDTH * 0.80,
    borderWidth: 1,
    borderColor: colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  icon: {
    marginLeft: 10,
  },
});

EmailInput.propTypes = {
  valid: PropTypes.bool,
  inputTestId: PropTypes.string,
  email: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};

EmailInput.defaultProps = {
  valid: true,
  inputTestId: '',
};

export default EmailInput;
