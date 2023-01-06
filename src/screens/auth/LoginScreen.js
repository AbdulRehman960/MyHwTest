import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../../components/Button.js';
import English from '../../assets/languages/en.json';
import {COLORS, icons} from '../../constants';
import MainInputTranscluentView from '../../components/MainInputView';
import InputText from '../../components/InputText.js';
import LoadingPage from '../../components/LoadingPage.js';
import auth from '@react-native-firebase/auth';
import Helper from '../../utils/Helper';
import {TouchableOpacity} from 'react-native-gesture-handler';
let help = new Helper();
const LoginScreen = ({navigation}) => {
  const [secureText, setSecureText] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    if (help.isEmptyString(email)) {
      help.showToast('Email is Required');
      return;
    } else if (help.isEmptyString(password)) {
      help.showToast('Password is Required');
      return;
    } else {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(result => {
          setLoading(false);
          navigation.reset({index: 0, routes: [{name: 'BottomTabs'}]});
        })
        .catch(error => {
          setLoading(false);
          if (error.code === 'auth/wrong-password') {
            help.showAlert(
              'Error',
              'The password is invalid or the user does not have a password',
              'red',
            );
          }
          if (error.code === 'auth/invalid-email') {
            help.showAlert('Error', 'That email address is invalid', 'red');
          }
          if (error.code === 'auth/user-not-found') {
            help.showAlert(
              'Error',
              'There is no user record corresponding to this identifier',
              'red',
            );
          }
        });
    }
  };

  return (
    <MainInputTranscluentView>
      <View style={{flex: 1}}>
        {loading && <LoadingPage />}
        <View style={styles.imageView}>
          <Image source={icons.Splash_Img} style={styles.image} />
        </View>
        <View style={{flex: 1}}>
          <InputText
            placeholder="Email"
            onChangeText={txt => {
              setEmail(txt);
            }}
          />
          <InputText
            placeholder="Password"
            secureText={true}
            onChangeText={txt => {
              setPassword(txt);
            }}
          />

          <Button
            title={English.Login}
            buttonStyle={styles.signInButton}
            onPress={() => {
              handleSignIn();
            }}
          />
          <TouchableOpacity
            style={{alignSelf: 'center', marginTop: 30}}
            onPress={() => navigation.navigate('SignUpScreen')}>
            <Text>Don`t Have Account? SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainInputTranscluentView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  imageView: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {height: 140, width: 140, borderRadius: 10},
  signInButton: {
    backgroundColor: COLORS.darkBlue,
    marginHorizontal: 18,
    borderRadius: 200,
    height: 56,
  },
});
