import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './features/ingredient/ingredientSlice';
import procedureReducer from './features/procedure/procedureSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      ingredient: recipeReducer,
      procedure: procedureReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
