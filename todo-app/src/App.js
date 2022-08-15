import React, { useState } from "react";

// function App() {
//   return (
//     <div>
//       <h1>Hello World!</h1>
//     </div>
//   );
// }

const App = () => {
  const [name, setName] = useState("Dominic");
  return (
    <div>
      <form>
        <label>Enter your name:</label>
        <input
          value={name}
          onChange={(event) => {
            console.log(event.target.value);
            setName(event.target.value);
          }}
        />
      </form>
      <h1>Hello {name}!</h1>
    </div>
  );
};

export default App;
