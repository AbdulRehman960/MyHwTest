import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {COLORS} from '../constants';
const Button = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 10,
          marginBottom: 10,
          ...props.buttonStyle,
        },
      ]}
      disabled={props?.loading ? props?.loading : props.disabled}
      onPress={() => props.onPress()}>
      {props?.loading ? null : (
        <View style={{...props.RIconStyle}}>{props.RIcon}</View>
      )}
      <View>
        {props.loading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Poppins-SemiBoldItalic',
              color: COLORS.white,
              alignSelf: 'center',
              ...props.txtStyle,
            }}>
            {props.title}
          </Text>
        )}
      </View>
      {props?.loading ? null : (
        <View style={{...props.LIconStyle}}>{props.LIcon}</View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
