"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello World From the Typescript Server!');
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
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
app.post('/login', (req, res) => {
    const { id, name, rank, base, role, suspect } = req.body;
    const user = { id, name, rank, base, role };
    // const user = users.find(user => {
    //   return user.name === name && user.rank === rank
    // });
    // if (!user) {
    //   return res.status(404).send('User Not Found!')
    // }
    return res.status(200).json({ user, suspect });
});
