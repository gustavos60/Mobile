import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';

import { StackActions, NavigationActions } from 'react-navigation';

import Button from '../components/button';
import EmailInput from '../components/email-input';
import PasswordInput from '../components/password-input';

import colors from '../colors';

import {
  login,
  clearErrors,
  createAccount,
} from '../redux/profile/actions';

import { notEmpty, validEmail } from '../validators';

export const AuthScreen = ({
  user,
  authError,
  loggingIn,
  navigation,
  loginAction,
  creatingAccount,
  clearErrorsAction,
  createAccountAction,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [canValidate, setCanValidate] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Tab' })],
      }));
    }
  }, [user]);

  useEffect(() => {
    if (authError) {
      Alert.alert('Erro', authError);
      setTimeout(clearErrorsAction, 300);
    }
  }, [authError]);

  const handleAuth = useCallback((action) => () => {
    if (!canValidate) setCanValidate(true);
    if (!notEmpty(password) || !validEmail(email)) {
      Alert.alert('Atenção', 'Preencha corretamente os campos obrigatórios.');
      return;
    }
    action(email, password);
  }, [email, password, canValidate]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>
          Reqres.in
        </Text>
      </View>
      <View style={styles.inputsContainer}>
        <EmailInput
          email={email}
          inputTestId="emailInput"
          valid={!canValidate || (validEmail(email))}
          onChangeText={(text) => setEmail(text)}
        />
        <PasswordInput
          password={password}
          inputTestId="passwordInput"
          valid={!canValidate || (notEmpty(password))}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          label="Cadastro"
          testID="signInButton"
          loading={creatingAccount}
          disabled={loggingIn || creatingAccount}
          buttonStyle={{ marginRight: 10 }}
          onPress={handleAuth(createAccountAction)}
        />
        <Button
          label="Login"
          testID="loginButton"
          loading={loggingIn}
          disabled={loggingIn || creatingAccount}
          buttonStyle={{ marginLeft: 10 }}
          onPress={handleAuth(loginAction)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputsContainer: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    height: '30%',
  },
  label: {
    color: colors.white,
    fontSize: 36,
    fontWeight: 'bold',
  },
});

AuthScreen.propTypes = {
  loggingIn: PropTypes.bool,
  creatingAccount: PropTypes.bool,
  user: PropTypes.shape({
    email: PropTypes.string,
    token: PropTypes.string,
    password: PropTypes.string,
  }),
  authError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  loginAction: PropTypes.func.isRequired,
  clearErrorsAction: PropTypes.func.isRequired,
  createAccountAction: PropTypes.func.isRequired,
};

AuthScreen.defaultProps = {
  user: null,
  authError: null,
  loggingIn: false,
  creatingAccount: true,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  authError: state.user.error,
  loggingIn: state.user.loggingIn,
  creatingAccount: state.user.creatingAccount,
});

const mapDispatchToProps = (dispatch) => ({
  clearErrorsAction: () => dispatch(clearErrors()),
  loginAction: (email, password) => dispatch(login(email, password)),
  createAccountAction: (email, password) => dispatch(createAccount(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
