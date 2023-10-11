import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
  notes: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}
// fetch notes
export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.fetchNotes(ticketId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// create notes
export const createNote = createAsyncThunk(
  'notes/createNote',
  async ({ noteText, ticketId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.createNote(noteText, ticketId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNotes.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes = actions.payload
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNote.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes.push(actions.payload)
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
  },
})
export const { reset } = noteSlice.actions
export default noteSlice.reducer
