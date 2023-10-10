import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Tickets() {
  const { tickets, isLoading, isError, isSuccess } = useSelector(
    (state) => state.ticket
  )
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])
  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>
      <h1>Tickets</h1>
    </div>
  )
}

export default Tickets
