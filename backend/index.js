const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const puerto =  3000 || process.env.PORT;

dotenv.config()

const galeriaRoute = require("./routes/galeria");

mongoose.connect(process.env.STRING_CONEXION)
.then(() => console.log("Conectado"))
.catch((err) => console.log("La conexion fallo"));

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use("/Imagenes", express.static(__dirname + `Imagenes`));
app.use(express.json());
app.use("/api", galeriaRoute);

app.listen(puerto, () =>{
    console.log(`http://localhost:${puerto}`)
});
