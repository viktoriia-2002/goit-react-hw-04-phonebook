import React, { useState } from 'react';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import ContactForm from './ContactForm';
import { Container } from './App.styled';
import storage from '../storage';
import { useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = storage.load('contacts');

    if (storedContacts && Array.isArray(storedContacts)) {
      setContacts(storedContacts);
    }
  }, [setContacts]);

  const handleNewContact = newContact => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    storage.save('contacts', updatedContacts);
  };

  const handleFilter = event => {
    const filterValue = event.target.value;
    setFilter(filterValue);
  };

  const handleDelete = id => {
    console.log({ id });
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    storage.save('contacts', updatedContacts);
  };

  const filteredContacts = contacts.filter(contact =>
    contact?.name?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm handleNewContact={handleNewContact} contacts={contacts} />
      <h2>Contacts</h2>

      <Filter onChange={handleFilter} value={filter} />
      <ContactList contacts={filteredContacts} handleDelete={handleDelete} />
    </Container>
  );
};

export default App;
