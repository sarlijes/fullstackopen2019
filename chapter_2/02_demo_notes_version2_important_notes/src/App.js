import React, { useState } from 'react' 
import Note from './components/Note'

const App = (props) => {
  /* Tilat:
  1. index.js:stä propseina tulevat notesit, jotka asetetaan alkutilaksi
  2. Uusi note ja sen asettava funktio, asetetaan aluksi tyhjäksi (lomakkeen kenttä tyhjä)
     newNote heijastelee koko ajan kentän arvoa
  3. showAll-boolean, eli näytetäänkö kaikki vai vain tärkeät
  */
  const [notes, setNotes] = useState(props.notes) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  /* Ehdollinen operaattori: const tulos = ehto ? val1 : val2
  eli jos ehto showAll toteutuu, notesToShowksi tulee notes ja jo ei toteudu,
  siihen filtteröidään ne, joiden note.important on true
  (tässä voisi olla myös notes.filter(note => note.important === true))
  */
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  // mäpätään kaikki näytettävät notet noteiksi
  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
    />
  )
/* Uuden muistiinpanon lisäys tehdään, kun submit-nappia painetaan:
 Funktio saa parametriksi tapahtumaolion event. Ensin estetään oletustoiminto eli
 POST-pyyntö selaimelle. Siten luodaan uusi olio ja arvotaan, onko se tärkeä.
 Uusi muistiinpano lisätään vanhojen joukkoon oikeaoppisesti käyttämällä 
  tuttua taulukon metodia concat. Lopuksi kenttä tyhjennetään.

*/
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  /* 
  Tapahtumankäsittelijää kutsutaan aina kun syötekomponentissa tapahtuu jotain (kirjaimet muuttuu)
  Tapahtumankäsittelijämetodi saa parametriksi tapahtumaolion event
  */

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Muistiinpanot</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          näytä {showAll ? 'vain tärkeät' : 'kaikki'}
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">tallenna</button>
      </form>      
    </div>
  )
}

export default App