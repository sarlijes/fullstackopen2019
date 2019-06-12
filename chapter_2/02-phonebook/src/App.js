import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === undefined) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const Person = ({ person, handleDeleteButtonPress }) => {
  return (
    <li>{person.name}: {person.number} <button onClick={handleDeleteButtonPress}>delete</button></li>
  )
}

const AddPersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div> Name:
            <input
            value={newName}
            onChange={handlePersonChange}
          /> Number:
            <input
            value={newNumber}
            onChange={handleNumberChange}
          />
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Phonebook = ({ filteredList, handleDeleteButtonPress }) => {
  return (
    <>
      {filteredList.map(person =>
        <Person key={person.id} person={person} handleDeleteButtonPress={() => handleDeleteButtonPress(person.id)} />
      )
      }
    </>
  )
}

const Filter = ({ setFilteredListBySearchTerm, searchTerm, handleSearchTermChange, setFilteredList, persons }) => {
  if (searchTerm === "") {
    setFilteredList(persons)
  }

  return (
    <form onSubmit={setFilteredListBySearchTerm}>
      <div> Search
      <input
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <button type="submit">go</button>
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
  const [statusMessage, setStatusMessage] = useState()

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
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

  const changeNotification = (message) => {
    setStatusMessage(message)
    setTimeout(() => {
      setStatusMessage(undefined)
    }, 3000)
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

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          changeNotification(`Added ${newName}`)
        })

    } else {
      
        const person = persons.find(p => p.name === newName)
        const newPerson = person
        newPerson.number = newNumber
        personService.update(person.id, newPerson)
        .catch(error => {
          console.log('fail')
          changeNotification(`Contact info of ${newName} was already deleted from server`)
        })
        setNewName('')
        setNewNumber('')
        changeNotification(`Updated the number of ${newName}`)
    }
  }

  const handleDeleteButtonPress = id => {
    const person = persons.find(p => p.id === id)
      personService
        .deletePerson(person.id)
        .then(filter => {
          setPersons(persons.filter(p => p.id !== id))
        })
        changeNotification(`Deleted ${person.name} from the phone book`)
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
        <h1>Phonebook</h1>

        <Notification message={statusMessage} />

        <Filter setFilteredListBySearchTerm={setFilteredListBySearchTerm}
          searchTerm={searchTerm}
          handleSearchTermChange={handleSearchTermChange}
          setFilteredList={setFilteredList}
          persons={persons} />

        <h2>Add new</h2>

        <AddPersonForm addPerson={addPerson}
          newName={newName}
          handlePersonChange={handlePersonChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange} />

        <h2>Contacts</h2>
        <Phonebook filteredList={filteredList} handleDeleteButtonPress={handleDeleteButtonPress} />

      </header>
    </div>
  )
}

export default App