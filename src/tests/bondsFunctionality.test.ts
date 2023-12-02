import {
  BondsDataValidator,
  bondStatistics,
  Bond,
  bondStatisticsUtilities,
  BondObject,
} from '../bonds/bondsFunctionality';

describe('Get all prices in array', () => {
  it('no prices', () => {
    const bond = new Bond('', [], [], [], [], []);

    const bondStatisticsUtilitiesObject = new bondStatisticsUtilities();

    const result = bondStatisticsUtilitiesObject.returnArrayOfAllPrices(bond);

    expect(result).toStrictEqual([0]);
  });

  it('1 price in close prices array only', () => {
    const bond = new Bond('', [2], [], [], [], []);

    const bondStatisticsUtilitiesObject = new bondStatisticsUtilities();

    const result = bondStatisticsUtilitiesObject.returnArrayOfAllPrices(bond);

    expect(result).toStrictEqual([2]);
  });

  it('2 prices in close prices array only', () => {
    const bond = new Bond('', [2, 4], [], [], [], []);

    const bondStatisticsUtilitiesObject = new bondStatisticsUtilities();

    const result = bondStatisticsUtilitiesObject.returnArrayOfAllPrices(bond);

    expect(result).toStrictEqual([4, 2]);
  });

  it('1 price in open prices array only', () => {
    const bond = new Bond('', [], [2], [], [], []);

    const bondStatisticsUtilitiesObject = new bondStatisticsUtilities();

    const result = bondStatisticsUtilitiesObject.returnArrayOfAllPrices(bond);

    expect(result).toStrictEqual([2]);
  });

  it('2 prices in open prices array only', () => {
    const bond = new Bond('', [], [2, 4], [], [], []);

    const bondStatisticsUtilitiesObject = new bondStatisticsUtilities();

    const result = bondStatisticsUtilitiesObject.returnArrayOfAllPrices(bond);

    expect(result).toStrictEqual([4, 2]);
  });

  it('1 price in high prices array only', () => {
    const bond = new Bond('', [], [], [2], [], []);

    const bondStatisticsUtilitiesObject = new bondStatisticsUtilities();

    const result = bondStatisticsUtilitiesObject.returnArrayOfAllPrices(bond);

    expect(result).toStrictEqual([2]);
  });

  it('2 prices in high prices array only', () => {
    const bond = new Bond('', [], [], [2, 4], [], []);

    const bondStatisticsUtilitiesObject = new bondStatisticsUtilities();

    const result = bondStatisticsUtilitiesObject.returnArrayOfAllPrices(bond);

    expect(result).toStrictEqual([4, 2]);
  });

  it('1 price in low prices array only', () => {
    const bond = new Bond('', [], [], [], [2], []);

    const bondStatisticsUtilitiesObject = new bondStatisticsUtilities();

    const result = bondStatisticsUtilitiesObject.returnArrayOfAllPrices(bond);

    expect(result).toStrictEqual([2]);
  });

  it('2 prices in low prices array only', () => {
    const bond = new Bond('', [], [], [], [2, 4], []);

    const bondStatisticsUtilitiesObject = new bondStatisticsUtilities();

    const result = bondStatisticsUtilitiesObject.returnArrayOfAllPrices(bond);

    expect(result).toStrictEqual([4, 2]);
  });
});

describe('Test bondStatistics', () => {
  it('no numbers in input array to highest number function', () => {
    const bondStatisticsObject = new bondStatistics();

    const range: number[] = [];

    const result = bondStatisticsObject.findHighestNumber(range);

    expect(result).toBe(0);
  });

  it('find highest number, 1 number in input array', () => {
    const bondStatisticsObject = new bondStatistics();

    const range = [1];

    const result = bondStatisticsObject.findHighestNumber(range);

    expect(result).toBe(1);
  });

  it('find highest number, 2 numbers in input array', () => {
    const bondStatisticsObject = new bondStatistics();

    const range = [1, 12];

    const result = bondStatisticsObject.findHighestNumber(range);

    expect(result).toBe(12);
  });

  it('find highest number', () => {
    const bondStatisticsObject = new bondStatistics();

    const range = [1, 0, 3, 6, 9, 12];

    const result = bondStatisticsObject.findHighestNumber(range);

    expect(result).toBe(12);
  });

  it('no numbers in input array to lowest number function', () => {
    const bondStatisticsObject = new bondStatistics();

    const range: number[] = [];

    const result = bondStatisticsObject.findLowestNumber(range);

    expect(result).toBe(Number.MAX_VALUE);
  });

  it('find lowest number, 1 number in input array', () => {
    const bondStatisticsObject = new bondStatistics();

    const range = [1];

    const result = bondStatisticsObject.findLowestNumber(range);

    expect(result).toBe(1);
  });

  it('find lowest number, 2 numbers in input array', () => {
    const bondStatisticsObject = new bondStatistics();

    const range = [1, 12];

    const result = bondStatisticsObject.findLowestNumber(range);

    expect(result).toBe(1);
  });

  it('find lowest number', () => {
    const bondStatisticsObject = new bondStatistics();

    const range = [1, 0, 3, 6, 9, 12];

    const result = bondStatisticsObject.findLowestNumber(range);

    expect(result).toBe(0);
  });
});

