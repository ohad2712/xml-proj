"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jspdf_1 = require("jspdf");
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
app.post('/generate', (req, res) => {
    const { id, name, rank, base, role, suspect, signatureImage } = req.body;
    const user = { id, name, rank, base, role, signatureImage };
    // const user = users.find(user => {
    //   return user.name === name && user.rank === rank
    // });
    // if (!user) {
    //   return res.status(404).send('User Not Found!')
    // }
    console.log({ user, suspect });
    const form = generatePdfForm(user, suspect);
    form.save(`Form-${(new Date()).getDate()}.pdf`);
    return res.status(200).json({ user, suspect });
});
function generatePdfForm(user, suspect) {
    createBasePdfStructure();
    const form = new jspdf_1.jsPDF();
    form.text('Hello World!', 10, 10);
    form.text(`ID: ${user.id}, Full Name: ${user.name}`, 20, 20);
    form.text(`Suspect id: ${suspect.id}, Full Name: ${suspect.name}`, 20, 40);
    return form;
}
function createBasePdfStructure() {
}
