import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ person }) => {
  return (
    <li>{person.name}: {person.number}</li>
  )
}

const AddPersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange }) => {
  return (
    <div>

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
    </div>
  )
}

const Phonebook = ({ filteredList }) => {
  return (
    <>
      {filteredList.map(person =>
        <Person key={person.name} person={person} />
      )}
    </>
  )
}
const Filter = ({ setFilteredListBySearchTerm, searchTerm, handleSearchTermChange, setFilteredList, persons }) => {
  if (searchTerm === "") {
    setFilteredList(persons)
  }

  return (
    <form onSubmit={setFilteredListBySearchTerm}>
      <div> Hae henkilöä
      <input
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <button type="submit">hae</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredList, setFilteredList] = useState([])

  // const promise = axios.get('http://localhost:3001/persons')
  // console.log(promise)

  const promise = axios.get('http://localhost:3001/persons')

  promise.then(response => {
    console.log(response)
  })


  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const setFilteredListBySearchTerm = (event) => {
    event.preventDefault()
    let matchingPersonsList = []
    persons.forEach(function (el) {
      let nameLowerCase = el.name.toLowerCase()
      let searchTermLowerCase = searchTerm.toLowerCase()
      if (nameLowerCase.startsWith(searchTermLowerCase)) {
        matchingPersonsList.push(el)
        setFilteredList(matchingPersonsList)
      }
    });
    if (searchTerm === "") {
      setFilteredList(persons)
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
        number: newNumber
      }
      // setPersons(persons.concat(personObject))
      // setNewName('')
      // setNewNumber('')

      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })

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
        <h1>Puhelinluettelo</h1>

        <Filter setFilteredListBySearchTerm={setFilteredListBySearchTerm}
          searchTerm={searchTerm}
          handleSearchTermChange={handleSearchTermChange}
          setFilteredList={setFilteredList}
          persons={persons} />

        <h2>Lisää uusi</h2>

        <AddPersonForm addPerson={addPerson}
          newName={newName}
          handlePersonChange={handlePersonChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange} />

        <h2>Numerot</h2>
        <Phonebook filteredList={filteredList} />

      </header>
    </div>
  )
}

export default App