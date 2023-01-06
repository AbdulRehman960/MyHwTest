import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, View, SafeAreaView, Image} from 'react-native';
import {Header as HeaderRNE} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {constants, images, FONTS, SIZES, COLORS} from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class Header extends Component {
  render() {
    return (
      <HeaderRNE
        containerStyle={{
          backgroundColor: '#CEFFF1',
          borderBottomWidth: 0,
          justifyContent: 'flex-start',
          borderBottomLeftRadius: 14,
          borderBottomRightRadius: 14,
        }}
        leftComponent={
          this.props.LeftIcon ? (
            <TouchableOpacity
              onPress={() => {
                this.props.navi.goBack();
              }}
              style={{height: 30, width: 30}}>
              <Image
                source={this.props.LeftIcon}
                resizeMode="contain"
                style={{height: 21, width: 22}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                height: 30,
                width: this.props.leftWidth ? this.props.leftWidth : 150,
              }}>
              <Text style={FONTS.h2}>{this.props.LeftText}</Text>
            </TouchableOpacity>
          )
        }
        centerComponent={
          <View>
            {this.props.Text && (
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Londrina Solid',
                  color: this.props.TextColor
                    ? this.props.TextColor
                    : COLORS.primary,
                  fontWeight: 'bold',
                }}>
                {this.props.Text}
              </Text>
            )}
            {/* <Image resizeMode='contain' source={images.Logo} style={{ height: 80, width: 100 }} /> */}
          </View>
        }
        rightComponent={
          this.props.RightIcon1 && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => {}} style={{}}>
                <Image
                  source={this.props.RightIcon1}
                  resizeMode="contain"
                  style={{height: 29, width: 29}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { this.props.navi.navigate('Settings')}}
                style={{marginLeft: 18, marginRight: 20}}>
                <Image
                  source={this.props.RightIcon2}
                  resizeMode="contain"
                  style={{height: 29, width: 29}}
                />
              </TouchableOpacity>
            </View>
          )
        }
      />
    );
  }
}
