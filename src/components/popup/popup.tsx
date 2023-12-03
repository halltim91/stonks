import React from 'react';
import { ReactNode } from 'react';
import '../popup/popup.css';

function GeneratePopup(props: {
  children: ReactNode;
  trigger: boolean;
  closeModal: (value: boolean) => void;
}) {
  return props.trigger ? (
    <div className='popup-inner'>
      <button
        aria-label='close'
        className='close-btn'
        onClick={() => props.closeModal(false)}
      >
        close
      </button>
      {props.children}
    </div>
  ) : null;
}

export default GeneratePopup;
