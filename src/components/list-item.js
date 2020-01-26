import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

const ListItem = ({
  place,
}) => (
  <View style={styles.container}>
    <Image style={styles.image} source={{ uri: place.uri }} />
    <View>
      <Text style={styles.name}>
        {place.name}
      </Text>
      <Text style={styles.text}>
        Latitude:
        {' '}
        {place.latitude}
      </Text>
      <Text style={styles.text}>
        Longitude:
        {' '}
        {place.longitude}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    height: '90%',
    width: '30%',
    borderRadius: 10,
    marginRight: 10,
  },
  text: {
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    marginBottom: 5,
    overflow: 'visible',
  },
});

ListItem.propTypes = {
  place: PropTypes.shape({
    uri: PropTypes.string,
    name: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};

ListItem.defaultProps = {
  place: null,
};

export default ListItem;
