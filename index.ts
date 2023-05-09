
  import dotenv from "dotenv";
  import express, { Express, Request, Response } from "express";
  import path from "path";
  import cors from "cors";

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
    }
  }

  // Array of example users for testing purposes
  const users = [
    {
      id: '11111111',
      name: 'Maria Doe',
      rank: 'A',
      base: '11',
      role: 'a',
    },
    {
      id: '222222222',
      name: 'Juan Doe',
      rank: 'B',
      base: '22',
      role: 'b',
    }
  ];

  // route login
  app.post('/login', (req: Request, res: Response) => {
    const { id, name, rank, base, role, suspect } : FormInputs = req.body;

    const user = { id, name, rank, base, role };
    // const user = users.find(user => {
    //   return user.name === name && user.rank === rank
    // });

    // if (!user) {
    //   return res.status(404).send('User Not Found!')
    // }

    return res.status(200).json({user, suspect});
  });
  