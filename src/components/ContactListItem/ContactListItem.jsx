import React from 'react';
import PropTypes from 'prop-types';
import { Button, SpanList, LiList } from './ContactListItem.styled';

const ContactListItem = ({ person, handleDelete }) => {
  const { id, name, number } = person;

  return (
    <LiList>
      <SpanList>{name}:</SpanList>
      <SpanList>{number}</SpanList>
      <Button type="button" onClick={() => handleDelete(id)}>
        Delete
      </Button>
    </LiList>
  );
};

ContactListItem.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ContactListItem;
