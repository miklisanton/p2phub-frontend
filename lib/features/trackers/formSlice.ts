import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type FormPMeth } from "@/types";

const initialState = {
  exchange: "binance",
  currency: "EUR",
  methods: [] as FormPMeth[],
  availableCurrencies: [] as string[],
  isCurrencyLoading: false,
  availableExchanges: [] as string[],
  isExchangeLoading: false,
  availableMethods: [] as FormPMeth[],
  isMethodLoading: false,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setExchange: (state, action: PayloadAction<string>) => {
      state.exchange = action.payload;
      state.currency = "EUR";
      state.methods = [];
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
      state.methods = [];
    },
    setMethods: (state, action: PayloadAction<FormPMeth[]>) => {
      state.methods = action.payload
    }
  },
});

export default formSlice.reducer; 

export const { setExchange, setCurrency, setMethods } = formSlice.actions;
