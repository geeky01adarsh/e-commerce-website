import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("produts/fetchAll", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return await response.json();
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
    loading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
          state.value = action.payload;
          state.loading = false;
      });
  },
});

export default productSlice.reducer;
