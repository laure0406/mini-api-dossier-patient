import { Router } from 'express'; //fonction d'express qui permet de créer des objets routeurs pour organiser et férer les routes de l'application
import {
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord
} from '../controllers/patientRecordController'; //remonte d'un niveau puis entre dans controllers à partir du fichier dans lequel on est

const router = Router(); //création du routeur 

router.get('/records', getAllRecords); //appelle la foncion getAllRecords 
router.get('/records/:id', getRecordById); //:id est un paramètre de route dynamique qui représente l'id du dossier à récupérer
router.post('/records', createRecord); 
router.put('/records/:id', updateRecord);
router.delete('/records/:id', deleteRecord);

export default router; //exporter le routeur pour pouvoir l'utiliser dans le fichier d'entrée
