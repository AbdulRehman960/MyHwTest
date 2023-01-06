import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../../services/Api';

export const getAllProducts = createAsyncThunk(
  'users/getAllProducts',
  async thunkAPI => {
    try {
      const data = await API.getAllProducts();

      if (data.status == 200) {
        return data?.data;
      } else {
        return thunkAPI.rejectWithValue(data?.data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

const initialState = {
  isProductFetching: false,
  isProductSuccess: false,
  isProductFail: false,
  ProductDATA: [],
  theme: false,
};
export const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    clearProductState: state => {
      return {...initialState};
    },
    changeTheme: (state, action) => {
      console.log('ACTION======>>>>>', action);
      state.theme = action.payload;
      return state;
    },
  },
  extraReducers: {
    // ************ LOGIN ******************

    [getAllProducts.fulfilled]: (state, {payload}) => {
      state.isProductFetching = false;
      state.isProductSuccess = true;
      state.isProductFail = false;
      state.ProductDATA = payload;
      return state;
    },
    [getAllProducts.rejected]: (state, {payload}) => {
      state.isProductFetching = false;
      state.isProductSuccess = false;
      state.isProductFail = true;
    },
    [getAllProducts.pending]: state => {
      state.isProductFetching = true;
      state.isProductSuccess = false;
      state.isProductFail = false;
    },

    // ************ VERIFY OTP ******************
  },
});
export const productSelector = state => state.product;

export const {clearProductState, changeTheme} = productSlice.actions;
