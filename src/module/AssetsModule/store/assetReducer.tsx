/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { AssetTypeInitialState } from "./assetTypes";
import {
  createAsset,
  getAssets,
  updateAsset,
  deleteAsset,
  getAllAssetCategories,
  getAllAssetItems,
  getAssetHistory,
  getAssetMaintenances,
  createAssetItem,
  updateAssetItem,
  deleteAssetItem,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance
} from "./assetMiddleware";

const initialState: AssetTypeInitialState = {
  loading: false,
  assets: [],
  error: "",
  assetCategories: [],
  assetItem: [],
  assetHistory: [],
  assetMaintenance: [],
};

const assetReducer = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create asset
    builder.addCase(createAsset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAsset.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createAsset.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // get asset
    builder.addCase(getAssets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAssets.fulfilled, (state, action) => {
      state.loading = false;
      state.assets = action.payload;
    });
    builder.addCase(getAssets.rejected, (state, action) => {
      state.loading = false;

      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // update asset
    builder.addCase(updateAsset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAsset.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateAsset.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // delete asset
    builder.addCase(deleteAsset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAsset.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteAsset.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // get asset categories
    builder.addCase(getAllAssetCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAssetCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.assetCategories = action.payload;
    });
    builder.addCase(getAllAssetCategories.rejected, (state, action) => {
      state.loading = false;

      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // create asset item
    builder.addCase(createAssetItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAssetItem.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createAssetItem.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
   
    // update asset Item
    builder.addCase(updateAssetItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAssetItem.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateAssetItem.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // delete asset item
    builder.addCase(deleteAssetItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAssetItem.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteAssetItem.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // get asset item
    builder.addCase(getAllAssetItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAssetItems.fulfilled, (state, action) => {
      state.loading = false;
      state.assetItem = action.payload;
    });
    builder.addCase(getAllAssetItems.rejected, (state, action) => {
      state.loading = false;

      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // get asset histories
    builder.addCase(getAssetHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAssetHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.assetHistory = action.payload;
    });
    builder.addCase(getAssetHistory.rejected, (state, action) => {
      state.loading = false;

      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // get asset maintenances
    builder.addCase(getAssetMaintenances.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAssetMaintenances.fulfilled, (state, action) => {
      state.loading = false;
      state.assetMaintenance = action.payload;
    });
    builder.addCase(getAssetMaintenances.rejected, (state, action) => {
      state.loading = false;

      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // create maintenance
    builder.addCase(createMaintenance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createMaintenance.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createMaintenance.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
   
    // update maintenance
    builder.addCase(updateMaintenance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateMaintenance.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateMaintenance.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // delete maintenance
    builder.addCase(deleteMaintenance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteMaintenance.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteMaintenance.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

  },
});

export default assetReducer.reducer;
