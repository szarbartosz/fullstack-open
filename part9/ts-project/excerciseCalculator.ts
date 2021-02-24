interface result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  raiting: number,
  raitingDescription: string,
  target: number,
  average: number
}

const calculateExcercises = (training: number[], target: number): result => {
  const periodLength = training.length
  const trainingDays = training.filter(t => t !== 0).length
  const average = training.reduce((x, y) => x + y, 0) / periodLength
  const success = average >= target

  let raiting
  let raitingDescription
  if (average < 0.75 * target) {
    raiting = 1
    raitingDescription = 'poor performance'
  } else if (average < target) {
    raiting = 2
    raitingDescription = 'not bad'
  } else {
    raiting = 3
    raitingDescription = 'cool, goal reached!'
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    raiting: raiting,
    raitingDescription: raitingDescription,
    target: target,
    average: average
  }
}

console.log(calculateExcercises([3, 0, 2, 4.5, 0, 3, 1], 2));
