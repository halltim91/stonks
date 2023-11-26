import {
  Bond,
  BondObject,
  BondsDataValidator,
  BondsContainer,
} from '../../bonds/bondsFunctionality';
import BondsPageHeader from './header';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import ProcessIndividualBonds from './individualBonds';
import Frame from '../frame';

const bondEntry1 = ['Dummy name', '50', '51', '52', '53', '2023-11-23', '55', '59', '52', '53', '2023-11-24', '55', '59', '52', '53', '2023-11-25', '55', '59', '52', '53', '2023-11-26'];
const bondEntry2 = ['Dummy name', '50', '51', '52', '53', '2023-11-23', '50', '51', '52', '53', '2023-11-24'];

const bondEntries = [bondEntry1, bondEntry2];

// later I will hook up the file and these arrays will go away

export default function BondsComponent() {
  const bondsDataValidator = new BondsDataValidator();
  const bondsContainer = new BondsContainer(bondsDataValidator);
  let containerOfbondContainers = [];
  let container: React.DetailedReactHTMLElement<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
  let arrayOfBondObjects: Bond[] = [];

  let bondObjectClass = new BondObject();
  let bondObject: Bond;

  for (const bondEntry of bondEntries) {
    bondObject = bondObjectClass.createFromBondEntry(bondEntry);
    arrayOfBondObjects.push(bondObject);
    container = bondsContainer.create(bondObject);
    containerOfbondContainers.push(container);
  }

  return (
    <div>
      <Frame title='Bonds'>
        <BondsPageHeader />
        <ProcessIndividualBonds container={containerOfbondContainers[0]} modalChartData={arrayOfBondObjects[0]} />
        <ProcessIndividualBonds container={containerOfbondContainers[1]} modalChartData={arrayOfBondObjects[1]} />
      </Frame>
    </div>
  );
}
