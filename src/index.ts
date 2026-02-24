//Fichier point d'entrée
import patientRecordRoutes from './routes/patientRecordRoutes';

const express =require("express"); //serveur
const bodyParser =require("body-parser");
const cors = require('cors'); //pour la page html

const app = express();

const port = 3000;

app.use(bodyParser.json()); //pour parser en json des données entrantes
app.use(cors()); //pour autoriser les requetes depuis d'autres origines (page html)
app.use('/api', patientRecordRoutes); //utilise le routeur pour les requetes commencant par /api

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); //écoute les requêtes sur le port 3000
});

/* 
- Pour lancer le serveur: npx ts-node src/index.ts
- pas besoin de d'abord compiler en JS, on compile en TS mais si on voulait un lancement plus rapide, 
on pourrait d'abord compiler en js avec npx tsc (ou npx tsc --watch pour compiler automatiquement) puis après executer avec node dist/index.js
*/
