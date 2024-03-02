import styled from 'styled-components';

export const FormContainer = styled.div({
    width: '300px',
    padding: '10px',
    margin: '0 auto',
    color: 'black'
});

export const FormGroup = styled.div({
    marginBottom: '20px',
});

export const Label = styled.label({
    display: 'block',
    marginBottom: '5px',
    letterSpacing: '1.5px',
    textAlign: 'left'
});

export const Input = styled.input<{ invalid: boolean }>((props) => ({
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderColor: props.invalid ? 'red' : 'initial',
}));

export const ErrorMessage = styled.span({
    fontSize: '12px',
    color: 'red',
    marginTop: '5px',
});

export const Button = styled.button({
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    margin: '20px',
    cursor: 'pointer',
});