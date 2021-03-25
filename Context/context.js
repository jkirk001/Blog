import React, { useState, useEffect } from "react";

export const ModeContext = React.createContext({
  lightMode: false,
  switch: () => {},
});
const ModeContextProvider = (props) => {
  const [isLightMode, setLightMode] = useState(false);

  const switchHandler = () => {
    setLightMode(!isLightMode);
  };

  return (
    <ModeContext.Provider
      value={{
        lightMode: isLightMode,
        switch: switchHandler,
      }}
    >
      {props.children}
    </ModeContext.Provider>
  );
};

export default ModeContextProvider;
