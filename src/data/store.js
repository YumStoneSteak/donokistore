import { configureStore, createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "state",
  initialState: "kim",
});

const cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", price: 120000, count: 1 },
    { id: 2, name: "Grey Yordan", price: 130000, count: 2 },
  ],
  reducers: {
    addCount: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      item.count += 1;
    },
    minCount: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item.count > 1) {
        item.count -= 1;
      } else if (item.count === 0) {
      }
    },
    addCart: (state, action) => {
      console.log(action.payload);
      const data = action.payload;
      state.push({
        id: data.id,
        name: data.title,
        price: data.price,
        count: 1,
      });
    },
  },
});

export let { addCount, minCount, addCart } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
