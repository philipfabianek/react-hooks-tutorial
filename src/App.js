import React, { useState, useEffect, useContext } from 'react';
import './App.css';

const ColorContext = React.createContext();

function App() {
  const [color, updateColor] = useState("blue");
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

      <ColorContext.Provider value={color}>
        <NestedComponent />
      </ColorContext.Provider>

      <button onClick={() => {
        if (color === "blue") {
          updateColor("red");
        } else {
          updateColor("blue");
        }
      }}>
        Switch color
      </button>
    </div>
  );
}

function NestedComponent() {
  const color = useContext(ColorContext);
  
  return (
    <h3 style={{ color }}>
      NestedComponent
    </h3>
  )
}

export default App;
