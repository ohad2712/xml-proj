
import { useState, ChangeEvent, FormEvent } from "react";
import { getData } from "./utils/data-utils";
import FormInput from './components/form-input/form-input';
import SignatureCanvas from 'react-signature-canvas';

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
  const [signatureCanvasRef, setSignatureCanvasRef] = useState(null);
  const { name, rank, base, role, id, suspect } = formFields;
  let signatureImage: any; // TODO: better type this

  const suspect_id = suspect.id;
  const suspect_name = suspect.name;
  const suspect_rank = suspect.rank;
  const suspect_unit = suspect.unit;

  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    );
  };

  // handle input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name.startsWith('suspect_')) {
      // Update suspect object fields
      const suspectFieldName = name.replace('suspect_', '');
      setFormFields({
        ...formFields,
        suspect: {
          ...formFields.suspect,
          [suspectFieldName]: value
        }
      });
    } else {
      // Update top-level fields
      setFormFields({ ...formFields, [name]: value });
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Set signature image
    if (signatureCanvasRef) {
      signatureImage = (signatureCanvasRef as any).toDataURL();
      // Do something with the signature image (e.g., save it, display it, etc.)
    }

    try {
      // Prepare payload
      const payload = {
        name,
        rank,
        base,
        role,
        id,
        suspect,
        signatureImage,
      };

      // make the API call
      const res: User = await getData(
        'http://localhost:8000/generate', payload
      )
      setUser(res);
      resetFormFields()
    } catch (error) {
      alert('Something Failed');
    }
  };

  const reload = () => {
    setUser(null);
    resetFormFields()
  };

  const saveSignature = () => {
    if (signatureCanvasRef) {
      signatureImage = (signatureCanvasRef as any).toDataURL();
      // Do something with the signature image (e.g., save it, display it, etc.)
    }
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


          <h2>Suspect Info</h2>
          <FormInput
            label="Full name"
            type="text"
            required
            name="suspect_name"
            value={suspect_name}
            onChange={handleChange}
          />
          <FormInput
            label="Personal ID"
            type="text"
            required
            name="suspect_id"
            value={suspect_id}
            onChange={handleChange}
          />
          <FormInput
            label="Rank"
            type='text' // TODO: Change to dropdown list
            required
            name='suspect_rank'
            value={suspect_rank}
            onChange={handleChange}
          />
          <FormInput
            label="Unit"
            type="text" // TODO: Change to dropdown list
            required
            name="suspect_unit"
            value={suspect_unit}
            onChange={handleChange}
          />

          <div className="signature">
            <SignatureCanvas
              ref={(ref: any) => setSignatureCanvasRef(ref)}
              canvasProps={{ width: 200, height: 100, className: 'signature-canvas' }}
            />
          </div>


          {/* TODO: add signature element */}
          <div className="button-group">
            <button type="submit">Generate</button>
            <span>
              <button type="button" onClick={reload}>Clear</button>
            </span>
          </div>
        </form>
      </div >
    </div >
  );
}

export default App;
