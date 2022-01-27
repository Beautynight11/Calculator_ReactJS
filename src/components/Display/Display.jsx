import React from 'react';

import './Display.sass';

const Display = ({ number }) => {
  return (
      <div className='display'>
        <div className='display__value'>{number}</div>
        <div className='display__info'>
          <div className='display__title'>
            Enter some numbers
          </div>
        </div>
      </div>
  );
};

export default Display;