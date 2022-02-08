import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  cart: [],
};

const globState = createSlice({
  name: "myStore",
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      state.product = payload;
    },

    addCart: (state, { payload }) => {
      const check= state.cart.findIndex((el) => el._id === payload._id);
      if (check >= 0) {
        state.cart[check].QTY += 1;
      } else {
        const item = { ...payload, QTY: 1 };
        state.cart.push(item);
      }
    },

    removeCart: (state, {payload}) => {
      const remove = state.cart.filter((el) => el._id !== payload._id);
      state.cart = remove;
    },

    changeItem: (state, {payload}) => {
      const checkCart = state.cart.findIndex((el) => el._id === payload._id)
      const check = state.cart[checkCart].QTY
      if(check > 1){
        state.cart[checkCart].QTY -= 1
      }else if(check === 1){
        const remove = state.cart.filter((el) => el._id !== payload._id);
      state.cart = remove;
      }

    },

    total: (state, {payload}) => {
      const {totalCost, totalItems} = state.cart.reduce(
        (cost, items) => {
          const { price, QTY } = items;

          const mainCost = price * QTY;

          cost.totalItems += QTY;
          cost.totalCost += mainCost;

          return cost;
        },
        {
          totalCost: 0,
          totalItems: 0,
        }
      )
      state.MyTotalQTY = totalItems;
      state.MyTotalCost = totalCost;
    },
  },
});

export const { addProduct, addCart, removeCart, changeItem, total } = globState.actions;

export default globState.reducer;
