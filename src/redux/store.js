import { persistStore, persistReducer } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  dataReducer,
  loginReducer,
  salesReducer,
  shiftReducer,
  tempReducer,
} from "./authSlice";
import { cartReducer } from "./cartSlice";
import { useReducer } from "react";

const rootReducer = combineReducers({
  login: loginReducer,
  data: dataReducer,
  sales: salesReducer,
  temp: tempReducer,
  shift: shiftReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: ["temp"], // persist hiihgui reduceruudiig black listed hiideg
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
