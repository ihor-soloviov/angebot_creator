import React, { useState } from "react";
import "./PlusMinusHandler.scss";

export const PlusMinusHandler: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(prev => prev - 1)}>-</button>
      <input value={count} onChange={(e) => setCount(+e.target.value)} type="number" />
      <button onClick={() => setCount(prev => prev + 1)}>+</button>
    </div>
  );
}
