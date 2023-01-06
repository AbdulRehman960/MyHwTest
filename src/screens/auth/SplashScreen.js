import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {icons} from '../../constants';
import auth from '@react-native-firebase/auth';
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (!user) {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        }, 3000);
      } else {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'BottomTabs'}],
          });
        }, 3000);
      }
    });
    return subscriber;
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        resizeMode="contain"
        source={icons.Splash_Img}
        style={{height: 200, width: 200, borderRadius: 10}}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
