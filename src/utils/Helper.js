import {Alert, Linking} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {COLORS} from '../constants';
export default class Helper {
  Condition = true; // Condition to switch b/w API == true and Firebase == false.

  isEmptyString(str) {
    return str == '' || !str;
  }

  isEmptyArray(arr) {
    return !arr || arr.length == 0;
  }

  isValidEmail(email) {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isValidPhoneNumber(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
  }
  isValidPassword(password) {
    let re =
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$_&-+-()/="':;?,.<>%^&*])[a-zA-Z0-9!@#$_&-+-()/="':;?,.<>%^&*]{8,100}$/;
    return password.match(re);
  }

  showToast(message) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: COLORS.darkBlue,
      textColor: 'white',
      action: {
        text: 'Ok',
        textColor: 'white',
      },
    });
  }

  showAlert(title, msg, color, onPress) {
    // Alert.alert(title, msg, [{ text: 'TryAgain', style: 'cancel',onPress={onPress} }]);
    Alert.alert(title, msg, [
      {
        text: 'Ok',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  }
}
