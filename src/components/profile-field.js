import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import colors from '../colors';

const ProfileField = ({
  label,
  value,
  valid,
  testID,
  canEdit,
  placeholder,
  onChangeText,
  textInputProps,
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      {label}
    </Text>
    {
      canEdit ? (
        <View
          style={[
            styles.inputContainer,
            { borderColor: valid ? colors.gray : colors.secondary },
          ]}
        >
          <TextInput
            value={value}
            testID={testID}
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChangeText}
            {...textInputProps}
          />
        </View>
      ) : <Text style={styles.input}>{value === '' ? '- -' : value}</Text>
    }

  </View>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
  },
  container: {
    padding: 10,
  },
});

ProfileField.propTypes = {
  valid: PropTypes.bool,
  canEdit: PropTypes.bool,
  onChangeText: PropTypes.func,
  testID: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  textInputProps: PropTypes.shape(),
};

ProfileField.defaultProps = {
  testID: '',
  valid: true,
  canEdit: false,
  onChangeText: () => {},
  textInputProps: null,
};

export default ProfileField;
