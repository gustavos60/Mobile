import * as PlacesTypes from './types';
import apiKey from '../../config';

const initialState = {
  fetchingPlaces: false,
  fetchPlacesError: null,
  places: [],
};

const parsePlaces = (places) => places.map((place) => {
  const { name, geometry, photos } = place;
  const longitude = (
    geometry
    && geometry.location
  ) ? geometry.location.lng : 0;
  const latitude = (
    geometry
    && geometry.location
  ) ? geometry.location.lat : 0;
  const ref = (photos && photos[0] && photos[0].photo_reference) ? photos[0].photo_reference : null;
  const uri = ref
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${ref}&key=${apiKey}`
    : 'https://dubsism.files.wordpress.com/2017/12/image-not-found.png?w=547';
  return {
    longitude,
    latitude,
    name,
    uri,
  };
});


const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PlacesTypes.FETCHING_PLACES:
      return {
        ...state,
        fetchingPlaces: true,
      };

    case PlacesTypes.FETCH_PLACES_SUCCESS:
      return {
        ...state,
        places: parsePlaces(action.payload),
        fetchingPlaces: false,
        fetchPlacesError: null,
      };

    case PlacesTypes.FETCH_PLACES_FAILURE:
      return {
        ...state,
        fetchingPlaces: false,
        fetchPlacesError: action.payload,
      };

    case PlacesTypes.CLEAR_PLACES_ERROR:
      return {
        ...state,
        fetchPlacesError: null,
      };

    default:
      return state;
  }
};

export default placesReducer;
