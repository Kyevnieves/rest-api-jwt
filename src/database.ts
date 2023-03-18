import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = process.env.URI;
const client = new MongoClient(uri);

client.connect(err => {
  // CODIGO EJEMPLO PARA SELECCIONAR BASE DE DATOS Y COLECCION DE DATOS
  // const collection = client.db("DB_jwt").collection("users");
  console.log(err)
});

export default client