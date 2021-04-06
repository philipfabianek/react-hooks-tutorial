import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stateValue, updateStateValue] = useState(1);

  const [objectState, updateObjectState] = useState({
    property1: "property 1",
    property2: "property 2",
  });

  useEffect(() => {
    console.log("useEffect");
    console.log("State value has changed to", stateValue);

    return () => {
      console.log("clean-up function");
    };
  }, [stateValue]);

  return (
    <div className="App">
      {stateValue}

      <button onClick={() => {
        const newStateValue = stateValue + 1;
        updateStateValue(newStateValue);
      }}>
        +
      </button>
      <button onClick={() => {
        updateStateValue((previousStateValue) => {
          return previousStateValue - 1;
        });
      }}>
        -
      </button>

      <p>{objectState.property1}</p>
      <p>{objectState.property2}</p>

      <button onClick={() => {
        updateObjectState((previousObjectState) => {
          return {
            ...previousObjectState,
            property1: "Updated property 1",
          };
        });
      }}>
        Update property 1
      </button>
    </div>
  );
}

export default App;
