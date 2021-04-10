import React, { useState, useEffect, useContext, useReducer, useRef } from 'react';
import './App.css';

const ColorContext = React.createContext();

const initialColorState = {
  color: "blue",
};

const colorReducer = (state, action) => {
  if (action.type === "set") {
    return {
      ...state,
      color: action.color,
    };
  }
};

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
  );
  const [colorState, colorDispatch] = useReducer(
    colorReducer,
    initialColorState,
  );

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

  const inputElementReference = useRef(null);

  useEffect(() => {
    inputElementReference.current.focus();
  }, []);

  return (
    <ColorContext.Provider value={{
      colorState: colorState,
      colorDispatch: colorDispatch,
    }}>
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

      <NestedComponent />

      <button onClick={() => {
        if (colorState.color === "blue") {
          colorDispatch({ type: "set", color: "red" });
        } else {
          colorDispatch({ type: "set", color: "blue" });
        }
      }}>
        Switch color
      </button>

      <div>
        <input
          ref={inputElementReference}
          placeholder="This should be focused"
        />
      </div>
    </div>
    </ColorContext.Provider>
  );
}

function NestedComponent() {
  const { colorState } = useContext(ColorContext);
  
  return (
    <h3 style={{ color: colorState.color }}>
      NestedComponent
    </h3>
  )
}

export default App;
