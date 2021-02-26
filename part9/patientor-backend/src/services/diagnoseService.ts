import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData;

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
}

const addDagnose = () => {
  return null;
}

export default { 
  getDiagnoses,
  addDagnose
}