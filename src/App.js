import React, { useCallback, useEffect, useState } from "react";
import Display from "./components/Display/Display";
import FunctionalButton from "./components/FunctionalButton/FunctionalButton";

import './App.sass';

const ALLOWED_SIZE = Math.pow(10, 10);
const OPERATORS = ['+', '-', '/', '*'];

const App = () => {
  const [number, setNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [result, setResult] = useState('');

  const actionButton = useCallback((value) => {
    if (number &&
      secondNumber &&
      value !== '+/-' &&
      value !== '.' &&
      (value === '+' ||
      value === '-' ||
      value === '*' ||
      value === '/')
    ) {
      if (OPERATORS.includes(operator)) {
          setSecondNumber(
            // eslint-disable-next-line no-eval
            (Math.round(eval(`
             ${parseFloat(secondNumber)}
             ${operator} 
             ${parseFloat(number)}
           `) * ALLOWED_SIZE) / ALLOWED_SIZE).toString()
          );
      }
      setNumber('');
    }
    switch (value) {
      case ('0'):
      case ('1'):
      case ('2'):
      case ('3'):
      case ('4'):
      case ('5'):
      case ('6'):
      case ('7'):
      case ('8'):
      case ('9'):
        setResult('');
        if (number.length <= 16) {
          if ((!number.includes('.') || value !== '.')) {
            setNumber(number + value);
          }
        } else {
          setNumber(number)
        }
        break;
      case ('C'):
        setNumber('');
        setSecondNumber('');
        setOperator('');
        setResult('');
        break;
      case ('+/-'):
        if (number !== '') {
          setNumber(-number)
        }
        break;
      case ('←'):
        number !== '' ?
          setNumber(number.toString().slice(0, number.length - 1)) :
          setSecondNumber(secondNumber.toString().slice(0, number.length - 1));
        if (number === '') {
          setOperator('')
        }
        break;
      case('.'):
        if (!number.includes('.')) {
          setNumber(number + value);
        }
        break;
      case('/'):
      case('*'):
      case('+'):
      case('-'):
        setOperator(value);
        if (number !== '' && secondNumber === '') {
          setSecondNumber(number);
          setNumber('');
        }
        break;
      case('='):
        if (OPERATORS.includes(operator) && secondNumber) {
          setResult(
            // eslint-disable-next-line no-eval
            (Math.round(eval(`
              ${(parseFloat(secondNumber))} 
              ${operator} 
              ${(parseFloat(number))}
            `) * ALLOWED_SIZE) / ALLOWED_SIZE).toString()
          );
        }
        setNumber('');
        setOperator('');
        setSecondNumber('');
        break;
      default:
        setNumber(number);
        setSecondNumber(secondNumber);
    }
  }, [number, operator, secondNumber]);

  useEffect(() => {
    const handlePress = (event) => {
      if (((!isNaN(parseFloat(event.key)) && isFinite(event.key)) && number.length <= 16) ||
        (event.key === '.' && !number.includes('.')))
      {
        setResult('');
        setNumber(number + event.key)
      }
      if (event.key === '/' ||
        event.key === '*' ||
        event.key === '-' ||
        event.key === '+' ||
        event.key === '.'
      ) {
        actionButton(event.key)
      }
      if (event.key === '=' ||
        event.key === 'Enter') {
        actionButton('=')
      }
      if (event.key === 'Backspace') {
        actionButton('←')
      }
      if (event.key === 'Delete') {
        actionButton('C')
      }
    }

    window.addEventListener("keydown", handlePress);

    return () => {
      window.removeEventListener("keydown", handlePress);
    }
  }, [actionButton, number]);


  const FunBtn = ({ value }) => (
    <FunctionalButton value={value} actionButton={actionButton} />
  );
  console.log(number, secondNumber)

  return (
    <div className="App">
      <div className='calculator'>
        <div className='container'>
          <Display
            number={number}
            secondNumber={secondNumber}
            result={result}
            operator={operator}
          />
          <div className='calculator__buttons'>
            <div className='calculator__row'>
              <FunBtn value='C' />
              <FunBtn value='+/-' />
              <FunBtn value='←' />
              <FunBtn value='/' />
            </div>
            <div className='calculator__row'>
              <FunBtn value='7' />
              <FunBtn value='8' />
              <FunBtn value='9' />
              <FunBtn value='*' />
            </div>
            <div className='calculator__row'>
              <FunBtn value='4' />
              <FunBtn value='5' />
              <FunBtn value='6' />
              <FunBtn value='-' />
            </div>
            <div className='calculator__row'>
              <FunBtn value='1' />
              <FunBtn value='2' />
              <FunBtn value='3' />
              <FunBtn value='+' />
            </div>
            <div className='calculator__row'>
              <FunBtn value='0' />
              <FunBtn value='.' />
              <FunBtn value='=' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
