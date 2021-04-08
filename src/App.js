import React, { useState, useEffect, useContext, useReducer } from 'react';
import './App.css';

const ColorContext = React.createContext();

const initialCounterState = {
  counterValue: 0,
};

const counterReducer = (state, action) => {
  if (action.type === "increment") {
    return {
      ...state,
      counterValue: state.counterValue + 1,
    }
  } else if (action.type === "decrement") {
    return {
      ...state,
      counterValue: state.counterValue - 1,
    }
  }
};

function App() {
  const [color, updateColor] = useState("blue");
  const [stateValue, updateStateValue] = useState(1);
  const [counterState, dispatch] = useReducer(
    counterReducer,
    initialCounterState,
  )

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
      {/* {stateValue}

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
      </button> */}

    {counterState.counterValue}

    <button onClick={() => {
      dispatch({ type: "increment" });
    }}>
      +
    </button>
    <button onClick={() => {
      dispatch({ type: "decrement" });
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
