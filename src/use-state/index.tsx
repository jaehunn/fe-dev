import { useState } from "react";

function Component() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // useState() 는 종료되었지만,
    // setCount 는 useState 내부 환경(count) 을 기억하고 있다 (클로저)
    // setCount 가 선언된 환경을 기억한다.
    setCount((prev) => prev + 1);
  }

  return (
    <div>
      Component
      <button type="button" onClick={handleClick}>
        Count UP
      </button>
      <p>Count: {count}</p>
    </div>
  );
}

export default Component;
