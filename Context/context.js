import React, { useState } from "react";

export const ModeContext = React.createContext({
  lightMode: false,
  switch: () => {},
  submitData: {},
  submitDataSet: () => {},
});
const ModeContextProvider = (props) => {
  const [isLightMode, setLightMode] = useState(false);
  const [submitData, setSubmitData] = useState({});

  const submitDataHandler = (data) => {
    setSubmitData(data);
  };

  const switchHandler = () => {
    setLightMode(!isLightMode);
  };

  return (
    <ModeContext.Provider
      value={{
        lightMode: isLightMode,
        switch: switchHandler,
        submitDataSet: submitDataHandler,
        submitData: submitData,
      }}
    >
      {props.children}
    </ModeContext.Provider>
  );
};

export default ModeContextProvider;
// Test
