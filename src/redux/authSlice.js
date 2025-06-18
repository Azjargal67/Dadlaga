import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    sales: [],
  },
  reducers: {
    addSale(state, action) {
      state.sales.push(action.payload);
    },
    clearSales(state) {
      state.sales = [];
    },
  },
});

const tempSlice = createSlice({
  name: "temp",
  initialState: {
    temporaryData: null,
  },
  reducers: {
    setTemporaryData(state, action) {
      state.temporaryData = action.payload;
    },
    clearTemporaryData(state) {
      state.temporaryData = null;
    },
  },
});

const shiftSlice = createSlice({
  name: "shift",
  initialState: {
    currentShift: null,
  },
  reducers: {
    startShift(state, action) {
      state.currentShift = action.payload;
    },
    endShift(state) {
      state.currentShift = null;
    },
  },
});

export const loginReducer = loginSlice.reducer;
export const dataReducer = dataSlice.reducer;
export const salesReducer = salesSlice.reducer;
export const tempReducer = tempSlice.reducer;
export const shiftReducer = shiftSlice.reducer;

export const { login, logout } = loginSlice.actions;

export const { setProducts } = dataSlice.actions;

export const { addSale, clearSales } = salesSlice.actions;

export const { setTemporaryData, clearTemporaryData } = tempSlice.actions;

export const { startShift, endShift } = shiftSlice.actions;
