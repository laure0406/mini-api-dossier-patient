# Exercice : Développement d'une API REST en TypeScript pour la gestion des dossiers médicaux

**Objectif : Créer une API REST simple pour gérer les dossiers médicaux des patients.**

**Instructions :**

1. Initialisation du projet :
    - Créez un nouveau projet TypeScript avec `npm init` et configurez TypeScript (`tsconfig.json`).
    - Installez les dépendances nécessaires : `express`, `body-parser`, et `typescript`.
3. Structure du projet :
    - Créez les dossiers suivants : `src`, `src/controllers`, `src/models`, `src/routes`.

5. Modèle de données :
    - Dans `src/models`, créez un fichier `patientRecord.ts` avec une interface `PatientRecord` qui contient les propriétés suivantes 

 ```ts
interface PatientRecord {
     id: number;
     name: string;
     age: number;
     medicalHistory: string[];
     currentMedications: string[];
     allergies?: string[];
}
```

4. Contrôleurs :
    - Dans `src/controllers`, créez un fichier `patientRecordController.ts` avec les fonctions suivantes :
        - `getAllRecords`: Récupère tous les dossiers médicaux.
        - `getRecordById`: Récupère un dossier médical par son ID.
        - `createRecord`: Crée un nouveau dossier médical.
        - `updateRecord`: Met à jour un dossier médical existant.
        - `deleteRecord`: Supprime un dossier médical par son ID.

6. Routes :
    - Dans `src/routes`, créez un fichier `patientRecordRoutes.ts` et définissez les routes pour chaque fonction du contrôleur.  
    Voir [https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html) pour la documentation