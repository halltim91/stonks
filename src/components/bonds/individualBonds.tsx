import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Plot from 'react-plotly.js';
import { Data, Layout } from 'plotly.js';
import {
  Bond,
  BondsDataValidator,
  bondStatistics,
  bondStatisticsUtilities,
} from '../../bonds/bondsFunctionality';
import './individualBonds.css';
import '../../css/table.css';

export default function ProcessIndividualBonds(props: any) {
  const bondStatisticsUtilitiesObject = new bondStatisticsUtilities();
  const bondStatisticsObject = new bondStatistics();

  let bondsDataValidatorObject = new BondsDataValidator();

  if (!props.hasOwnProperty('bondData')) return <div></div>;
  if ((props.bondData as Bond) === undefined) return <div></div>;

  let bondValid = bondsDataValidatorObject.validateBondObject(props.bondData);
  if (bondValid === false) return <div></div>;

  const arrayOfAllPrices = bondStatisticsUtilitiesObject.returnArrayOfAllPrices(
    props.bondData
  );

  const maxValue = bondStatisticsObject.findHighestNumber(arrayOfAllPrices);
  const minValue = bondStatisticsObject.findLowestNumber(arrayOfAllPrices);

  return (
    <DisplayIndividualBonds
      bondData={props.bondData}
      maxValueYAxis={maxValue}
      minValueYAxis={minValue}
    />
  );
}

function DisplayIndividualBonds(props: any) {
  const [showModal, setShowModal] = useState(false);

  const handleDetailsButtonClick = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  if ((props as object) === undefined) return <div></div>;
  if (!props.hasOwnProperty('bondData')) return <div></div>;
  if (!props.hasOwnProperty('maxValueYAxis')) return <div></div>;
  if ((props.maxValueYAxis as number) === undefined) return <div></div>;
  if (!props.hasOwnProperty('minValueYAxis')) return <div></div>;
  if ((props.minValueYAxis as number) === undefined) return <div></div>;

  if ((props.bondData as Bond) === undefined) return <div></div>;
  if (props.bondData.close.length === 0) return <div></div>;
  if (props.bondData.open.length === 0) return <div></div>;
  if (props.bondData.high.length === 0) return <div></div>;
  if (props.bondData.low.length === 0) return <div></div>;
  if (props.bondData.dateTime.length === 0) return <div></div>;

  const data: Data[] = [
    {
      x: props.bondData.dateTime,
      close: props.bondData.close,
      decreasing: { line: { color: '#034694' } },
      high: props.bondData.high,
      increasing: { line: { color: '#034694' } },
      line: { color: 'rgba(3, 46, 94, 1)' },
      low: props.bondData.low,
      open: props.bondData.open,
      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y',
    },
  ];

  const layout: Partial<Layout> = {
    dragmode: 'zoom',
    margin: {
      r: 10,
      t: 25,
      b: 40,
      l: 60,
    },
    showlegend: false,
    xaxis: {
      autorange: true,
      domain: [0, 1],
      title: 'Date',
      type: 'date',
    },
    yaxis: {
      autorange: false,
      domain: [0, 1],
      range: [props.minValueYAxis, props.maxValueYAxis],
      title: 'Price',
      type: 'linear',
    },
  };

  const style = {
    width: 400,
  };

  return (
    <tr className='tableRow'>
      <td className='tableName' id='tdBnd'>
        <button
          aria-label={props.bondData.name}
          onClick={handleDetailsButtonClick}
        >
          {props.bondData.name}
        </button>
      </td>
      <td id='tdBnd' className='firstTablePrice tablePrice'>
        ${props.bondData.close[props.bondData.close.length - 1]}
      </td>
      <td id='tdBnd' className='tablePrice'>
        ${props.bondData.open[props.bondData.open.length - 1]}
      </td>
      <td id='tdBnd' className='tablePrice'>
        ${props.bondData.high[props.bondData.high.length - 1]}
      </td>
      <td id='tdBnd' className='tablePrice'>
        ${props.bondData.low[props.bondData.low.length - 1]}
      </td>
      <Modal
        show={showModal}
        animation={true}
        onHide={handleHideModal}
        onExit={handleHideModal}
      >
        <div className='modalDiv'>
          <Modal.Body>
            <div className='modalHeading'>
              <h2>{props.bondData.name}</h2>
              <button onClick={handleHideModal}>close</button>
            </div>
            <Plot style={style} data={data} layout={layout} />
          </Modal.Body>
        </div>
      </Modal>
    </tr>
  );
}

// https://react-bootstrap.netlify.app/docs/components/modal/
// https://getbootstrap.com/docs/4.0/utilities/flex/
