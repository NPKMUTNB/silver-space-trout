import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, reset } from '../store/counterSlice';
import './Counter.css';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(2);

  return (
    <div className="counter">
      <h2>Counter Example</h2>
      <div className="counter-display">
        <span className="counter-value">{count}</span>
      </div>
      
      <div className="counter-buttons">
        <button 
          className="counter-btn"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        
        <button 
          className="counter-btn"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        
        <button 
          className="counter-btn reset"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>

      <div className="increment-section">
        <input
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value) || 0)}
          className="increment-input"
        />
        <button
          className="counter-btn"
          onClick={() => dispatch(incrementByAmount(incrementAmount))}
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}

export default Counter;
