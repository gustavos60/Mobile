import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  View,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Button from '../components/button';
import TabHeaders from '../components/tab-header';
import ProfileField from '../components/profile-field';

import {
  clearErrors,
  updateProfile,
} from '../redux/profile/actions';

import colors from '../colors';
import { notEmpty, validEmail } from '../validators';

const ProfileScreen = ({
  user,
  error,
  loading,
  navigation,
  clearErrorsAction,
  updateProfileAction,
}) => {
  const [profile, setProfile] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const [canValidate, setCanValidate] = useState(false);

  useEffect(() => {
    setProfile(user);
  }, [user]);

  useEffect(() => {
    if (error) {
      Alert.alert('Erro', error);
      setTimeout(clearErrorsAction, 300);
    }
  }, [error, clearErrorsAction]);

  const cancelEdit = useCallback(() => {
    setProfile(user);
    setCanEdit(false);
  }, [user]);

  const updateUser = useCallback(() => {
    if (!profile.email || profile.email.length === 0) {
      if (!canValidate) setCanValidate(true);
      Alert.alert('Atenção', 'Preencha corretamente os campos obrigatórios.');
      return;
    }
    updateProfileAction(profile)
      .then(() => setCanEdit(false));
  }, [profile, canValidate]);

  const renderButtons = useCallback(() => {
    if (!canEdit) {
      return (
        <View style={styles.buttonsContainer}>
          <Button
            testID="profileEditButton"
            label="Editar"
            onPress={() => setCanEdit(true)}
          />
        </View>
      );
    }
    return (
      <View style={styles.buttonsContainer}>
        <Button
          testID="profileCancelButton"
          label="Cancelar"
          disabled={loading}
          buttonStyle={{ backgroundColor: colors.secondary }}
          onPress={cancelEdit}
        />
        <Button
          testID="profileUpdateButton"
          label="Atualizar"
          loading={loading}
          disabled={loading}
          onPress={updateUser}
        />
      </View>
    );
  }, [canEdit, loading, cancelEdit, updateUser]);


  return (
    <View style={{ flex: 1 }}>
      <TabHeaders
        title="Perfil"
        testID="profileHeader"
        navigation={navigation}
      />
      <ScrollView>
        <ProfileField
          testID="profileNameInput"
          label={`Nome${canEdit ? ' *' : ''}`}
          canEdit={canEdit}
          valid={notEmpty(profile.name)}
          placeholder="Nome"
          value={profile.name || ''}
          onChangeText={(name) => setProfile({ ...profile, name })}
        />
        <ProfileField
          testID="profileEmailInput"
          label={`E-mail${canEdit ? ' *' : ''}`}
          canEdit={canEdit}
          placeholder="E-mail"
          valid={validEmail(profile.email)}
          value={profile.email || ''}
          onChangeText={(email) => setProfile({ ...profile, email })}
          textInputProps={{
            autoCompleteType: 'email',
            keyboardType: 'email-address',
          }}
        />
        <ProfileField
          testID="profileJobInput"
          label="Profissão"
          canEdit={canEdit}
          placeholder="Profissão"
          value={profile.job || ''}
          onChangeText={(job) => setProfile({ ...profile, job })}
        />
        <ProfileField
          testID="profileCountryInput"
          label="País"
          canEdit={canEdit}
          placeholder="País"
          value={profile.country || ''}
          onChangeText={(country) => setProfile({ ...profile, country })}
        />
        {renderButtons()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

ProfileScreen.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  user: PropTypes.shape({
    job: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    country: PropTypes.string,
  }),
  loading: PropTypes.bool,
  clearErrorsAction: PropTypes.func.isRequired,
  updateProfileAction: PropTypes.func.isRequired,
};

ProfileScreen.defaultProps = {
  user: null,
  error: null,
  loading: false,
};

ProfileScreen.navigationOptions = {
  tabBarTestID: 'profileTabIcon',
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  error: state.user.error,
  loading: state.user.updatingProfile,
});

const mapDispatchToProps = (dispatch) => ({
  clearErrorsAction: () => dispatch(clearErrors()),
  updateProfileAction: (body) => dispatch(updateProfile(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
