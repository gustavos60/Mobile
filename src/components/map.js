import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';

export const GoogleMap = ({
  region,
  places,
}) => (
  <MapView
    initialRegion={region}
    style={{ flex: 1 }}
    maxZoomLevel={40}
  >
    {places.map((place) => (
      <Marker
        key={`${place.name}+${place.latitude}`}
        title={place.name}
        coordinate={{
          latitude: place.latitude,
          longitude: place.longitude,
        }}
      />
    ))}
  </MapView>
);

GoogleMap.propTypes = {
  region: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }).isRequired,
  places: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

GoogleMap.defaultProps = {
  places: null,
};

const mapStateToProps = (state) => ({
  places: state.places.places,
});

export default connect(mapStateToProps)(GoogleMap);
