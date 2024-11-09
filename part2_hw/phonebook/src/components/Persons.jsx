const Persons = ({ personsToShow, handleDeletePerson }) => (
  <ul>
    {personsToShow.map((person) => (
      <li key={person.id}>
        {person.name}: {person.number}{" "}
        <button onClick={() => handleDeletePerson(person.id, person.name)}>
          delete 
        </button>
      </li>
    ))}
  </ul>
);

export default Persons;
