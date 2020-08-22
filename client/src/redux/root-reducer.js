import { combineReducers } from "redux";

import menuReducer from "./menu/menu.reducer";
import itemReducer from "./menu-items/items.reducer";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import bookingReducer from "./booking/booking.reducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart"],
};

const rootReducer = combineReducers({
  menu: menuReducer,
  item: itemReducer,
  user: userReducer,
  cart: cartReducer,
  booking: bookingReducer,
});

export default persistReducer(persistConfig, rootReducer);
