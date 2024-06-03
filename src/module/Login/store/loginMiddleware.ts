import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  API,
  REMEMBER_ME_EXPIRY_DAYS,
  TOKEN,
} from "../../../constants";
import { getRequest } from "../../../utils/commonService";
import { LoginPayload } from "./loginTypes";

// const tokenHanlder = (rememberMe: boolean, token: string) => {
//   const EXPIRY_DAYS = rememberMe
//     ? REMEMBER_ME_EXPIRY_DAYS
//     : DEFAULT_TOKEN_EXPIRY_DAY;
//   Cookies.set(TOKEN, token, { expires: EXPIRY_DAYS });
// };

export const login = createAsyncThunk(
  "login/login",
  async ({ credentials, rememberMe }: LoginPayload, { rejectWithValue }) => {
    console.log(rememberMe, rejectWithValue)
    try {
      if (credentials.email === 'hms@zealeye.com' && credentials.password === 'test@123')
      // tokenHanlder(rememberMe, data.token);

      {
        Cookies.set(TOKEN, "asd", { expires: REMEMBER_ME_EXPIRY_DAYS })
      }

      return { token: 'dxcfgvhbjnk' };
    } catch (error: any) {
      return { token: '', msg: "Invalid Credentials" };
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  "login/getCurrentUser",
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await getRequest(API.CURRENT_USER);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.error.message);
    }
  },
);
