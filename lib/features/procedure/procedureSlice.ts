import { createSlice } from '@reduxjs/toolkit';

export interface Procedure {
  id: string;
  description: string;
}

interface InitialState {
  list: Procedure[];
  selected: Procedure | null;
}

const initialState: InitialState = {
  list: [],
  selected: null,
};

export const procedureSlice = createSlice({
  name: 'Procedure',
  initialState,
  reducers: {
    addProcedure(state, action) {
      state.list.push(action.payload);
    },
    selectProcedure(state, action) {
      state.selected = action.payload;
    },
    deselectProcedure(state) {
      state.selected = null;
    },
    updateProcedure(state, action) {
      let procedure = state.list.find(({ id }) => action.payload.id === id);
      if (!procedure) return;
      procedure.description = action.payload.description;
    },
    deleteProcedure(state, action) {
      state.list = state.list.filter(({ id }) => action.payload.id !== id);
    },
  },
});

export const { addProcedure, deleteProcedure, deselectProcedure, selectProcedure, updateProcedure } =
  procedureSlice.actions;

export default procedureSlice.reducer;
