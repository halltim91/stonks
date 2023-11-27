import { Bond, BondObject } from '../../bonds/bondsFunctionality';
import React, { useState } from 'react';
import ProcessIndividualBonds from './individualBonds';
import Frame from '../frame';
import "../../css/table.css";
import "./mainComponent.css";

const bondEntry1 = [
  'Dummy name',
  '50',
  '51',
  '52',
  '53',
  '2023-11-23',
  '55',
  '59',
  '52',
  '53',
  '2023-11-24',
  '55',
  '59',
  '52',
  '53',
  '2023-11-25',
  '55.11',
  '59.11',
  '52.11',
  '53.67',
  '2023-11-26',
];
const bondEntry2 = [
  'Dummy name',
  '50',
  '51',
  '52',
  '53',
  '2023-11-23',
  '50',
  '51',
  '52',
  '53',
  '2023-11-24',
];

const bondEntries = [bondEntry1, bondEntry2];

// later I will hook up the file and these arrays will go away

export default function BondsComponent() {
  let arrayOfBondObjects: Bond[] = [];

  let bondObjectClass = new BondObject();
  let bondObject: Bond;

  for (const bondEntry of bondEntries) {
    bondObject = bondObjectClass.createFromBondEntry(bondEntry);
    arrayOfBondObjects.push(bondObject);
  }

  return (
    <Frame title='Bonds'>
      <table>
        <thead>
          <tr>
            <th className='headingRowName'>Name</th>
            <th className='headingRowPrices'>Close</th>
            <th className='headingRowPrices'>Open</th>
            <th className='headingRowPrices'>High</th>
            <th className='headingRowPrices'>Low</th>
          </tr>
        </thead>
        <tbody>
          <ProcessIndividualBonds bondData={arrayOfBondObjects[0]} />
          <ProcessIndividualBonds bondData={arrayOfBondObjects[1]} />
        </tbody>
      </table>
    </Frame>
  );
}

// https://www.geeksforgeeks.org/html-tables/