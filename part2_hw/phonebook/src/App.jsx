import { useState, useEffect } from "react";
// import axios from 'axios'
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import phonebookServices from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebookServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'people')

  const handleAddPerson = (event) => {
    event.preventDefault();

    if (
      persons.find(
        (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      )
    ) {
      alert(`${newPerson.name} is already added to phonebook`);
      setNewPerson({ name: "", number: "" });
      return;
    }
    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
      id: newPerson.name
    };

    phonebookServices
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewPerson({ name: "", number: "" })
      })

    // axios
    //   .post('http://localhost:3001/persons', personObject)
    //   .then(response => {
    //     setPersons(persons.concat(response.data));
    //     setNewPerson({ name: "", number: "" });
    //   })
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        handleAddPerson={handleAddPerson}
        newPerson={newPerson}
        handleChange={handleChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
