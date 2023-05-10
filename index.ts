
  import dotenv from "dotenv";
  import express, { Express, Request, Response } from "express";
  import cors from "cors";
  import { jsPDF } from 'jspdf';

  dotenv.config();

  const app: Express = express();

  app.use(express.json());
  app.use(cors());

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World From the Typescript Server!')
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
  

  
  interface FormInputs {
    id: string;
    name: string;
    rank: string; // TODO: add enum
    base: string; // TODO: add enum
    role: string;
    suspect: {
      id: string;
      name: string;
      rank: string; // TODO: add enum
      unit: string;
    },
    signatureImage: any; // TODO: better type this
  }

  app.post('/generate', (req: Request, res: Response) => {
    const { id, name, rank, base, role, suspect, signatureImage } : FormInputs = req.body;

    const user = { id, name, rank, base, role, signatureImage };
    // const user = users.find(user => {
    //   return user.name === name && user.rank === rank
    // });

    // if (!user) {
    //   return res.status(404).send('User Not Found!')
    // }
    console.log({user, suspect});
    
    const form = generatePdfForm(user, suspect);

    form.save(`Form-${(new Date()).getDate()}.pdf`);
    return res.status(200).json({user, suspect});
  });
  
  function generatePdfForm(user: any, suspect: any) {
    createBasePdfStructure();

    const form = new jsPDF();

    form.text('Hello World!', 10, 10);
    form.text(`ID: ${user.id}, Full Name: ${user.name}`, 20, 20);
    form.text(`Suspect id: ${suspect.id}, Full Name: ${suspect.name}`, 20, 40);

    return form;
  }

  function createBasePdfStructure() {

  }
