import '../styles/components/popUpAlert.css';

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
    width: 'auto',
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

export function PopUpAlert ({status, isOpen, setIsOpen}: ModalProps) {

  const [modalIsOpen, setModalIsOpen] = useState(isOpen);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={customStyle}
    >
      <div className="modal-content">
        <p>{status}</p>
        <button onClick={() => 
          {
            setIsOpen();
            window.location.reload();
          }
        }>Ok</button>
      </div>
    </Modal>
  )
}
