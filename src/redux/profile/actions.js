import authApi from '../../services/auth-api';
import * as ProfileTypes from './types';

const loggingIn = () => ({
  type: ProfileTypes.LOGGING_IN,
});

const loginSuccess = (payload) => ({
  type: ProfileTypes.LOGIN_SUCCESS,
  payload,
});

const loginFailure = (payload) => ({
  type: ProfileTypes.LOGIN_FAILURE,
  payload,
});

const creatingAccount = () => ({
  type: ProfileTypes.CREATING_ACCOUNT,
});

const createAccountSuccess = (payload) => ({
  type: ProfileTypes.CREATE_ACCOUNT_SUCCESS,
  payload,
});

const createAccountFailure = (payload) => ({
  type: ProfileTypes.CREATE_ACCOUNT_FAILURE,
  payload,
});

const updatingProfile = () => ({
  type: ProfileTypes.UPDATING_PROFILE,
});

const updateProfileSuccess = (payload) => ({
  type: ProfileTypes.UPDATE_PROFILE_SUCCESS,
  payload,
});

const updateProfileFailure = (payload) => ({
  type: ProfileTypes.UPDATE_PROFILE_FAILURE,
  payload,
});

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loggingIn());
    const response = await authApi.post('login', { email, password });
    dispatch(loginSuccess({ id: 1, email, ...response }));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const createAccount = (email, password) => async (dispatch) => {
  try {
    dispatch(creatingAccount());
    const response = await authApi.post('register', { email, password });
    dispatch(createAccountSuccess({ email, ...response }));
  } catch (error) {
    dispatch(createAccountFailure(error));
  }
};

export const updateProfile = (user) => async (dispatch) => {
  try {
    dispatch(updatingProfile());
    const response = await authApi.post(`users/${user.id}`, user);
    dispatch(updateProfileSuccess(response));
  } catch (error) {
    dispatch(updateProfileFailure(error));
  }
};

export const logout = () => ({
  type: ProfileTypes.LOGOUT,
});

export const clearErrors = () => ({
  type: ProfileTypes.CLEAR_ERRORS,
});
