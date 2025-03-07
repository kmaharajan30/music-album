import { configureStore } from "@reduxjs/toolkit";
import MusicSlice from "./slices/music";

export const store = configureStore({
  reducer: {
    music: MusicSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
