import { Bond, BondObject } from '../../bonds/bondsFunctionality';
import React, { useEffect, useState } from 'react';
import ProcessIndividualBonds from './individualBonds';
import Frame from '../frame';
import '../../css/table.css';
import './mainComponent.css';
import axios from 'axios';
import { react } from 'plotly.js';
import {bondEntries} from "./bondData";


export default function BondsComponent() {
  let arrayOfBondObjects: Bond[] = [];

  let bondObjectClass = new BondObject();
  let bondObject: Bond;

  for (const bondEntry of bondEntries) {
    bondObject = bondObjectClass.createFromBondEntry(bondEntry);
    arrayOfBondObjects.push(bondObject);
  }

  if (arrayOfBondObjects === undefined) return <div>There are no bonds</div>

  return (
    <Frame title='Bonds'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Close</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </thead>
        <tbody>

          <ProcessIndividualBonds bondData={arrayOfBondObjects[0]} />
          <ProcessIndividualBonds bondData={arrayOfBondObjects[1]} />
          <ProcessIndividualBonds bondData={arrayOfBondObjects[0]} />
          <ProcessIndividualBonds bondData={arrayOfBondObjects[1]} />
          <ProcessIndividualBonds bondData={arrayOfBondObjects[0]} />

        </tbody>
      </table>
    </Frame>
  );
}

// https://www.geeksforgeeks.org/html-tables/
