import React from 'react';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import ContactForm from './ContactForm';
import { Container } from './App.styled';
import storage from '../storage';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = storage.load("contacts");
  
    if (storedContacts && Array.isArray(storedContacts)) {
      this.setState({ contacts: storedContacts });
    }
  }

componentDidUpdate(prevState) {
  const prevContacts = prevState.contacts;
  const currentContacts = this.state.contacts;

  if (prevContacts !== currentContacts) {
    storage.save("contacts", currentContacts);
  }
}


handleNewContact = newContact => {
  const { contacts } = this.state;
  const updatedContacts = [...contacts, newContact];
  this.setState({ contacts: updatedContacts });
  storage.save("contacts", updatedContacts);
};


  handleFilter = event => {
    this.setState({ filter: event.target.value });
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm
          handleNewContact={this.handleNewContact}
          contacts={contacts}
        />
        <h2>Contacts</h2>

        <Filter onChange={this.handleFilter} value={filter} />
        <ContactList
          contacts={filteredContacts}
          handleDelete={this.handleDelete}
        />
      </Container>
    );
  }
}

export default App;
