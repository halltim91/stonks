import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Plot from 'react-plotly.js';
import { Data, Layout } from 'plotly.js';
import { Bond, bondStatistics, bondStatisticsUtilities } from '../../bonds/bondsFunctionality';
import "./individualBonds.css";

export default function ProcessIndividualBonds(props: any) {
  const bondStatisticsUtilitiesObject = new bondStatisticsUtilities();
  const bondStatisticsObject = new bondStatistics();

  const arrayOfAllPrices = bondStatisticsUtilitiesObject.returnArrayOfAllPrices(props.modalChartData);

  const maxValue = bondStatisticsObject.findHighestNumber(arrayOfAllPrices);
  const minValue = bondStatisticsObject.findLowestNumber(arrayOfAllPrices);

  return (
    <DisplayIndividualBonds
      container={props.container}
      modalChartData={props.modalChartData}
      maxValue={maxValue}
      minValue={minValue}
    />
  );
}

function DisplayIndividualBonds(props: any) {
  const [showModal, setShowModal] = useState(false);

  const handleDetailsButtonClick = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  if ((props as object) === undefined) return <div></div>;
  //if (!props.hasOwnProperty("container")) return <div></div>;
  //if (!props.hasOwnProperty("modalChartData")) return <div></div>;

  return (
    <div>
      {props.container}
      <button onClick={handleDetailsButtonClick}>Details</button>
      <Modal size='lg' show={showModal} animation={true} onHide={handleHideModal}>
        <Modal.Body className='d-flex flex-direction-row justify-content-center modalBody'>
          {<CreateCandlestickChart modalChartData={props.modalChartData} maxValue={props.maxValue} minValue={props.minValue}/>}
        </Modal.Body>
      </Modal>
    </div>
  );
}

function CreateCandlestickChart(props: any) {
  const minPriceToShowOnAxis = props.minValue - 5;
  const maxPriceToShowOnAxis = props.maxValue + 5;

  const data: Data[] = [
    {
      x: props.modalChartData.dateTime,
      close: props.modalChartData.close,
      decreasing: { line: { color: '#7F7F7F' } },
      high: props.modalChartData.high,
      increasing: { line: { color: '#17BECF' } },
      line: { color: 'rgba(31,119,180,1)' },
      low: props.modalChartData.low,
      open: props.modalChartData.open,
      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y',
    },
  ];

  const layout: Partial<Layout> = {
    dragmode: false,
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
      range: [minPriceToShowOnAxis, maxPriceToShowOnAxis],
      title: 'Price',
      type: 'linear',
    },
  };

  return <Plot className='chartSize' data={data} layout={layout} />;
}
