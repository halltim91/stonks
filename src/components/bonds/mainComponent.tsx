import { Bond, BondObject } from '../../bonds/bondsFunctionality';
import ProcessIndividualBonds from './individualBonds';
import Frame from '../frame';
import '../../css/table.css';
import './mainComponent.css';
import { bondEntries } from './bondData';

export default function BondsComponent(props: {className?: string}) {
  let arrayOfBondObjects: Bond[] = [];

  let bondObjectClass = new BondObject();
  let bondObject: Bond;

  for (const bondEntry of bondEntries) {
    bondObject = bondObjectClass.createFromBondEntry(bondEntry);
    arrayOfBondObjects.push(bondObject);
  }

  if (arrayOfBondObjects === undefined) return <div>There are no bonds</div>;

  return (
    <Frame title='Bonds' className={props.className}>
      <table id='bondTable' className='bondTable'>
        <thead>
          <tr className='d-flex flex-row justify-content-evenly'>
            <th id='thBnd'>Name</th>
            <th id='thBnd'>Close</th>
            <th id='thBnd'>Open</th>
            <th id='thBnd'>High</th>
            <th id='thBnd'>Low</th>
          </tr>
        </thead>
        <tbody id='bondTbody' className='bondTbody'>
          <ProcessIndividualBonds bondData={arrayOfBondObjects[0]} />
          <ProcessIndividualBonds bondData={arrayOfBondObjects[1]} />
          <ProcessIndividualBonds bondData={arrayOfBondObjects[2]} />
          <ProcessIndividualBonds bondData={arrayOfBondObjects[3]} />
        </tbody>
      </table>
    </Frame>
  );
}

// https://www.geeksforgeeks.org/html-tables/
