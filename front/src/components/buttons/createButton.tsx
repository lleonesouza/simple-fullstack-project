import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const CreateButton = styled.button({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    position: 'fixed',
    width: '60px',
    height: '60px',
    right: '7vw',
    bottom: '7vh',
    backgroundColor: 'transparent',
    borderRadius: '100px',
    border: '6px green solid',
    color: 'green',
    fontSize: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',

    '&:hover': {
        color: 'darkgreen',
        border: '2px darkgreen solid',
    },

    '&:focus': {
        outline: 'none',
    }
});

interface Props {
    onClick?: () => void
}

const CreateIconButton = ({ onClick }: Props) => {
    return (
        <CreateButton onClick={onClick}>
            <FaPlus />
        </CreateButton>
    );
};

export default CreateIconButton;