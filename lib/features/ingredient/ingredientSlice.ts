import { createSlice } from '@reduxjs/toolkit';

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  size: string;
}

interface InitialState {
  list: Ingredient[];
  selected: Ingredient | null;
}

const initialState: InitialState = {
  list: [],
  selected: null,
};

export const ingredientSlice = createSlice({
  name: 'Ingredient',
  initialState,
  reducers: {
    addIngredient(state, action) {
      state.list.push(action.payload);
    },
    selectIngredient(state, action) {
      state.selected = action.payload;
    },
    deselectIngredient(state) {
      state.selected = null;
    },
    updateIngredient(state, action) {
      let ingredient = state.list.find(({ id }) => action.payload.id === id);
      if (!ingredient) return;
      ingredient.name = action.payload.name;
      ingredient.size = action.payload.size;
      ingredient.unit = action.payload.unit;
    },
    deleteIngredient(state, action) {
      state.list = state.list.filter(({ id }) => action.payload.id !== id);
    },
  },
});

export const { addIngredient, selectIngredient, deselectIngredient, updateIngredient, deleteIngredient } =
  ingredientSlice.actions;

export default ingredientSlice.reducer;
