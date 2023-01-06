import {StyleSheet, Text, View, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import Button from '../../components/Button.js';
import English from '../../assets/languages/en.json';
import {COLORS, icons} from '../../constants';
import LoadingPage from '../../components/LoadingPage';
import {useSelector, useDispatch} from 'react-redux';
import {productSelector, changeTheme} from '../../redux/slices/Products';
const Settings = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
  const {theme} = useSelector(productSelector);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setEmail(user?.email);
        setId(user?.uid);
      }
    });
  }, []);

  const handleLogout = () => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      })
      .catch(err => {
        setLoading(false);
      });
  };
  const toggleSwitch = val => {
    setIsEnabled(!isEnabled);
    dispatch(changeTheme(val));
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme ? 'black' : 'white'}}>
      <View style={{flex: 1}}>
        {loading && <LoadingPage />}
        <View style={{marginTop: 90, marginHorizontal: 16, marginBottom: 30}}>
          <Text style={[styles.textStyle, {color: theme ? 'white' : 'black'}]}>
            ID : {id}
          </Text>
          <Text style={[styles.textStyle, {color: theme ? 'white' : 'black'}]}>
            Email : {email}{' '}
          </Text>
        </View>
        <Button
          title={English.Logout}
          txtStyle={theme ? 'white' : 'black'}
          buttonStyle={theme ? styles.signInButton1 : styles.signInButton}
          onPress={() => {
            handleLogout();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 16,
            marginTop: 20,
          }}>
          <Text style={[styles.textStyle, {color: theme ? 'white' : 'black'}]}>
            Theme
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={val => {
              toggleSwitch(val);
            }}
            value={isEnabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: COLORS.darkBlue,
    marginHorizontal: 18,
    borderRadius: 200,
    height: 56,
  },
  signInButton1: {
    backgroundColor: COLORS.blue,
    marginHorizontal: 18,
    borderRadius: 200,
    height: 56,
  },
});
