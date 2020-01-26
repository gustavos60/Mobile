import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ViewPropTypes,
} from 'react-native';
import colors from '../colors';

const Button = ({
  label,
  testID,
  onPress,
  loading,
  disabled,
  labelStyle,
  buttonStyle,
}) => (
  <TouchableOpacity
    testID={testID}
    onPress={onPress}
    style={[styles.button, buttonStyle]}
    activeOpacity={0.7}
    disabled={disabled}
  >
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>
        {label}
      </Text>
      {
        loading ? (
          <ActivityIndicator
            size="small"
            color="white"
            style={styles.loading}
          />
        ) : null
      }
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 55,
    borderRadius: 30,
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 16,
    color: colors.white,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loading: {
    position: 'absolute',
    right: 15,
    bottom: 0,
    top: 0,
  },
});

Button.propTypes = {
  label: PropTypes.string,
  loading: PropTypes.bool,
  testID: PropTypes.string,
  disabled: PropTypes.bool,
  labelStyle: ViewPropTypes.style,
  buttonStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  label: '',
  testID: '',
  loading: false,
  disabled: false,
  labelStyle: null,
  buttonStyle: null,
  onPress: () => {},
};

export default Button;
