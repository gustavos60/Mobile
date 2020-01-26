import placesApi from '../../services/places-api';
import * as PlacesTypes from './types';
import apiKey from '../../config';

const radius = 500;

const fetchingPlaces = () => ({
  type: PlacesTypes.FETCHING_PLACES,
});

const fetchPlacesSuccess = (payload) => ({
  type: PlacesTypes.FETCH_PLACES_SUCCESS,
  payload,
});

const fetchPlacesFailure = (payload) => ({
  type: PlacesTypes.FETCH_PLACES_FAILURE,
  payload,
});

export const fetchPlaces = ({ latitude, longitude }) => async (dispatch) => {
  try {
    dispatch(fetchingPlaces());
    const response = await placesApi.get(`json?key=${apiKey}&radius=${radius}&location=${latitude},${longitude}`);
    dispatch(fetchPlacesSuccess(response.results || response));
  } catch (error) {
    dispatch(fetchPlacesFailure(error));
  }
};

export const clearPlacesError = () => ({
  type: PlacesTypes.CLEAR_PLACES_ERROR,
});
