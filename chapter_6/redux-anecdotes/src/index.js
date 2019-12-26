import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

//import { setNotification } from './reducers/notificationReducer'


const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})

const store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))
//store.dispatch(setNotification('IMPORTANT'))

const renderApp = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)

