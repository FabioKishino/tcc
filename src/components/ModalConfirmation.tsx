import '../styles/pages/ModalConfirmation.css';

import Modal from 'react-modal'
import { useState } from 'react';

Modal.setAppElement('#root')

const customStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    border: '1px solid #CCC',
    background: '#FFFFFF',
    overflow: 'auto',
    borderRadius: '10px',
  }
}

interface ModalProps {
  status: string;
  isOpen: boolean;
  setIsOpen: () => void;
}

export function ModalConfirmation ({status, isOpen, setIsOpen}: ModalProps) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={setIsOpen}
      style={customStyle}
    >
      <div className="modal-container">
        <p>{status}</p>
      </div>
    </Modal>
  )
}
