import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import phonebookServices from "./services/phonebook";
import Notification from "./components/Notification";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phonebookServices
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        alert("Failed to fetch contacts from server.");
      });
  }, []);

  const resetNewPerson = () => setNewPerson({ name: "", number: "" });

  const handleAddPerson = (event) => {
    event.preventDefault();

    //找到是否有相同名字的用戶
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    //如果已經存在相同名字的用戶
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        // 使用PUT請求更新電話號碼
        const updatedPerson = { ...existingPerson, number: newPerson.number };
        phonebookServices
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            resetNewPerson();
          })
          .catch((error) => {
            alert(
              `Information of ${existingPerson.name} has already been removed from server`
            );
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
          });
      }
      return;
    }

    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
    };

    phonebookServices
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage(
          `Added ${newPerson.name}`
        )
        setTimeout(()=>{
          setMessage(null)
        }, 3000)
        resetNewPerson();
      })
      .catch((error) => {
        alert("Failed to add the contact. Please try again.");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      phonebookServices
        .remove(id)
        .then(() => {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
        })
        .catch((error) => {
          alert(
            `Failed to delete ${name}. It might have already been removed from the server.`
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        handleAddPerson={handleAddPerson}
        newPerson={newPerson}
        handleChange={handleChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
