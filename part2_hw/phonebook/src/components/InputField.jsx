const InputField = ({ label, name, value, onChange }) => (
  <div>
    {label}: <input name={name} value={value} onChange={onChange} />
  </div>
);

export default InputField;
