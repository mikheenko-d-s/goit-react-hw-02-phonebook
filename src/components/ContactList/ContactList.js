// import React from 'react';
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

const Button = ({ onDeleteContact }) => (
  <button onClick={onDeleteContact} className={styles.Button}>
    Delete
  </button>
);

const ContactItem = ({ name, number, onDeleteContact }) => (
  <li className={styles.ContactItem}>
    <p className={styles.Contact}>
      <span className={styles.ContactName}>{name}:</span> {number}
    </p>
    <Button onDeleteContact={onDeleteContact} />
  </li>
);

const ContactList = ({ contacts, onDeleteContact }) => {
  if (contacts.length === 0) return null;
  return (
    <ul className={styles.ContactList}>
      {contacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          name={name}
          number={number}
          onDeleteContact={() => onDeleteContact(id)}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
