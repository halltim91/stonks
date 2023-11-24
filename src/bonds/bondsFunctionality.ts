import React from 'react';
import DisplayIndividualBonds from '../components/bonds/individualBonds';

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

    for (let num of range)
      if (num < currentSmallest) currentSmallest = num;

    return currentSmallest;
  }

  findHighestNumber(range: number[]): number {
    let currentLargest = 0;

    for (let num of range)
      if (num > currentLargest) currentLargest = num;

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
  
    if (arrayOfAllPrices.length > 1)
      arrayOfAllPrices.pop()
  
    return arrayOfAllPrices;
  }
}

export class BondObject {
  createFromBondEntry(bondEntry: string[]) {
    if (bondEntry.length === 0) return new Bond('', [], [], [], [], []);

    let name: string = bondEntry[0];
    let close: number[] = [];
    let open: number[] = [];
    let high: number[] = [];
    let low: number[] = [];
    let dateTime: string[] = [];

    try {
      for (let i = 1; i < bondEntry.length; i++) {
        if (i % 5 === 1) close.push(Number(bondEntry[i]));
        else if (i % 5 === 2) open.push(Number(bondEntry[i]));
        else if (i % 5 === 3) high.push(Number(bondEntry[i]));
        else if (i % 5 === 4) low.push(Number(bondEntry[i]));
        else if (i % 5 === 0) dateTime.push(bondEntry[i]);
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

export class BondsContainer {
  validator;

  constructor(validator: BondsDataValidator) {
    this.validator = validator;
  }

  create(
    bond: Bond
  ): React.DetailedReactHTMLElement<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
    const isValid = this.validator.validateBondObject(bond);

    if (isValid === false) {
      console.error('Found an invalid bond entry');

      const bondContainer = React.createElement('div', null, '');

      return bondContainer;
    }

    const name = React.createElement('span', null, bond.name);
    const close = React.createElement(
      'span',
      null,
      bond.close[bond.close.length - 1]
    );
    const open = React.createElement(
      'span',
      null,
      bond.open[bond.open.length - 1]
    );
    const high = React.createElement(
      'span',
      null,
      bond.high[bond.open.length - 1]
    );
    const low = React.createElement(
      'span',
      null,
      bond.low[bond.open.length - 1]
    );
    const dateTime = React.createElement(
      'span',
      null,
      bond.dateTime[bond.open.length - 1]
    );

    const bondInformation = [name, close, open, high, low, dateTime];

    const bondContainer = React.createElement('div', null, bondInformation);

    return bondContainer;
  }
}
