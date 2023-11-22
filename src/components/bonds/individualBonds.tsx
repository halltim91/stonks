import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Plot from "react-plotly.js"
import { Data, Layout } from 'plotly.js'

export default function DisplayIndividualBonds(props: any) {
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
      <Modal show={showModal} animation={true} onHide={handleHideModal}>
        <Modal.Body>{<CreateCandlestickChart modalChartData={props.modalChartData}/>}</Modal.Body>
      </Modal>
    </div>
  );
}

function CreateCandlestickChart(props: any) {
  const data: Data[] = [{
    x: props.modalChartData.dateTime,  
    close: props.modalChartData.close, 
    decreasing: {line: {color: '#7F7F7F'}}, 
    high: props.modalChartData.high, 
    increasing: {line: {color: '#17BECF'}},
    line: {color: 'rgba(31,119,180,1)'}, 
    low: props.modalChartData.low, 
    open: props.modalChartData.open, 
    type: 'candlestick', 
    xaxis: 'x',
    yaxis: 'y'
}]

const layout: Partial<Layout> = {
  dragmode: false, 
  margin: {
    r: 10, 
    t: 25, 
    b: 40, 
    l: 60
  }, 
  showlegend: false, 
  xaxis: {
    autorange: false, 
    domain: [0, 1], 
    range: ["2023-11-20 12:00", "2023-12-03 12:00"], 
    title: 'Date', 
    type: 'date'
  }, 
  yaxis: {
    autorange: false, 
    domain: [0, 1], 
    range: [40, 70], 
    title: 'Price',
    type: 'linear'
  }
}

  return (
    <Plot data={data} layout={layout}/>
  )
}
