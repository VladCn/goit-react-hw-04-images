import React, {useEffect, useCallback} from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Parent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.8);
`;

const Children = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 300px;
  max-width: 600px;
  width: 100%;
  background-color: aqua;
`;
const modalRoot = document.querySelector('#modal-root');

export function Modal ({onClose, children}){

  const handleKeyDown = useCallback(e => {
    if (e.code === 'Escape') {
      onClose();
    }
  }, [onClose])

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
  },[handleKeyDown])

    return createPortal(
      <Parent onClick={handleBackdropClick}>
        <Children>{children}</Children>
      </Parent>,
      modalRoot
    );
}
