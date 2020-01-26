import * as ProfileTypes from './types';

const initialState = {
  loggingIn: false,
  creatingAccount: false,
  updatingProfile: false,
  error: null,
  user: {},
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProfileTypes.LOGGING_IN:
      return { ...state, loggingIn: true };

    case ProfileTypes.CREATING_ACCOUNT:
      return { ...state, creatingAccount: true };

    case ProfileTypes.UPDATING_PROFILE:
      return { ...state, updatingProfile: true };

    case ProfileTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loggingIn: false,
      };

    case ProfileTypes.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        creatingAccount: false,
      };

    case ProfileTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        error: null,
        updatingProfile: false,
      };

    case ProfileTypes.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.payload,
      };

    case ProfileTypes.CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        creatingAccount: false,
        error: action.payload,
      };

    case ProfileTypes.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        updatingProfile: false,
        error: action.payload,
      };

    case ProfileTypes.LOGOUT:
      return {
        ...state,
        user: {},
      };

    case ProfileTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default profileReducer;
