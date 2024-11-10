import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import phonebookServices from "./services/phonebook";
import Notification from "./components/Notification";
import "./index.css";

const NOTIFICATION_DURATION = 3000;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ message: null, type: "message" });

  useEffect(() => {
    phonebookServices
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch(() => {
        displayMessage("Failed to fetch contacts from server", "error");
      });
  }, []);

  const displayMessage = (message, type = "message") => {
    setMessage({ message, type });
    setTimeout(() => {
      setMessage({ message: null });
    }, NOTIFICATION_DURATION);
  };

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
            displayMessage(
              `Updated ${existingPerson.name}'s number`,
              "message"
            );
            resetNewPerson();
          })
          .catch(() => {
            displayMessage(
              `Information of ${existingPerson.name} has already been removed from server`,
              "error"
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
        displayMessage(`Added ${newPerson.name}`, "message");
        resetNewPerson();
      })
      .catch(() => {
        displayMessage("Failed to add the contact. Please try again.", "error");
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
          displayMessage(`Deleted ${name}`, "message");
        })
        .catch(() => {
          displayMessage(
            `Information of ${name} has already been removed from server`,
            "error"
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
      <Notification message={message.message} type={message.type} />
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
