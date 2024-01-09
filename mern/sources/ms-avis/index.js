const express = require('express');
const mongoose = require('mongoose');


const app =  express();
app.use(express.urlencoded());
app.use(express.json());

// Définition des variables d'environnement
const mongodbHost = process.env.MONGODB_HOST ;
const mongodbPort = process.env.MONGODB_PORT ;
const mongodbUsername = process.env.MONGODB_USERNAME ;
const mongodbPassword = process.env.MONGODB_PASSWORD ;
console.log("mongodbHost = ")
const mongodbUri = `mongodb://${mongodbUsername}:${mongodbPassword}@${mongodbHost}:${mongodbPort}/avis?authSource=admin`;
console.log (mongodbUri)

// Connexion à MongoDB
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema = new mongoose.Schema({
  texte: String,
  email: String

});

const AvisModel = mongoose.model("avis", schema);

app.get('/api/avis', async (req, res) => {
  const data = await AvisModel.find({});
  res.json(data)
})

app.post('/api/avis', async (req, res) => {
  const texte = req.body.texte;
  const email = req.body.email;
  const avis = await AvisModel.create({texte, email});
  await avis.save()
  console.log(avis);
})

app.listen(8000, () => console.log("App is listening on port 8000"))