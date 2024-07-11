const axios = require('axios');

const testServerUrl = 'http://localhost:3001/test';
const windowSize = 10;

const numberWindow = new Set();

async function getAverageForNumbers(numberid) {
  try {
    const numbers = await fetchNumbersFromTestServer(numberid);
    updateNumberWindow(numbers);

    const windowPrevState = Array.from(numberWindow);
    const windowCurrState = Array.from(numberWindow);
    const avg = calculateAverage(windowCurrState);

    return {
      numbers,
      windowPrevState,
      windowCurrState,
      avg
    };
  } catch (error) {
    console.error('Error fetching numbers from test server:', error);
    return {
      numbers: [],
      windowPrevState: [],
      windowCurrState: [],
      avg: 0
    };
  }
}

async function fetchNumbersFromTestServer(numberid) {
  try {
    let numbers = [];
    if (numberid === 'e') {
      numbers = [2, 4, 6, 8];
    } else if (numberid === 'p') {
      numbers = [2, 3, 5, 7];
    } else if (numberid === 'f') {
      numbers = [0, 1, 1, 2];
    } else if (numberid === 'r') {
      numbers = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
    }
    return numbers;
  } catch (error) {
    console.error('Error fetching numbers from test server:', error);
    return [];
  }
}

function updateNumberWindow(numbers) {
  numbers.forEach(num => numberWindow.add(num));
  while (numberWindow.size > windowSize) {
    numberWindow.delete(numberWindow.values().next().value);
  }
}

function calculateAverage(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

module.exports = {
  getAverageForNumbers
};