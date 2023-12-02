export class Bond {
  name: string;
  close: number[];
  open: number[];
  high: number[];
  low: number[];
  dateTime: string[];

  constructor(
    name: string,
    close: number[],
    open: number[],
    high: number[],
    low: number[],
    dateTime: string[]
  ) {
    this.name = name;
    this.close = close;
    this.open = open;
    this.high = high;
    this.low = low;
    this.dateTime = dateTime;
  }
}

export class bondStatistics {
  findLowestNumber(range: number[]): number {
    let currentSmallest = Number.MAX_VALUE;

    for (let num of range) if (num < currentSmallest) currentSmallest = num;

    return currentSmallest;
  }

  findHighestNumber(range: number[]): number {
    let currentLargest = 0;

    for (let num of range) if (num > currentLargest) currentLargest = num;

    return currentLargest;
  }
}

export class bondStatisticsUtilities {
  returnArrayOfAllPrices(bond: Bond): number[] {
    let arrayOfAllPrices: number[] = [0];

    for (let i = 0; i < bond.close.length; i++)
      arrayOfAllPrices.push(bond.close[i]);

    for (let i = 0; i < bond.open.length; i++)
      arrayOfAllPrices.push(bond.open[i]);

    for (let i = 0; i < bond.high.length; i++)
      arrayOfAllPrices.push(bond.high[i]);

    for (let i = 0; i < bond.low.length; i++)
      arrayOfAllPrices.push(bond.low[i]);

    arrayOfAllPrices = arrayOfAllPrices.reverse();

    if (arrayOfAllPrices.length > 1) arrayOfAllPrices.pop();

    return arrayOfAllPrices;
  }
}

export class BondObject {
  createFromBondEntry(bondEntry: string) {
    if (bondEntry.length === 0) return new Bond('', [], [], [], [], []);

    const bondEntryArray = bondEntry.split(',');

    let name: string = bondEntryArray[0];
    let close: number[] = [];
    let open: number[] = [];
    let high: number[] = [];
    let low: number[] = [];
    let dateTime: string[] = [];

    try {
      for (let i = 1; i < bondEntryArray.length; i++) {
        if (i % 5 === 1) close.push(Number(bondEntryArray[i]));
        else if (i % 5 === 2) open.push(Number(bondEntryArray[i]));
        else if (i % 5 === 3) high.push(Number(bondEntryArray[i]));
        else if (i % 5 === 4) low.push(Number(bondEntryArray[i]));
        else if (i % 5 === 0) dateTime.push(bondEntryArray[i]);
      }
    } catch {
      return new Bond('', [], [], [], [], []);
    }

    return new Bond(name, close, open, high, low, dateTime);
  }
}

export class BondsDataValidator {
  validateBondEntry(bondEntry: string[]) {
    if (bondEntry.length !== 6) return false;
    if (bondEntry[0] === '') return false;
    if (bondEntry[1] === '') return false;
    if (bondEntry[2] === '') return false;
    if (bondEntry[3] === '') return false;
    if (bondEntry[4] === '') return false;
    if (bondEntry[5] === '') return false;
    return true;
  }

  validateBondObject(bond: Bond) {
    if (bond === null) return false;
    if (bond.name === null) return false;
    if (bond.name.trim() === '') return false;
    if (bond.close === null) return false;
    if (bond.open === null) return false;
    if (bond.high === null) return false;
    if (bond.low === null) return false;
    if (bond.dateTime === null) return false;
    if (
      bond.close.length === bond.open.length &&
      bond.close.length === bond.high.length &&
      bond.close.length === bond.low.length &&
      bond.close.length === bond.dateTime.length
    )
      return true;
    return false;
  }
}

// Used Visual Studio Code