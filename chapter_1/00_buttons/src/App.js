
import logo from './logo.svg';
import React, { useState } from 'react'
import './App.css';

// juurikomponentin määrittelevä funktio alkaa metodikutsulla, eli komponentille
// luodaan tila, joka saa alkuarvokseen esim. nollan

// counter pitää sisällään tilan arvon, joka on aluksi esim. nolla

// setCounter on viite funktioon, jonka avulla tilaa voidaan muuttaa: kutsun yhteydessä
// React renderöi komponentin uudelleen

const App = (props) => {
  const [counter, setCounter] = useState(0)
  // tapahtumankäsittelijä on määritelty funktio, joka kutsuu funktiota setToValue sopivalla parametrilla:
  const setToValue = (value) => setCounter(value)

  return (

// classit ja muotoilut
// tila viedään alikomponentteihin (tila sijoitetaan mahdollisimman ylös komponenttihierarkiassa)

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Nappeja </p>

    <div >
      <Display counter={counter} />
      <Button
        handleClick={() => setToValue(counter + 1)}
        text='plus'
      />
      <Button
        handleClick={() => setToValue(counter - 1)}
        text='minus'
      />
      <Button
        handleClick={() => setToValue(0)}
        text='zero'
      />
      
    </div>
      </header>
    </div>


  )
}
// propsit on destrukturoitu
// nappia painettaessa kutsutaan funktiota setToValue (App-komponentissa) oikealla parametrilla
// text tulee nappiin
// kun nappia painetaan ja App renderöityy uudelleen, renderöityvät myös kaikki sen alikomponentit

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ counter }) => <div>{counter}</div>

export default App;
