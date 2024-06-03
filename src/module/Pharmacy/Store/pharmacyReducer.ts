import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { pharmacyStoreStateType } from "./pharmacyType";
import { fetchInventoryStocks } from "./pharmacyMiddleware";

const initialState: pharmacyStoreStateType = {
  inventoryStockList: [],
  loading: false,
  error: "",
};

const pharmacyReducer = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInventoryStocks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchInventoryStocks.fulfilled,
      (state, action: AnyAction) => {
        state.loading = false;
        state.inventoryStockList = action?.payload;
      }
    );
    builder.addCase(
      fetchInventoryStocks.rejected,
      (state, action: AnyAction) => {
        state.loading = false;
        if (typeof action.payload === "string") state.error = action.payload;
      }
    );
  },
});

export default pharmacyReducer.reducer;
