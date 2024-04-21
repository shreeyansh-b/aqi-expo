type possibleValues =
  | 25
  | 50
  | 75
  | 100
  | 125
  | 150
  | 175
  | 200
  | 300
  | 400
  | 401;
export const nearestMultipleOf25 = (num: number): possibleValues => {
  // If num is 0, return 25
  if (num === 0) {
    return 25;
  }

  // If num is greater than 400, return 401
  if (num > 400) {
    return 401;
  }

  // Calculate the nearest multiple of 25 within the specified range
  if (num <= 200) {
    return (Math.ceil(num / 25) * 25) as possibleValues;
  } else if (num <= 300) {
    return 200;
  } else {
    return 300;
  }
};
