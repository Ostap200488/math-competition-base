const { add } = require('../../utils/mathUtilities'); // Import the function to be tested

describe('Math Utilities', () => {
  test('should add two numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
  });
});