describe('Create a bond object from a bond entry string', () => {
  it('Length of the string is 0', () => {
    const bondObjectMaker = new BondObject();

    const bondEntryString = '';

    const result = bondObjectMaker.createFromBondEntry(bondEntryString);

    expect(result).toStrictEqual(new Bond('', [], [], [], [], []));
  });

  it('String has 1 entry', () => {
    const bondObjectMaker = new BondObject();

    const bondEntryString = '1, 1, 1, 1, 1, 1';

    const result = bondObjectMaker.createFromBondEntry(bondEntryString);

    expect(result).toStrictEqual(new Bond('1', [1], [1], [1], [1], [' 1']));
  });

  it('String has 1 entry only name', () => {
    const bondObjectMaker = new BondObject();

    const bondEntryString = '1';

    const result = bondObjectMaker.createFromBondEntry(bondEntryString);

    expect(result).toStrictEqual(new Bond('1', [], [], [], [], []));
  });

  it('String has 1 entry, name and close price present', () => {
    const bondObjectMaker = new BondObject();

    const bondEntryString = '1, 1';

    const result = bondObjectMaker.createFromBondEntry(bondEntryString);

    expect(result).toStrictEqual(new Bond('1', [1], [], [], [], []));
  });

  it('String has 1 entry, name, close price, and open price present', () => {
    const bondObjectMaker = new BondObject();

    const bondEntryString = '1, 1, 1';

    const result = bondObjectMaker.createFromBondEntry(bondEntryString);

    expect(result).toStrictEqual(new Bond('1', [1], [1], [], [], []));
  });

  it('String has 1 entry, name, close price, open price, and high price present', () => {
    const bondObjectMaker = new BondObject();

    const bondEntryString = '1, 1, 1, 1';

    const result = bondObjectMaker.createFromBondEntry(bondEntryString);

    expect(result).toStrictEqual(new Bond('1', [1], [1], [1], [], []));
  });

  it('String has 1 entry, name, close price, open price, high price, and low price present', () => {
    const bondObjectMaker = new BondObject();

    const bondEntryString = '1, 1, 1, 1, 1';

    const result = bondObjectMaker.createFromBondEntry(bondEntryString);

    expect(result).toStrictEqual(new Bond('1', [1], [1], [1], [1], []));
  });

  it('String has 2 entries', () => {
    const bondObjectMaker = new BondObject();

    const bondEntryString = '1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2';

    const result = bondObjectMaker.createFromBondEntry(bondEntryString);

    expect(result).toStrictEqual(
      new Bond('1', [1, 2], [1, 2], [1, 2], [1, 2], [' 1', ' 2'])
    );
  });
});

describe('Test the bond entry validator', () => {
  it('The bond entry should be valid with 6 entries in data entry', () => {
    const bondsDataValidator = new BondsDataValidator();

    let bondEntry: string[] = [];

    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');

    const isValid = bondsDataValidator.validateBondEntry(bondEntry);

    expect(isValid).toBe(true);
  });

  it('The bond entry should be invalid with 5 entries in data entry', () => {
    const bondsDataValidator = new BondsDataValidator();

    let bondEntry: string[] = [];

    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');

    const isValid = bondsDataValidator.validateBondEntry(bondEntry);

    expect(isValid).toBe(false);
  });

  it('The bond entry should be invalid with 7 spots in data entry', () => {
    const bondsDataValidator = new BondsDataValidator();

    let bondEntry: string[] = [];

    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');

    const isValid = bondsDataValidator.validateBondEntry(bondEntry);

    expect(isValid).toBe(false);
  });

  it('The bond entry should be invalid with empty 1st spot in data entry', () => {
    const bondsDataValidator = new BondsDataValidator();

    let bondEntry: string[] = [];

    bondEntry.push('');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');

    const isValid = bondsDataValidator.validateBondEntry(bondEntry);

    expect(isValid).toBe(false);
  });

  it('The bond entry should be invalid with empty 2nd spot in data entry', () => {
    const bondsDataValidator = new BondsDataValidator();

    let bondEntry: string[] = [];

    bondEntry.push('a');
    bondEntry.push('');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');

    const isValid = bondsDataValidator.validateBondEntry(bondEntry);

    expect(isValid).toBe(false);
  });

  it('The bond entry should be invalid with empty 3rd spot in data entry', () => {
    const bondsDataValidator = new BondsDataValidator();

    let bondEntry: string[] = [];

    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');

    const isValid = bondsDataValidator.validateBondEntry(bondEntry);

    expect(isValid).toBe(false);
  });

  it('The bond entry should be invalid with empty 4th spot in data entry', () => {
    const bondsDataValidator = new BondsDataValidator();

    let bondEntry: string[] = [];

    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('');
    bondEntry.push('a');
    bondEntry.push('a');

    const isValid = bondsDataValidator.validateBondEntry(bondEntry);

    expect(isValid).toBe(false);
  });

  it('The bond entry should be invalid with empty 5th spot in data entry', () => {
    const bondsDataValidator = new BondsDataValidator();

    let bondEntry: string[] = [];

    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('');
    bondEntry.push('a');

    const isValid = bondsDataValidator.validateBondEntry(bondEntry);

    expect(isValid).toBe(false);
  });

  it('The bond entry should be invalid with empty 6th spot in data entry', () => {
    const bondsDataValidator = new BondsDataValidator();

    let bondEntry: string[] = [];

    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('a');
    bondEntry.push('');

    const isValid = bondsDataValidator.validateBondEntry(bondEntry);

    expect(isValid).toBe(false);
  });
});
