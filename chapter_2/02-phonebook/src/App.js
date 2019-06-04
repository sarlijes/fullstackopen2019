import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name}: {person.number}</li>
  )
}

  const fullPersonList = [
    { name: 'Dan Murray', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]

const App = () => {
  const [persons, setPersons] = useState(fullPersonList)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const rows = () => persons.map(person =>
    <Person key={person.name} person={person} />
  )

  const showPeopleBySearchTerm = (event) => {
    event.preventDefault()
    const filteredList = []
    persons.forEach(function (el) {
      if (el.name.startsWith(searchTerm)) {
        filteredList.push(el)
        setPersons(filteredList)
      }
    });
    if (searchTerm === "") {
      setPersons(fullPersonList)
    }
  }

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
      setNewNumber('')
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
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Puhelinluettelo
          </h1>

        <form onSubmit={showPeopleBySearchTerm}>
          <div> Hae henkilöä
            <input
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <button type="submit">hae</button>
          </div>
        </form>

        <h2>Lisää uusi</h2>
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