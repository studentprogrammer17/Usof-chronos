import React from 'react';
import Modal from 'react-modal';

import CalendarForm from './CalendarForm';
import '../../css/Event.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

const CalendarModal = ({ isOpen, closeModal, event }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Celendar Modal"
    >
      <p onClick={closeModal} className="close">
        X
      </p>
      <CalendarForm
        key="main"
        event={event}
        closeModal={closeModal}
      />
    </Modal>
  );
};

export default CalendarModal;