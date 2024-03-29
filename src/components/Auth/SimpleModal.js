import React from 'react';
import classes from './SimpleModal.module.css';

const SimpleModal = ({ message, onClose }) => {
  return (
    <div className={classes.backdrop} onClick={onClose}>
      <div className={classes.modal} onClick={e => e.stopPropagation()}>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SimpleModal;
