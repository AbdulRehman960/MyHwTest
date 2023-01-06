import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../constants';
const Input = props => {
  const [secureText, setSecureText] = useState(true);
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 200,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: COLORS.darkBlue,
        ...props.bgStyle,
      }}>
      {props.LeftIcon ? (
        <View
          style={{
            marginLeft: 12,
            alignItems: 'center',
            justifyContent: 'center',
            ...props.leftIconStyle,
          }}>
          <Image source={props.LeftIcon} style={{height: 25, width: 25}} />
        </View>
      ) : null}

      <TextInput
        style={{
          flex: 1,
          fontSize: 15,
          fontFamily: 'Poppins-Regular',
          marginTop: 5,
          marginLeft: 5,
        }}
        secureTextEntry={props.secureText}
        value={props.val}
        placeholder={props.placeholder}
        placeholderTextColor={'black'}
        editable={props.edit}
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        autoCorrect={false}
        onChangeText={txt => handleonTextChange(txt)}
      />
      {props.RightIcon ? (
        <TouchableOpacity
          style={{marginRight: 12, ...props.rightIconStyle}}
          onPress={() => {
            // setSecureText(!secureText);
          }}>
          <Image source={props.RightIcon} style={{height: 25, width: 25}} />
        </TouchableOpacity>
      ) : null}
    </View>
  );

  function handleonTextChange(txt) {
    props.onChangeText(txt);
  }
};

export default Input;
