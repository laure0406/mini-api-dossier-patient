export interface PatientRecord {
    id: number;
    name: string;
    age: number;
    medicalHistory: string[];
    currentMedications: string[];
    allergies?: string[];
  }
  