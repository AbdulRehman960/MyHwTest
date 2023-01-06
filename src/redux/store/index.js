import {configureStore} from '@reduxjs/toolkit';
import {productSlice} from '../slices/Products';

const store = configureStore({reducer: {product: productSlice.reducer}});
export default store;
