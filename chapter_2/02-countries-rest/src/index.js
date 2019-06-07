import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryRow = ({ country, setFilteredList }) => {
    const handleCountryButtonPress = () => {
        setFilteredList([].concat(country))
    }
    return (
        <div>
            {country.name}
            <button onClick={handleCountryButtonPress}>show info</button>
        </div>
    )
}

const Language = ({ language }) => {
    return (
        <ul>{language.name}</ul>
    )
}
const CountrySpecs = ({ country, capitalWeather, setCapitalWeather }) => {
    return (
        <>
            <h1>{country.name}</h1>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>
            <h2>Languages: </h2>
            {country.languages.map(language =>
                <Language key={language.name} language={language} />
            )}
            <img
                src={country.flag}
                alt="flag of this country"
                style={{ width: 200 }} />

            <Weather key={country.capital} capital={country.capital} capitalWeather={capitalWeather} setCapitalWeather={setCapitalWeather} />
        </>
    )
}

const Weather = ({ capital, capitalWeather, setCapitalWeather }) => {

    useEffect(() => {
        axios
            .get('http://api.apixu.com/v1/current.json?key=7a1ec02eb69b4671aa992918190706&q=' + capital)
            .then(response => {
                setCapitalWeather(response.data.current)
            })
    }, [])

        return (
            <>
                <h1> Weather in {capital}</h1>
                <div>Temperature: {capitalWeather.temp_c}</div>
                { capitalWeather.condition && <img src={capitalWeather.condition.icon} /> }
                <div>Wind: {capitalWeather.wind_kph} kph {capitalWeather.wind_dir}   </div>
                 
            </>
        )
}

const Countries = ({ filteredList, setFilteredList, capitalWeather, setCapitalWeather }) => {
    if (filteredList.length > 10) {
        return (
            <div> Too many matches </div>
        )
    } else if (filteredList.length === 1) {



        return (
            <>
                {filteredList.map(country =>
                    <CountrySpecs key={country.name} country={country} capitalWeather={capitalWeather} setCapitalWeather={setCapitalWeather} />
                )}
            </>
        )
    } else {
        return (
            <>
                {filteredList.map(country =>
                    <CountryRow key={country.name} country={country} setFilteredList={setFilteredList} filteredList={filteredList} />
                )}
            </>
        )
    }
}

const Filter = ({ setFilteredListBySearchTerm, searchTerm, handleSearchTermChange,
    setFilteredList, countryData, filteredList }) => {
    if (searchTerm === "") {
        setFilteredList(countryData)
    }
    return (
        <form onSubmit={setFilteredListBySearchTerm}>
            find countries
               <input value={searchTerm} onChange={handleSearchTermChange} />
        </form>
    )
}

const App = () => {
    const [countryData, setCountryData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredList, setFilteredList] = useState([])
    const [capitalWeather, setCapitalWeather] = useState([])

    

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountryData(response.data)
            })
    }, [])

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const setFilteredListBySearchTerm = (event) => {
        event.preventDefault()
        let matchingCountriesList = []
        countryData.forEach(function (el) {
            let nameLowerCase = el.name.toLowerCase()
            let searchTermLowerCase = searchTerm.toLowerCase()
            if (nameLowerCase.startsWith(searchTermLowerCase)) {
                matchingCountriesList.push(el)
                setFilteredList(matchingCountriesList)
            }
        });
        if (searchTerm === "") {
            setFilteredList(countryData)
        }
    }

    return (
        <div>
            <Filter setFilteredListBySearchTerm={setFilteredListBySearchTerm}
                searchTerm={searchTerm}
                handleSearchTermChange={handleSearchTermChange}
                setFilteredList={setFilteredList}
                countryData={countryData}
                filteredList={filteredList}
                handleSearchTermChange={handleSearchTermChange} />

            <Countries filteredList={filteredList} setFilteredList={setFilteredList} capitalWeather={capitalWeather} setCapitalWeather={setCapitalWeather} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))