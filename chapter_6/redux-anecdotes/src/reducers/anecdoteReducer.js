import { setNotification } from '../reducers/notificationReducer'
import { emptyNotification } from '../reducers/notificationReducer'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
]


const getId = () => (10000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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

const initialState = anecdotesAtStart.map(asObject)

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

const reducer = (state = initialState, action) => {
  // console.table('state now: ', state)
  // console.log('action.data', action.data)

  switch (action.type) {

    case 'NEW_ANECDOTE':
      return [...state, action.data]

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

export default reducer