import React, { useEffect, useState } from 'react';
import './css/ModalWrapper.css';

export default function ModalWrapper(props) {
    const [modal, setModal] = useState(undefined);
      // Add listeners immediately after the component is mounted.
    useEffect(() => {
      window.addEventListener('keyup', handleKeyUp, false);
      document.addEventListener('click', handleOutsideClick, false);
    }, []) 
      
    // Remove listeners immediately before a component is unmounted and destroyed.
    useEffect(() => {
      return () => {
        window.removeEventListener('keyup', handleKeyUp, false);
        document.removeEventListener('click', handleOutsideClick, false);
      }
    }, []) 
        
      
      // Handle the key press event.
    function handleKeyUp(e) {
        const { onCloseRequest } = props;
        const keys = {
          27: () => {
            e.preventDefault();
            onCloseRequest();
            window.removeEventListener('keyup', handleKeyUp, false);
          },
        };
    
        if (keys[e.keyCode]) { keys[e.keyCode](); }
    }
      
      // Handle the mouse click on browser window.
    function handleOutsideClick(e) {
        const { onCloseRequest } = props;
    
        if (modal !== undefined) {
          if (modal.contains(e.target)) {
            onCloseRequest();
            document.removeEventListener('click', handleOutsideClick, false);
          }
        }
    }
      
// Render the component passing onCloseRequest and children as props.

  const { onCloseRequest, children } = props;
  return (
    <div className="custom-modal">
      <section className="custom-modal-main" div ref={node => (setModal(node))}>
        {children}
      </section>
      <button className="close-button" onClick={onCloseRequest}>X</button>
    </div>
  ); 
}

