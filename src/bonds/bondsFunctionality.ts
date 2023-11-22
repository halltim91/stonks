import React from 'react';
import DisplayIndividualBonds from '../components/bonds/individualBonds';

export class Bond {
  name: string;
  close: string[];
  open: string[];
  high: string[];
  low: string[];
  snapshotDate: string[];
  snapshotTime: string[];

  constructor(
    name: string,
    close: string[],
    open: string[],
    high: string[],
    low: string[],
    snapshotDate: string[],
    snapshotTime: string[]
  ) {
    this.name = name;
    this.close = close;
    this.open = open;
    this.high = high;
    this.low = low;
    this.snapshotDate = snapshotDate;
    this.snapshotTime = snapshotTime;
  }
}

export class BondObject {
  createFromBondEntry(bondEntry: string[]) {
    if (bondEntry.length === 0) return new Bond('', [], [], [], [], [], []);

    let name: string = bondEntry[0];
    let close: string[] = [];
    let open: string[] = [];
    let high: string[] = [];
    let low: string[] = [];
    let snapshotDate: string[] = [];
    let snapshotTime: string[] = [];

    for (let i = 1; i < bondEntry.length; i++) {
      if (i % 6 === 1) close.push(bondEntry[i]);
      else if (i % 6 === 2) open.push(bondEntry[i]);
      else if (i % 6 === 3) high.push(bondEntry[i]);
      else if (i % 6 === 4) low.push(bondEntry[i]);
      else if (i % 6 === 5) snapshotDate.push(bondEntry[i]);
      else if (i % 6 === 0) snapshotTime.push(bondEntry[i]);
    }

    return new Bond(name, close, open, high, low, snapshotDate, snapshotTime);
  }
}

export class BondsDataValidator {
  validateBondEntry(bondEntry: string[]) {
    if (bondEntry.length !== 7) return false;
    if (bondEntry[0] === '') return false;
    if (bondEntry[1] === '') return false;
    if (bondEntry[2] === '') return false;
    if (bondEntry[3] === '') return false;
    if (bondEntry[4] === '') return false;
    if (bondEntry[5] === '') return false;
    if (bondEntry[6] === '') return false;
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
    if (bond.snapshotDate === null) return false;
    if (bond.snapshotTime === null) return false;
    if (
      bond.close.length === bond.open.length &&
      bond.close.length === bond.high.length &&
      bond.close.length === bond.low.length &&
      bond.close.length === bond.snapshotDate.length &&
      bond.close.length === bond.snapshotTime.length
    )
      return false;
    return true;
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
    const snapshotTime = React.createElement(
      'span',
      null,
      bond.snapshotDate[bond.open.length - 1]
    );
    const snapshotDate = React.createElement(
      'span',
      null,
      bond.snapshotTime[bond.open.length - 1]
    );

    const bondInformation = [
      name,
      close,
      open,
      high,
      low,
      snapshotDate,
      snapshotTime,
    ];

    const bondContainer = React.createElement('div', null, bondInformation);

    return bondContainer;
  }
}
