import { configureStore, createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "state",
  initialState: "kim",
});

const cart = createSlice({
  name: "cart",
  initialState: [
    // { id: 0, name: "White and Black", price: 120000, count: 1 },
    // { id: 2, name: "Grey Yordan", price: 130000, count: 2 },
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
      } else if (item.count === 1) {
        const index = state.findIndex((item) => item.id === action.payload);
        state.splice(index, 1);
      }
    },
    addCart: (state, action) => {
      const data = action.payload;
      if (state.find((item) => item.id === data)) {
        console.log("있는데 추가함");
        addCount(data.id);
      } else {
        console.log("없음 새로 추가");
        state.push({
          id: data.id,
          name: data.title,
          price: data.price,
          count: 1,
        });
      }
    },
    delCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export let { addCount, minCount, addCart, delCart } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
