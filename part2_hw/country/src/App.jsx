import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import CountryData from './components/Countrydata'


function App() {
  const [countries, setCountries] = useState(0)
  const [query, setQuery] = useState('')
  const [countrytoshow, setCountrytoshow] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const queryByName = (event) => {
    const search = event.target.value;
    setQuery(search);
    setCountrytoshow(
      countries.filter((country) => country.name.common.toLowerCase().includes(search))
    )
  }

  return (
    <div>
      <div>
        find countries <input value={query} onChange={queryByName} />
      </div>
      {countrytoshow.length === 1 ? (
        <CountryData country={countrytoshow[0]} />
      ) : countrytoshow.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <Countries
          countriesToShow={countrytoshow}
          setCountriesToShow={setCountrytoshow}
        />

      )}

    </div>
  )
}

export default App
