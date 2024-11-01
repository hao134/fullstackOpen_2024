import { useState } from "react";

const InputField = ({ label, name, value, onChange }) => (
  <div>
    {label}: <input name={name} value={value} onChange={onChange} />
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523"},
    { name: "Dan Abramov", number: "12-43-234345"},
    { name: "Mary Poppendieck", number: "39-23-6423122"},
  ]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

  const addName = (event) => {
    event.preventDefault();

    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
    };

    if (persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      alert(`${newPerson.name} is already added to phonebook`);
      setNewPerson({ name: "", number: "" });
      return;
    }
    setPersons(persons.concat(personObject));
    setNewPerson({ name: "", number: "" });
  };

  const handleChange = (event) => {
    // form's name and value
    const { name, value } = event.target;
    // form of newPerson: {name: '', number: ''}
    // when [name] is name is 'a' -> add {name: 'a'}
    // when [name] is number is '1' -> add {number: '1'}
    setNewPerson({ ...newPerson, [name]: value });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <InputField label="Name" name="name" value={newPerson.name} onChange={handleChange}/>
        <InputField label="Number" name="number" value={newPerson.number} onChange={handleChange}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
