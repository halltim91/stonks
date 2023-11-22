import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

export default function DisplayIndividualBonds(props: any) {
  const [showModal, setShowModal] = useState(false);

  const handleDetailsButtonClick = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  if ((props as object) === undefined) return <div></div>;

  return (
    <div>
      {props.container}
      <button onClick={handleDetailsButtonClick}>Details</button>
      <Modal show={showModal} animation={true} onHide={handleHideModal}>
        <Modal.Header>Alex</Modal.Header>
      </Modal>
    </div>
  );
}
