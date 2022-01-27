import React from 'react';

import './FunctionalButton.sass'

const FunctionalButton = ({ value, actionButton }) => {
  let colorButton = value === 'C' ? 'orange' : 'white';

  return (
      <div
          className='functionalButton'
          style={{backgroundColor: `${colorButton}`}}
          onClick={() => actionButton(value)}
      >
        <div className='functionalButton__button'>
          { value }
        </div>
      </div>
  );
};

export default FunctionalButton;