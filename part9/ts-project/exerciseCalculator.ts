interface TrainingDaysParameters {
  training: number[];
  target: number;
}

export const parseArguments = (args: Array<string>): TrainingDaysParameters => {
  if (args.length < 4) throw new Error('Not enough arguments');

  let correctDaysData = true;
  for (let i = 3; i < args.length; i++) {    
    if (isNaN(Number(args[i]))) {
      correctDaysData = false;
    }
  }
  

  if (!isNaN(Number(args[2])) && correctDaysData) {
    let training: number[] = [];
    for (let i = 3; i < args.length; i++) {
      training = training.concat(Number(args[i]));
    }
    
    return {
      training: training,
      target: Number(args[2])
    };
  } else {
    throw new Error('Provided parameters are invalid!');
  }
};

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  raiting: number,
  raitingDescription: string,
  target: number,
  average: number
}

export const calculateExcercises = (training: number[], target: number): Result => {
  const periodLength = training.length;
  const trainingDays = training.filter(t => t !== 0).length;
  const average = training.reduce((x, y) => x + y, 0) / periodLength;
  const success = average >= target;

  let raiting;
  let raitingDescription;
  if (average < 0.75 * target) {
    raiting = 1;
    raitingDescription = 'poor performance';
  } else if (average < target) {
    raiting = 2;
    raitingDescription = 'not bad';
  } else {
    raiting = 3;
    raitingDescription = 'cool, goal reached!';
  }  

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    raiting: raiting,
    raitingDescription: raitingDescription,
    target: target,
    average: average
  };
};

// try {
//   const { training, target } = parseArguments(process.argv);
//   console.log(calculateExcercises(training, target));
// } catch (e) {
//   console.log('error occurred: ', e);
// }
