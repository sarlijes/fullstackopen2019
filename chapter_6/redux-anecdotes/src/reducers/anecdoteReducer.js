import anecdoteService from '../services/anecdotes'

export const voteAnecdoteWithId = (id, props) => {

  return async dispatch => {
    const anecdoteToUpdate = await anecdoteService.getById(id)
    const upvotedAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
    const response = await anecdoteService.update(id, upvotedAnecdote)
    dispatch({
      type: 'UPVOTE',
      data: { response }
    })
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
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
      const anecdoteToChange = anecdoteService.getById(action.data.response.id)
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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer