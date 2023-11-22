import {
  Bond,
  BondObject,
  BondsDataValidator,
  BondsContainer,
} from '../../bonds/bondsFunctionality';
import BondsPageHeader from './header';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import DisplayIndividualBonds from './individualBonds';

const bondEntry1 = ['1', '50', '51', '52', '53', '2023-11-23', '50', '51', '52', '53', '2023-11-24'];
const bondEntry2 = ['1', '50', '51', '52', '53', '2023-11-23', '50', '51', '52', '53', '2023-11-24'];

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
      <BondsPageHeader />
      <DisplayIndividualBonds container={containerOfbondContainers[0]} modalChartData={arrayOfBondObjects[0]} />
      <DisplayIndividualBonds container={containerOfbondContainers[1]} modalChartData={arrayOfBondObjects[1]} />
    </div>
  );
}
