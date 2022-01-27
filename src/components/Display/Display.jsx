import React from 'react';

import './Display.sass';

const Display = ({ number, secondNumber, result, operator }) => {
  const replaceNumber = number.toString().replace(/^0+/, '');
  const replaceSecondNumber = secondNumber.toString().replace(/^0+/, '');

  return (
      <div className='display'>
        <div className='display__icon'>{secondNumber !== '' ? operator : ''}</div>
          <div className='display__value'>
            {
              replaceNumber ||
              replaceSecondNumber  ||
              result.toString().replace(/^0+/, '') ||
              '0'
            }
          </div>
          <div className='display__info'>
            <div className='display__title'>
              {
                `${replaceSecondNumber + 
                operator +
                replaceNumber}` ||
                'Enter some numbers'
              }
            </div>
        </div>
      </div>
  );
};

export default Display;