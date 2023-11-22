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

const bondEntry1 = ['a', 'a', 'a', 'a', 'a', 'a', 'a'];
const bondEntry2 = ['a', 'b', 'a', 'a', 'a', 'a', 'a'];
const bondEntry3 = ['a', 'b', 'a', 'a', 'a', 'a', 'a'];
const bondEntry4 = ['a', 'b', 'a', 'a', 'a', 'a', 'a'];
const bondEntry5 = ['a', 'b', 'a', 'a', 'a', 'a', 'a'];

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

  let bondObjectClass = new BondObject();
  let bondObject: Bond;

  for (const bondEntry of bondEntries) {
    bondObject = bondObjectClass.createFromBondEntry(bondEntry);
    container = bondsContainer.create(bondObject);
    containerOfbondContainers.push(container);
  }

  return (
    <div>
      <BondsPageHeader />
      <DisplayIndividualBonds container={bondEntry1} />
      <DisplayIndividualBonds container={bondEntry2} />
      <DisplayIndividualBonds container={bondEntry3} />
      <DisplayIndividualBonds container={bondEntry4} />
      <DisplayIndividualBonds container={bondEntry5} />
    </div>
  );
}
