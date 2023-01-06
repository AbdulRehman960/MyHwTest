import {StatusBar, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Products from '../screens/products/Products';
import Locations from '../screens/locations/Locations';
import Settings from '../screens/settings/Settings';
import {COLORS, icons} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import {productSelector, changeTheme} from '../redux/slices/Products';
const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  const {theme} = useSelector(productSelector);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          title: 'Product',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop: 10,
              }}>
              <Image
                source={icons.Product_Img}
                resizeMode="contain"
                style={{
                  width: 19.04,
                  height: 20,
                  tintColor: focused ? 'red' : COLORS.darkBlue,
                }}
              />
              <Text
                style={{
                  color: focused ? 'red' : COLORS.darkBlue,
                  fontSize: 10,
                  fontWeight: '500',
                }}>
                Product
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Locations"
        component={Locations}
        options={{
          title: 'Location',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop: 10,
              }}>
              <Image
                source={icons.Location_Img}
                resizeMode="contain"
                style={{
                  width: 19.04,
                  height: 20,
                  tintColor: focused ? 'red' : COLORS.darkBlue,
                }}
              />
              <Text
                style={{
                  color: focused ? 'red' : COLORS.darkBlue,
                  fontSize: 10,
                  fontWeight: '500',
                }}>
                Location
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop: 10,
              }}>
              <Image
                source={icons.Settings_Img}
                resizeMode="contain"
                style={{
                  width: 19.04,
                  height: 20,
                  tintColor: focused ? 'red' : COLORS.darkBlue,
                }}
              />
              <Text
                style={{
                  color: focused ? 'red' : COLORS.darkBlue,
                  fontSize: 10,
                  fontWeight: '500',
                }}>
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
