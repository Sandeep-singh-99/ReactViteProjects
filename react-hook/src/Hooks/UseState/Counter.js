import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button className='bg-gray-200 px-2 py-1 rounded-md' onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}
