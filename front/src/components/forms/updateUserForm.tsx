import React, { useContext, useEffect, useState } from 'react';
import { UsersContext } from '../../hooks/context';
import { FormContainer, FormGroup, Label, Input, ErrorMessage, Button } from './styled';
import { validateField } from './utils';

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
