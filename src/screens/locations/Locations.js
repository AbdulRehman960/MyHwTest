import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/Button.js';
import English from '../../assets/languages/en.json';
import {COLORS, icons} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import {productSelector, changeTheme} from '../../redux/slices/Products';
import Geolocation from '@react-native-community/geolocation';
import {getLocationPermission} from '../../utils/Permissions';
const Locations = () => {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [data, setData] = useState({});
  const {theme} = useSelector(productSelector);
  const handlegetLocation = () => {
    getLocationPermission(res => {
      if (res == 'granted') {
        Geolocation.getCurrentPosition(info => {
          setData(info.coords);
        });
      }
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme ? 'black' : 'white',
      }}>
      <Button
        title={English.Location}
        txtStyle={theme ? 'white' : 'black'}
        buttonStyle={theme ? styles.signInButton1 : styles.signInButton}
        onPress={() => {
          handlegetLocation();
        }}
      />
      <Text style={[styles.textStyle, {color: theme ? 'white' : 'black'}]}>
        Latitude: {data?.latitude} {'\n'}
        Longitude: {data?.longitude} {'\n'}
        altitude: {data?.altitude} {'\n'}
        accuracy: {data?.accuracy} {'\n'}
      </Text>
    </SafeAreaView>
  );
};

export default Locations;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 18,
    marginTop: 10,
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
