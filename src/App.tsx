import { useState } from "react";
import "./App.css";

function App() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeading(e.target.value);
  };
  const [heading, setHeading] = useState("Hello");
  return (
    <div>
      <input type="text" name={heading} id="mext" onChange={handleChange} />
      <h1>{heading}</h1>
    </div>
  );
}

export default App;
