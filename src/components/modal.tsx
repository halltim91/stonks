import Modal from 'react-bootstrap/Modal';
import {ReactNode, useState } from 'react';

export default function BasicModal(props: {
  children: ReactNode;
  title: string;
}) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>{props.title}</Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
}