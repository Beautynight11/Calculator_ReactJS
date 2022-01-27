import React from 'react';

import './FunctionalButton.sass'

const FunctionalButton = ({ value, actionButton }) => {
  const className = value === '0' ? 'functionalButton functionalButton--zero' : 'functionalButton';
  const colorButton =
    value === 'C' ? '#7799f1' : '#575656' &&
    value === '=' ? '#ff6565' : '#575656'

  return (
      <div
          className={className}
          style={{ background:`${colorButton}` }}
          onClick={() => actionButton(value)}
      >
        <div className='functionalButton__button'>
          {value}
        </div>
      </div>
  );
};

export default FunctionalButton;