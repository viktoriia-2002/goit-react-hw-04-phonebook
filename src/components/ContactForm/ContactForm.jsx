import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { ToastContainer } from 'react-toastify';

import { Form, Label, Input, Button } from './ContactForm.styled';

const ContactForm = ({ contacts, handleNewContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const duplicateName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    // if (duplicateName) {
    //   alert(`${name} is already in contacts.`);
    //   return;
    // }
    if (duplicateName) {
      toast.error(`${name} is already in contacts.`);
      return;
    }

    const id = nanoid();

    const newContact = {
      name: name,
      id: id,
      number: number,
    };

    handleNewContact(newContact);

    setName('');
    setNumber('');
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleTelChange = event => {
    setNumber(event.target.value);
  };

  return (
    <Form autoComplete="off" onSubmit={handleSubmit}>
      <Label htmlFor="name">
        Name
        <Input
          type="text"
          id="name"
          className="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleNameChange}
        />
      </Label>
      <Label htmlFor="tel">
        Number
        <Input
          type="tel"
          id="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleTelChange}
        />
      </Label>
      <Button type="submit">Add contact</Button>
      <ToastContainer autoClose={1000} />

      <h3>Find contacts by name</h3>
    </Form>
  );
};

export default ContactForm;
