import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  sortBy: string;
  selectedGenres: number[];
}

const initialState: SearchState = {
  query: "",
  sortBy: "popularity.desc",
  selectedGenres: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    toggleGenre: (state, action: PayloadAction<number>) => {
      const genreId = action.payload;
      if (state.selectedGenres.includes(genreId)) {
        state.selectedGenres = state.selectedGenres.filter(
          (id) => id !== genreId
        );
      } else {
        state.selectedGenres.push(genreId);
      }
    },
  },
});

export const { setSearchQuery, setSortBy, toggleGenre } = searchSlice.actions;
export default searchSlice.reducer;
