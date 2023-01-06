import {
  View,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function MainInputView(props) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 1, marginHorizontal: 16, marginTop: 5}}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS == 'ios' ? 45 : 10}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {props.children}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
