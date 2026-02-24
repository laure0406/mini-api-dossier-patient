import { PatientRecord } from '../models/patientRecord';
import {Request, Response} from 'express';

// Création d'une petite base de données pour tester l'API
let records: PatientRecord[] = [];
// création de dossiers pour le test
const dossier1:PatientRecord={
    id: 1,
    name: "maitre",
    age: 21,
    medicalHistory: ["jambe cassée"],
    currentMedications: [],
    //allergies: [] pas obligatoire
}
const dossier2:PatientRecord={
    id: 2,
    name: "innocenti",
    age: 21,
    medicalHistory: ["opération dents de sagesse"],
    currentMedications: [],
    //allergies: [] pas obligatoire
}
records.push(dossier1,dossier2);
let idPatient=2; //une variable qui va permettre d'auto-incrémenter l'id patient pour éviter les erreurs

// Fonction de validation du type d'entrée
const validationType = (data:any): data is PatientRecord => { //type any, pour accepter n'importe quel type de données entrantes
  if( 
    //typeof data.id === 'number' && inutile si l'indice s'autoincrémente
    typeof data.name === 'string' &&
    typeof data.age === 'number' &&
    Array.isArray(data.medicalHistory) &&
    Array.isArray(data.currentMedications)&&
    (data.allergies=== undefined || Array.isArray(data.allergies))
  ){
    return true;
  }
  return false;    
    
};

export const getAllRecords = (req:Request, res:Response) => {
  res.status(200).json(records); //renvoie le tableau de DP
};

export const getRecordById = (req:Request, res:Response) => {
  const id = parseInt(req.params.id,10); //récupère l'id qui provient de la requête, 10 transforme l'id en base hexadécimal
  const record = records.find(r => r.id === id); //cherche le dossier qui correspond à l'ID
  if (record) { // si le record existe
    res.status(200).json(record); // on renvoie la réponse sous forme de json
  } else {
    res.status(404).send("Le dossier n'existe pas."); // si elle n'existe pas, on renvoie "record not found"
  }
};

export const createRecord = (req:Request, res:Response) => {
    //const newDossier: PatientRecord = req.body; //on crée un nouveau dossier en récupérant le corps de la requête client   
    const newDP=req.body;
    if (validationType(newDP)){
      const newDossier:PatientRecord ={
        ...newDP, //copie de newDP
        id: idPatient+=1
      }
      records.push(newDossier); //on ajoute le nouveau dossier à notre mini BDD
      res.status(201).json(newDossier); // indique que la requête a réussi et qu'une ressource a été créée en conséquence.
    }
    else{
      res.status(400).json({error: "Le format n'est pas bon, le dossier n'a pas été créé."}); // problème dans le format, impossible de créer le dossier patient
    }
};

export const updateRecord = (req:Request, res:Response) => {
  const id = parseInt(req.params.id, 10); //récupère l'ID du DP à modifier
  const recordIndex = records.findIndex(r => r.id === id); // récupère l'indice du DP dans records
  if (recordIndex >= 0) {
    records[recordIndex] = req.body; //le DP à l'indice recordsIndex devient le nouveau DP entré par le client
    res.json(records); //on renvoie le nouveau DP
  } else {
    res.status(404).send("Le dossier n'existe pas.");
  }
};

export const deleteRecord = (req:Request, res:Response) => {
  const id = parseInt(req.params.id, 10); //récupère l'ID du DP à supprimer.
  const recordIndex = records.findIndex(r => r.id === id); //récupère l'index du DP dans le tableau de patient (records)
  if (recordIndex >= 0) {
    records.splice(recordIndex, 1); //splice, pour supprimer le DP dans records, et 1 pour dire cb d'éléments je veux supprimer à partir de cet indice, ici que 1 seul.
    res.status(204).send(`Dossier patient numéro ${id} supprimé`); //renvoyer le statut 204 pour dire qu'on a bien supprimé mais qu'on ne retourne aucun contenu
  } else {
    res.status(404).send("Le dossier n'existe pas.");
  }
};
