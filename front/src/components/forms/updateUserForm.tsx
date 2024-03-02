import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UsersContext } from '../../hooks/context';

const FormContainer = styled.div({
  width: '300px',
  padding: '10px',
  margin: '0 auto',
  color: 'black'
});

const FormGroup = styled.div({
  marginBottom: '20px',
});

const Label = styled.label({
  display: 'block',
  marginBottom: '5px',
  letterSpacing: '1.5px',
  textAlign: 'left'
});

const Input = styled.input<{ invalid: boolean }>((props) => ({
  width: '100%',
  padding: '8px',
  fontSize: '16px',
  borderColor: props.invalid ? 'red' : 'initial',
}));

const ErrorMessage = styled.span({
  fontSize: '12px',
  color: 'red',
  marginTop: '5px',
});

const Button = styled.button({
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  margin: '20px',
  cursor: 'pointer',
});

interface Props {
  user: {
    id: string;
    name: string;
    age: number;
    email: string;
    avatar: string;
  };
  onClose: () => void;
}

const UpdateUserForm: React.FC<Props> = ({ user, onClose }) => {
  const { actions } = useContext(UsersContext);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: 0,
    email: '',
    avatar: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    age: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    const newErrors = {
      ...errors,
      [name]: validateField(name, value)
    };
    setErrors(newErrors);
  };

  const validateField = (name: string, value: any) => {
    switch (name) {
      case 'name':
        return value.length < 3 ? 'Name must be at least 3 characters' : '';
      case 'age':
        return isNaN(value) || value <= 0 ? 'Age must be a number greater than 0' : '';
      case 'email':
        return /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email format';
      case 'avatar':
        return isValidImageUrl(value) ? '' : 'Invalid avatar URL';
      default:
        return '';
    }
  };

  const isValidImageUrl = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      name: validateField('name', formData.name),
      age: validateField('age', formData.age),
      email: validateField('email', formData.email),
      avatar: validateField('avatar', formData.avatar),
    };

    if (Object.values(newErrors).every(error => !error)) {
      actions?.UPDATE_USER(user.id, formData);
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} invalid={!!errors.name} />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="age">Age:</Label>
          <Input type="number" id="age" name="age" value={formData.age} onChange={handleChange} invalid={!!errors.age} />
          {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} invalid={!!errors.email} />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="avatar">Avatar:</Label>
          <Input type="text" id="avatar" name="avatar" value={formData.avatar} onChange={handleChange} invalid={!!errors.avatar} />
          {errors.avatar && <ErrorMessage>{errors.avatar}</ErrorMessage>}
        </FormGroup>
        <Button type="submit">Atualizar</Button>
      </form>
    </FormContainer>
  );
};

export default UpdateUserForm;