import { configureStore } from "@reduxjs/toolkit";
import reducers from "./eStoreGlobalState";

export const store = configureStore({
  reducer: { reducers },
});
