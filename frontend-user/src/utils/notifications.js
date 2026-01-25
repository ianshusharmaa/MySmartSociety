import React from 'react';
import { createRoot } from 'react-dom/client';
import Toast from '../components/Toast';

let toastContainer = null;
let toastRoot = null;

const getToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '10000';
    document.body.appendChild(toastContainer);
    toastRoot = createRoot(toastContainer);
  }
  return { container: toastContainer, root: toastRoot };
};

export const showToast = (message, type = 'info', duration = 3000) => {
  const { root } = getToastContainer();
  
  const handleClose = () => {
    root.render(null);
  };

  root.render(
    <Toast 
      message={message} 
      type={type} 
      duration={duration}
      onClose={handleClose}
    />
  );
};
