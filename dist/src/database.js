"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const uri = process.env.URI;
const client = new mongodb_1.MongoClient(uri);
client.connect(err => {
    // CODIGO EJEMPLO PARA SELECCIONAR BASE DE DATOS Y COLECCION DE DATOS
    // const collection = client.db("DB_jwt").collection("users");
    console.log(err);
});
exports.default = client;
//# sourceMappingURL=database.js.map