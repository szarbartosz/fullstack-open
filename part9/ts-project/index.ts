/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { parseArguments, calculateBmi } from './bmiCalculator';
import { parseArguments as parseExercisesParameters, calculateExcercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('hello fullstack!');
});

app.get('/bmi', (req,res) => {
  const height = String(req.query.height);
  const mass = String(req.query.weight);
  const parameters: string[] = ['', '', height, mass];   

  try {
    const { height, mass } = parseArguments(parameters);
    
    res.status(200).json({ 
      weight: mass,
      height: height,
      bmi: calculateBmi(height, mass) 
    });
  } catch (e) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const daily_exercises: number[] = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target: number = req.body.target;
  const parameters: string[] = ['', '', String(target), String(...daily_exercises)]; 

  try {
    const { training, target } = parseExercisesParameters(parameters);
      res.status(200).json(calculateExcercises(training, target));
  } catch (e) {
      res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});