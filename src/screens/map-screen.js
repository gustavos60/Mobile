import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TabHeaders from '../components/tab-header';
import GoogleMaps from '../components/map';

import { fetchPlaces, clearPlacesError } from '../redux/places/actions';
import colors from '../colors';
import Button from '../components/button';

const geoConfig = {
  timeout: 20000,
  maximumAge: 10000,
  enableHighAccuracy: false,
};

let isMounted;

const MapScreen = ({
  error,
  loading,
  navigation,
  clearErrors,
  fetchNearPlaces,
}) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (error) {
      Alert.alert('Erro', error);
      setTimeout(clearErrors, 300);
    }
  }, [error]);

  const getUserLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        if (isMounted) setLocation(position.coords);
      },
      (err) => Alert.alert(err.message),
      geoConfig,
    );
  }, []);

  useEffect(() => {
    getUserLocation();
    isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (location) fetchNearPlaces(location);
  }, [location]);

  const renderMap = useCallback(() => {
    if (!location) return null;
    const region = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    };
    return <GoogleMaps region={region} />;
  }, [location]);

  const renderRefreshButton = useCallback(() => {
    if (!location) return null;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.refresh}
        disabled={loading}
        onPress={() => fetchNearPlaces(location)}
      >
        {
          loading
            ? <ActivityIndicator size="small" color="white" />
            : <Icon color={colors.white} size={30} name="refresh" />
        }
      </TouchableOpacity>
    );
  }, [location, fetchNearPlaces]);

  const renderRetryLocation = useCallback(() => {
    if (location) return null;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>
          Não foi possível obter sua localização.
        </Text>
        <Button
          testID="retryLocationButton"
          label="Tentar novamente"
          onPress={getUserLocation}
        />
      </View>
    );
  }, [location, getUserLocation]);

  return (
    <View style={{ flex: 1 }}>
      <TabHeaders
        title="Mapa"
        testID="mapHeader"
        navigation={navigation}
      />
      {renderMap()}
      {renderRetryLocation()}
      {renderRefreshButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  refresh: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    zIndex: 1,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

MapScreen.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  clearErrors: PropTypes.func.isRequired,
  fetchNearPlaces: PropTypes.func.isRequired,
};

MapScreen.defaultProps = {
  error: null,
  loading: false,
};

const mapStateToProps = (state) => ({
  loading: state.places.fetchingPlaces,
  error: state.places.fetchPlacesError,
});

const mapDispatchToProps = (dispatch) => ({
  clearErrors: () => dispatch(clearPlacesError()),
  fetchNearPlaces: (location) => dispatch(fetchPlaces(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
