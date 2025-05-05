import React from 'react';
import Modal from '../Modal/Modal';
import Bookshelf from '../Bookshelf/Bookshelf';
import './VolumesModal.css';

function VolumesModal({ isOpen, onClose, volumes, title }) {
  if (!volumes || volumes.length === 0) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="volumes-modal">
        <h2>{title || 'Volumes'}</h2>
        <Bookshelf books={volumes} multiVol = {true}/>
      </div>
    </Modal>
  );
}

export default VolumesModal;