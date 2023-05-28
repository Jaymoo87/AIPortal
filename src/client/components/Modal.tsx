import React, { useRef, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

type ModalProps = {
  setModalOpen: any;
  selectedImage: any;
  setSelectedImage: any;
  generateVariations: () => void;
};

const Modal = ({ generateVariations, setModalOpen, setSelectedImage, selectedImage }: ModalProps) => {
  const ref = useRef<any>(null);
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const [error, setError] = useState(null);

  const imgSize = 256 | 1024 | 512;

  const checkSize = () => {
    if (ref === null) return;
    if (ref?.current?.width == imgSize && ref?.current?.height == imgSize) {
      generateVariations();
    }
  };

  return (
    <div className="modal">
      <div onClick={closeModal}>
        <FaRegTrashAlt />
      </div>
      <div className="img-container">
        {selectedImage && <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="uploaded image" />}
      </div>

      {error && (
        <>
          <p>{error || '* Image must be 256x256'} </p>
          <button onClick={closeModal}>Close and try again</button>
        </>
      )}
      {!error && <button onClick={checkSize}>Generate</button>}
    </div>
  );
};

export default Modal;
