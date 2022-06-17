import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LineupModel } from '../../Types/Lineup';
import { VIAModel } from '../../Types/VIA';

export interface LineupStateModel {
    id: string;
    date_created: any;
    worship_leader: VIAModel;
    Lineup: LineupModel[];
    likes: number;
}

export interface LineupState {
  lineup: LineupStateModel[],
  songs: any[],
  is_saving: boolean;
}

const initialState: LineupState = {
  lineup: [],
  songs: [],
  is_saving: false
}

export const lineupSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addLineup: (state, action: PayloadAction<LineupStateModel>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.lineup = [...state.lineup, action.payload]
    },
    updateLineup: (state, action: PayloadAction<LineupStateModel>) => {
        const updated = state.lineup.map(l => {
            if (l.id === action.payload.id) {
                return {
                    ...l,
                    ...action.payload
                }
            }
            return l;
        })
        state.lineup = updated
    },
    setSaving: (state, action: PayloadAction<boolean>) => {
        return {...state,is_saving: action.payload};
    }
  },
})

// Action creators are generated for each case reducer function
export const { addLineup, setSaving, updateLineup } = lineupSlice.actions

export default lineupSlice.reducer