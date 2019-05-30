import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Nimi 1', id: 1 }
  ])
  const [newName, setNewName] = useState('')

  const rows = () => persons.map(person =>
    <Person
      key={person.id}
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Puhelinluettelo
          </h1>
        <form onSubmit={addPerson}>
          <div>
            <input
              value={newName}
              onChange={handlePersonChange}
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