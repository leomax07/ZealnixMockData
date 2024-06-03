import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastStoreType, ToastPayloadType } from "./toastType";


const initialState: ToastStoreType = {
  severity: "success",
  message: "",
  summary: "",
  life: 3000,
};

const toastStore = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toastSuccess: (state, { payload }: PayloadAction<ToastPayloadType>) => {
      state.severity = "success";
      state.summary = payload.summary || "SUCCESS";
      state.message = payload.message;
      state.life = payload.life;
    },
    toastError: (state, { payload }: PayloadAction<ToastPayloadType>) => {
      state.severity = "error";
      state.summary = payload.summary || "ERROR";
      state.message = payload.message;
      state.life = payload.life;
    },
    toastInfo: (state, { payload }: PayloadAction<ToastPayloadType>) => {
      state.severity = "info";
      state.summary = payload.summary || "INFO";
      state.message = payload.message;
      state.life = payload.life;
    },
    toastWarning: (state, { payload }: PayloadAction<ToastPayloadType>) => {
      state.severity = "warn";
      state.summary = payload.summary || "WARNING";
      state.message = payload.message;
      state.life = payload.life;
    },
    clearToast: (state) => {
      state.summary = "";
      state.message = "";
    },
  },
});

export const {toastSuccess, toastError, toastInfo, toastWarning, clearToast} = toastStore.actions;

export default toastStore.reducer;
