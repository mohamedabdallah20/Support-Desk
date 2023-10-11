import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import {
  fetchTicket,
  reset,
  closeTicket,
} from '../features/tickets/ticketSlice'
import { fetchNotes, reset as notesReset } from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import NoteItem from '../components/NoteItem'

const customStyles = {
  content: {
    width: '100%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}
Modal.setAppElement('#root')

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const dispatch = useDispatch()
  const { ticket, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.ticket
  )
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  )
  const { ticketId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
        dispatch(notesReset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(fetchTicket(ticketId))
    dispatch(fetchNotes(ticketId))
  }, [dispatch, ticketId, message, isError])
  const onTicketClose = (e) => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket closed')
    navigate('/tickets')
  }
  const openModal = () => {
    setModalIsOpen(true)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }
  // create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    // @todo dispatch create note
    console.log('submit')
    closeModal()
  }
  if (isLoading || notesIsLoading) {
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
        {notes.length > 0 && <h2>Notes</h2>}
      </header>
      {ticket.status !== 'closed' && (
        <button onClick={openModal} className="btn">
          <FaPlus />
          Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add note"
      >
        <h2>Add Note</h2>

        <button className="btn btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note Text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
