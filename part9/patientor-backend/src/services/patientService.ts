import patients from '../../data/patients'
import { NonSensitivePatient, Patient } from '../types'

const getPatients = (): Patient[] => {
  return patients;
}

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

const addPatient = () => {
  return null;
}

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
}