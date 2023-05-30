import { configureStore, createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "state",
  initialState: "kim",
});

const cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    setCountPlus: (state) => {
      console.log(state);
    },
  },
});

export let { setCountPlus } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
