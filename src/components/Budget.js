import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
  const { budget, dispatch, currency, expenses } = useContext(AppContext);
  const inputRef = useRef(null);

  const handleScroll = (event) => {
    const deltaY = event.deltaY;
    if (deltaY < 0 && budget < 20000) {
      dispatch({ type: 'SET_BUDGET', payload: budget + 10 });
    } else if (deltaY > 0 && budget > getTotalExpenses()) {
      dispatch({ type: 'SET_BUDGET', payload: budget - 10 });
    }
  };

  const handleOnChange = (e) => {
    const newBudget = parseInt(e.target.value);
    if (!isNaN(newBudget) && newBudget >= getTotalExpenses() && newBudget <= 20000) {
      dispatch({ type: 'SET_BUDGET', payload: newBudget });
    } else if (newBudget < getTotalExpenses()) {
      alert('Budget cannot be lower than total expenses');
    } else {
      alert('Budget value should be a number and should not exceed 20,000');
    }
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, item) => {
      return (total += item.cost);
    }, 0);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = budget;
    }
  }, [budget]);

  return (
    <div className='alert alert-secondary' onWheel={handleScroll}>
      <span>Budget: {currency}</span>
      <input
        type='number'
        id='budget'
        value={budget}
        ref={inputRef}
        onChange={handleOnChange}
        min={getTotalExpenses()}
        max={20000}
     
      />
    </div>
  );
};

export default Budget;
