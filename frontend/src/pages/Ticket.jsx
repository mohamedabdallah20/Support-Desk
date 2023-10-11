import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  fetchTicket,
  reset,
  closeTicket,
} from '../features/tickets/ticketSlice'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
function Ticket() {
  const dispatch = useDispatch()
  const { ticket, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.ticket
  )
  const { ticketId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(fetchTicket(ticketId))
  }, [dispatch, ticketId, message, isError])
  const onTicketClose = (e) => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket closed')
    navigate('/tickets')
  }
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h3>Something went wrong</h3>
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted : {new Date(ticket.createdAt).toLocaleDateString()}
        </h3>
        <h3>Product : {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>
            Description of Issue
            <p>{ticket.description}</p>
          </h3>
        </div>
      </header>
      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
