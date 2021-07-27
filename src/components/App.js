import React, { Component } from 'react';

import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';
import Filter from '../components/Filter';
import ContactList from '../components/ContactList';

import shortid from 'shortid';

import './App.module.scss';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    if (contacts.find(contact => contact.number === number)) {
      alert(`Number ${number} is already in contacts`);
      return;
    }

    if ((!name || name.trim() === '') && (!number || number.trim() === '')) {
      alert('Fill in the fields "Name" and "Number"');
      return;
    }

    if (!name || name.trim() === '') {
      alert('Field "Name" is empty');
      return;
    }

    if (!number || number.trim() === '') {
      alert('Field "Number" is empty');
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  getVisibleContactsSortByName = () => {
    const visibleContacts = this.getVisibleContacts();

    const visibleContactsSortByName = visibleContacts.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return visibleContactsSortByName;
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;

    const filteredContacts = this.getVisibleContactsSortByName();

    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </Layout>
    );
  }
}

export default App;
