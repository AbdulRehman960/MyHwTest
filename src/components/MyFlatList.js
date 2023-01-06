import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  productSelector,
  getAllProducts,
  clearProductState,
} from '../redux/slices/Products';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
const MyFlatList = props => {
  const {theme} = useSelector(productSelector);
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <View
          style={[
            styles.flatStyle,
            {backgroundColor: props.theme ? 'black' : 'white'},
          ]}>
          <Image
            source={{uri: item.image}}
            resizeMode="contain"
            style={{width: '100%', height: 200, borderRadius: 8}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 8,
            }}>
            <Text
              numberOfLines={1}
              style={{
                width: 170,
                fontSize: 18,
                color: props?.theme ? 'white' : 'black',
              }}>
              Title: {item.title}
            </Text>
            <Text
              style={{fontSize: 18, color: props?.theme ? 'white' : 'black'}}>
              Rs .{item.price}
            </Text>
          </View>

          <Text
            numberOfLines={2}
            style={{fontSize: 16, color: props?.theme ? 'white' : 'black'}}>
            Description : {item.description}
          </Text>
        </View>
      );
    },
    [props.data, props.theme],
  );

  const keyExtractor = useCallback(item => `${item.id}`);

  const itemSeperatorComponent = useCallback(() => {
    return <View style={{height: 20, backgroundColor: 'red'}} />;
  }, [props.data]);

  const onEndReached = () => {
    props.onEndReached();
  };

  const listFooterComponent = useCallback(() => {
    return <ActivityIndicator size="large" style={{marginVertical: 16}} />;
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          data={props.data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeperatorComponent={itemSeperatorComponent}
          onEndReached={onEndReached}
          ListFooterComponent={props.showLoader && listFooterComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyFlatList;
const styles = StyleSheet.create({
  flatStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    backgroundColor: '#FFFFFF',
    padding: 8,
    margin: 2,
    borderRadius: 8,
  },
});
