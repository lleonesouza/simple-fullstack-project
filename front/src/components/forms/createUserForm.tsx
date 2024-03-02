import React, { useContext, useState } from 'react';
import { UsersContext } from '../../hooks/context';
import { FormContainer, FormGroup, Label, Input, ErrorMessage, Button } from './styled';
import { validateField } from './utils';

interface Props {
  onClose: () => void
}

const AddUserForm = ({ onClose }: Props) => {
  const { actions } = useContext(UsersContext);

  const [formData, setFormData] = useState({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'age' ? parseInt(value) : value;

    setFormData({
      ...formData,
      [name]: newValue
    });

    const newErrors = {
      ...errors,
      [name]: validateField(name, newValue)
    };
    setErrors(newErrors);
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
      onClose();
      actions?.ADD_USER(formData);
      setFormData({
        name: '',
        age: 0,
        email: '',
        avatar: ''
      });
      setErrors({
        name: '',
        age: '',
        email: '',
        avatar: ''
      });
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
        <Button type="submit">Criar</Button>
      </form>
    </FormContainer>
  );
};

export default AddUserForm;
