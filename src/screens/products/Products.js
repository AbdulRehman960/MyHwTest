import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  productSelector,
  getAllProducts,
  clearProductState,
} from '../../redux/slices/Products';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingPage from '../../components/LoadingPage';
import Flalist from '../../components/MyFlatList';
const Products = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const {
    isProductFetching,
    isProductSuccess,
    isProductFail,
    ProductDATA,
    theme,
  } = useSelector(productSelector);
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  useEffect(() => {
    if (isProductSuccess) {
      setData(ProductDATA);
    }
  }, [isProductSuccess]);
  return (
    <SafeAreaView style={{flex: 1}}>
      {isProductFetching && <LoadingPage />}
      <Flalist data={data} theme={theme} />
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({});
