import React, { useState } from 'react';
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

const PasswordInput = ({
  valid,
  password,
  inputTestId,
  onChangeText,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <View
      style={[
        styles.container,
        { borderColor: valid ? colors.gray : colors.secondary },
      ]}
    >
      <Icon
        style={styles.lockIcon}
        name="lock"
        size={30}
        color="gray"
      />
      <TextInput
        testID={inputTestId}
        value={password}
        secureTextEntry={!visible}
        onChangeText={onChangeText}
        placeholder="Senha"
        style={styles.input}
        autoCompleteType="password"
      />
      <Icon
        testID="password-toggle-visibility"
        style={styles.eyeIcon}
        name="eye"
        size={30}
        onPress={() => setVisible((prevVisible) => !prevVisible)}
        color={visible ? colors.black : colors.gray}
      />
    </View>
  );
};

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
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  lockIcon: {
    marginLeft: 10,
  },
  eyeIcon: {
    marginRight: 10,
  },
});

PasswordInput.propTypes = {
  valid: PropTypes.bool,
  inputTestId: PropTypes.string,
  password: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};

PasswordInput.defaultProps = {
  valid: true,
  inputTestId: '',
};

export default PasswordInput;
