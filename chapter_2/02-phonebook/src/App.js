import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name}: {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const rows = () => persons.map(person =>
    <Person
      key={person.name}
      person={person}
    />
  )

  const addPerson = (event) => {
    event.preventDefault()
    let nameFound = false

    persons.forEach(function (el) {
      if (el.name === newName) {
        nameFound = true;
      }
    });

    if (!nameFound) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
    } else {
      window.alert(`${newName} on jo luettelossa`);
    }

  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Puhelinluettelo
          </h1>
        <form onSubmit={addPerson}>
          <div> Nimi:
            <input
              value={newName}
              onChange={handlePersonChange}
            /> Numero:
            <input
              value={newNumber}
              onChange={handleNumberChange}
            />
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {rows()}
        </ul>
      </header>
    </div>
  )
}

export default App