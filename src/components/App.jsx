// import React from 'react';
// import ContactList from 'components/ContactList';
// import Filter from 'components/Filter';
// import ContactForm from './ContactForm';
// import { Container } from './App.styled';
// import storage from '../storage';

// class App extends React.Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const storedContacts = storage.load('contacts');

//     if (storedContacts && Array.isArray(storedContacts)) {
//       this.setState({ contacts: storedContacts });
//     }
//   }

//   componentDidUpdate(prevState) {
//     const prevContacts = prevState.contacts;
//     const currentContacts = this.state.contacts;

//     if (prevContacts !== currentContacts) {
//       storage.save('contacts', currentContacts);
//     }
//   }

//   handleNewContact = newContact => {
//     console.log({ newContact });
//     const { contacts } = this.state;
//     const updatedContacts = [...contacts, newContact];
//     this.setState({ contacts: updatedContacts });
//     storage.save('contacts', updatedContacts);
//   };

//   handleFilter = event => {
//     this.setState({ filter: event.target.value });
//   };

//   handleDelete = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const filteredContacts = contacts?.filter(contact =>
//       contact?.name?.toLowerCase().includes(filter.toLowerCase())
//     );

//     return (
//       <Container>
//         <h1>Phonebook</h1>
//         <ContactForm
//           handleNewContact={this.handleNewContact}
//           contacts={contacts}
//         />
//         <h2>Contacts</h2>

//         <Filter onChange={this.handleFilter} value={filter} />
//         <ContactList
//           contacts={filteredContacts}
//           handleDelete={this.handleDelete}
//         />
//       </Container>
//     );
//   }
// }

// export default App;

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

  // useEffect(() => {
  //   const prevContacts = JSON.parse(localStorage.getItem('contacts'));
  //   console.log({ prevContacts });

  //   if (prevContacts !== contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   }
  // }, [contacts]);

  //   componentDidUpdate(prevState) {
  //     const prevContacts = prevState.contacts;
  //     const currentContacts = this.state.contacts;

  //     if (prevContacts !== currentContacts) {
  //       storage.save('contacts', currentContacts);
  //     }
  //   }

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
