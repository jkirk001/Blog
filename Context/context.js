import React, { useState, useEffect } from "react";

export const ModeContext = React.createContext({
  setData: () => {},
  data: [],
  lightMode: false,
  switch: () => {},
});
const ModeContextProvider = (props) => {
  const [isLightMode, setLightMode] = useState(false);
  const [data, setData] = useState();

  const switchHandler = () => {
    setLightMode(!isLightMode);
  };

  return (
    <ModeContext.Provider
      value={{
        lightMode: isLightMode,
        switch: switchHandler,
        setData: setData,
        data: data,
      }}
    >
      {props.children}
    </ModeContext.Provider>
  );
};

export default ModeContextProvider;
