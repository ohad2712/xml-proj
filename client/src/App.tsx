
import { useState, ChangeEvent, FormEvent } from "react";
import { ReactComponent as Logo } from "./logo.svg";
import { getData } from "./utils/data-utils";
import FormInput from './components/form-input/form-input';

import './App.css';

// TypeScript declarations
type User = {
  id: number,
  name: string,
  rank: string, // TODO: change to enum
  base: string, // TODO: change to enum
  role: string,
};

// type Suspect = {
//   // TODO
// };

const defaultFormFields = {
  name: '',
  rank: '',
  base: '',
  role: '',
  id: '',
  suspect: {
    id: '',
    name: '',
    rank: '',
    unit: '',
  }
};

const App = () => {
  // react hooks
  const [user, setUser] = useState<User | null>();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, rank, base, role, id, suspect } = formFields;

  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    );
  };

  // handle input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // Prepare payload
      const payload = {
        name,
        rank,
        base,
        role,
        id,
        suspect,
      }
      // make the API call
      const res: User = await getData(
        'http://localhost:8000/login', payload
      )
      setUser(res);
      resetFormFields()
    } catch (error) {
      alert('User Sign In Failed');
    }
  };

  const reload = () => {
    setUser(null);
    resetFormFields()
  };

  return (
    <div className='App-header'>
      <h1>Create PDF Form</h1>
      <h1>
        {user && `Welcome! ${user.name}`}
      </h1>
      <div className="card">
        <h2>Personal Info</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Full name"
            type="text"
            required
            name="name"
            value={name}
            onChange={handleChange}
          />
          <FormInput
            label="Rank"
            type='text' // TODO: Change to dropdown list
            required
            name='rank'
            value={rank}
            onChange={handleChange}
          />
          <FormInput
            label="Base"
            type="text" // TODO: Change to dropdown list
            required
            name="base"
            value={base}
            onChange={handleChange}
          />
          <FormInput
            label="Role"
            type="text"
            required
            name="role"
            value={role}
            onChange={handleChange}
          />
          <FormInput
            label="Personal ID"
            type="text"
            required
            name="id"
            value={id}
            onChange={handleChange}
          />
          {/* <div className="button-group">
            <button type="submit">Sign In</button>
            <span>
              <button type="button" onClick={reload}>Clear</button>
            </span>
          </div> */}
        </form>

        <h2>Suspect Info</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Full name"
            type="text"
            required
            name="name"
            value={suspect.name}
            onChange={handleChange}
          />
          <FormInput
            label="Personal ID"
            type="text"
            required
            name="id"
            value={suspect.id}
            onChange={handleChange}
          />
          <FormInput
            label="Rank"
            type='text' // TODO: Change to dropdown list
            required
            name='rank'
            value={suspect.rank}
            onChange={handleChange}
          />
          <FormInput
            label="Unit"
            type="text" // TODO: Change to dropdown list
            required
            name="unit"
            value={suspect.unit}
            onChange={handleChange}
          />

          {/* TODO: add signature element */}
          <div className="button-group">
            <button type="submit">Generate</button>
            <span>
              <button type="button" onClick={reload}>Clear</button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
