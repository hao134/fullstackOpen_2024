import InputField from "./InputField"

const PersonForm =({ handleAddPerson, newPerson, handleChange}) =>(
    <form onSubmit={handleAddPerson}>
        <InputField
          label="Name"
          name="name"
          value={newPerson.name}
          onChange={handleChange}
        />
        <InputField
          label="Number"
          name="number"
          value={newPerson.number}
          onChange={handleChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>

)

export default PersonForm