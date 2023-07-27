import React from 'react';

function Filter({ onChange, value }) {
  return <input type="text" onChange={onChange} value={value} />;
}

export default Filter;
