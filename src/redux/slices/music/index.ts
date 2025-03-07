import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { FetchMusicInterface, MusicInterface } from "./interface";
import axios from "axios";
import { axiosService } from "../../../axios";

const initialState = {
  collections: null,
  filteredCollections: null,
  selectedCollection: null,
  isFetching: false,
  isSuccess: false,
  isFailed: false,
} as MusicInterface;

export const fetchMusic = createAsyncThunk(
  "getAllMusics",
  async (payload: FetchMusicInterface | undefined, thunkAPI) => {
    try {
      const resp = await axiosService({
        method: "GET",
        url: "collections",
        params: payload?.params,
      });
      return resp?.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI?.rejectWithValue(error?.message);
      }
      return "Something went wrong";
    }
  }
);

export const fetchMusicById = createAsyncThunk(
  "getMusicById",
  async (payload: FetchMusicInterface | undefined, thunkAPI) => {
    const collectionId = payload?.urlParams.collectionId;
    try {
      const resp = await axiosService({
        method: "GET",
        url: `collections/${collectionId}`,
        params: payload?.params,
      });
      return resp?.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI?.rejectWithValue(error?.message);
      }
      return "Something went wrong";
    }
  }
);

const MusicSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    filterCollections(state, action) {
      const { searchTerm, selectedOptions } = action.payload;

      const lowerCaseSearch = searchTerm.toLowerCase();

      state.filteredCollections =
        state.collections?.filter((item) => {
          const matchesSearch = item.name
            .toLowerCase()
            .includes(lowerCaseSearch);

          const matchesType =
            selectedOptions.length === 0 || selectedOptions.includes(item.type);

          return matchesSearch && matchesType;
        }) || [];

      console.log(state.filteredCollections);
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<MusicInterface>) => {
    builder.addCase(fetchMusic.pending, (state) => {
      state.collections = null;
      state.isFetching = true;
      state.isSuccess = false;
      state.isFailed = false;
    });
    builder.addCase(fetchMusic.fulfilled, (state, action) => {
      state.collections = action.payload;
      state.filteredCollections = action.payload;
      state.isSuccess = true;
      state.isFetching = false;
      state.isFailed = false;
    });
    builder.addCase(fetchMusic.rejected, (state) => {
      state.isSuccess = false;
      state.isFetching = false;
      state.isFailed = true;
    });
    builder.addCase(fetchMusicById.pending, (state) => {
      state.selectedCollection = null;
      state.isFetching = true;
      state.isSuccess = false;
      state.isFailed = false;
    });
    builder.addCase(fetchMusicById.fulfilled, (state, action) => {
      state.selectedCollection = action.payload;
      state.isSuccess = true;
      state.isFetching = false;
      state.isFailed = false;
    });
    builder.addCase(fetchMusicById.rejected, (state) => {
      state.isSuccess = false;
      state.isFetching = false;
      state.isFailed = true;
    });
  },
});

export const { filterCollections } = MusicSlice.actions;

export default MusicSlice.reducer;
