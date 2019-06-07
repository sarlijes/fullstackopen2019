import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryRow = ({ country, setFilteredList, filteredList }) => {
    const handleCountryButtonPress = (event) => {
        setFilteredList([].concat(country))
    }
    return (
            <div>{country.name}
                <button onClick={handleCountryButtonPress}>show info</button>
            </div>
    )
}
const Language = ({ language }) => {
    return (
        <ul>{language.name}</ul>
    )
}
const CountrySpecs = ({ country }) => {
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
                style={{ width: 200, position: 'absolute' }} />
        </>
    )
}

const Countries = ({ filteredList, setFilteredList }) => {
    if (filteredList.length > 10) {
        return (
            <div> Too many matches </div>
        )
    } else if (filteredList.length === 1) {
        return (
            <>
                {filteredList.map(country =>
                    <CountrySpecs key={country.name} country={country} />
                )}
            </>
        )
    } else {
        console.log('---------------- filteredList nyt', filteredList)
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
            <div> find countries
               <input value={searchTerm} onChange={handleSearchTermChange} />
                {/* <button type="submit">hae</button> */}
            </div>
        </form>
    )
}

const App = () => {
    const [countryData, setCountryData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredList, setFilteredList] = useState([])

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
                filteredList={filteredList} />
            <Countries filteredList={filteredList} setFilteredList={setFilteredList} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))