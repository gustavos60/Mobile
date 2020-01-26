import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import TabHeaders from '../components/tab-header';
import ListItem from '../components/list-item';

const ListScreen = ({
  places,
  navigation,
}) => {
  const keyExtractor = useCallback((item) => item.uri + item.name);

  const renderEmptyList = useCallback(() => {
    const message = 'Não há nada aqui, para buscar por locais vá a tela de Mapa.';
    return (
      <View style={styles.emptyContainer}>
        <Text>
          {message}
        </Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <TabHeaders
        title="Locais"
        testID="listHeader"
        navigation={navigation}
      />
      <FlatList
        contentContainerStyle={{ marginTop: 10 }}
        data={places}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmptyList}
        renderItem={({ item }) => <ListItem place={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

ListScreen.navigationOptions = {
  headerShown: false,
};

ListScreen.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    uri: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  places: state.places.places,
});

export default connect(mapStateToProps)(ListScreen);
