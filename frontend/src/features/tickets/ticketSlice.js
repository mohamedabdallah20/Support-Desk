import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new Ticket
export const createTicket = createAsyncThunk(
  'tickets/createTicket',
  async (ticket, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      // console.log(token)
      return await ticketService.createTicket(ticket, token)
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

// fetch user Tickets
export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.fetchTickets(token)
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
// fetch user Ticket
export const fetchTicket = createAsyncThunk(
  'tickets/fetchTicket',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.fetchTicket(ticketId, token)
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

// close Ticket
export const closeTicket = createAsyncThunk(
  'tickets/closeTicket',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.closeTicket(ticketId, token)
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

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(fetchTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTickets.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = actions.payload
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(fetchTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTicket.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = actions.payload
      })
      .addCase(fetchTicket.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = 'closed')
            : ticket
        )
      })
  },
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
