import { useEffect } from "react";

function Example() {
  useEffect(() => {
    console.log("First time");

    return () => {
      console.log("Component is removed from the screen");
    };
  }, []);

  return (
    <div>
      <h1>Example Component</h1>
    </div>
  );
}

export default Example;
