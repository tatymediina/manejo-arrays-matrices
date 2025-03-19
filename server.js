import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

let personas = [];

app.post("/agregar", (req, res) => {
    const { nombre, edad, nota } = req.body;
    if (nombre && !isNaN(edad) && !isNaN(nota)) {
        personas.push({ nombre, edad, nota });
        res.json({ success: true, personas });
    } else {
        res.status(400).json({ success: false, message: "Datos inválidos" });
    }
});

app.get("/personas", (req, res) => {
    res.json(personas);
});

app.get("/ordenadas", (req, res) => {
    const ordenadas = [...personas].sort((a, b) => b.nota - a.nota);
    res.json(ordenadas);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
