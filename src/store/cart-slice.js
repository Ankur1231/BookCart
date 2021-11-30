import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-sclice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    changed: false,
  },
  reducers: {
    addItemToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.totalPrice = state.totalPrice + newItem.price;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalPrice = state.totalPrice - existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      state.totalQuantity = action.payload.totalQuantity;
    },
  },
});

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://bookcart-d3726-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("fetching cart data failed");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
