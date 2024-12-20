import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

interface MoviesState {
  movies: Movie[]; // Pastikan ini adalah array dari objek Movie
  loading: boolean;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    clearMovies: (state) => {
      state.movies = [];
    },
  },
});

export const { setMovies, clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
