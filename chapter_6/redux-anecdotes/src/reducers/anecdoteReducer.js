import { setNotification } from '../reducers/notificationReducer'
import { emptyNotification } from '../reducers/notificationReducer'

const getId = () => (10000 * Math.random()).toFixed(0)

export const voteAnecdoteWithId = (id, store) => {

  store.dispatch(setNotification(`you voted '${id}'`))
  setTimeout(() => {
    store.dispatch(emptyNotification())
  }, 5000)


  return {
    type: 'UPVOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

const reducer = (state = [], action) => {
  // console.table('state now: ', state)
  // console.log('action.data', action.data)

  switch (action.type) {

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    case 'UPVOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )


    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default reducer