import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import axios from 'axios'

const promise = axios.get('http://localhost:3001/persons')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)
ReactDOM.render(<App />, document.getElementById('root'));