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
let help = new Helper();
const SignUpScreen = ({navigation}) => {
  const [secureText, setSecureText] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    if (help.isEmptyString(email)) {
      help.showToast('Email is Required');
      return;
    } else if (help.isEmptyString(password)) {
      help.showToast('Password is Required');
      return;
    } else {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
          setLoading(false);
          navigation.reset({index: 0, routes: [{name: 'BottomTabs'}]});
        })
        .catch(error => {
          setLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            help.showAlert(
              'Error',
              'That email address is already in use!',
              'red',
            );
          }

          if (error.code === 'auth/invalid-email') {
            help.showAlert('Error', 'That email address is invalid', 'red');
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
            title={English.SIgnUp}
            buttonStyle={styles.signInButton}
            onPress={() => {
              handleSignUp();
            }}
          />
        </View>
      </View>
    </MainInputTranscluentView>
  );
};

export default SignUpScreen;

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
