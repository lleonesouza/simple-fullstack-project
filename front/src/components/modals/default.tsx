import React from 'react';
import styled from 'styled-components';

export const ModalBackground = styled.div({
    zIndex: '0',
    position: 'fixed',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    width: '99vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
});

export const ModalContent = styled.div({
    zIndex: '1',
    marginBottom: '5vh',
    width: '40vw',
    minWidth: '350px',
    height: 'auto',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
});

const ModalTitle = styled.h2({
    color: 'black'
})

const Div = styled.div({
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

interface ModalProps {
    title: string;
    isOpen?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

const Modal = ({ title, isOpen, onClose, children}: ModalProps) => {
    if (!isOpen) return null;
    return (
        <Div>
            <ModalContent>
                <ModalTitle>{title}</ModalTitle>
                {children}
            </ModalContent>
            <ModalBackground onClick={onClose} />
        </Div>
    );
};

export default Modal;
