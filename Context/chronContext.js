import React, { useState, useEffect } from "react";
import insertionSort from "../utils/insertionSort";

export const ChronContext = React.createContext({
  display: [],
  year: 0,
  month: 0,
  setDisplay: () => {},
  setYear: () => {},
  setMonth: () => {},
  setInitialArray: () => {},
});
const ChronContextProvider = (props) => {
  const [display, setDisplay] = useState(1);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [initalArray, setInitialArray] = useState([]);

  useEffect(() => {
    //get isnertion sort to work correctly
    const orderedArr = insertionSort(initalArray);

    const filteredArray = orderedArr.filter((item, index) => {
      return parseInt(item.date.year) === parseInt(year);
    });

    if (month) {
      const filteredArrayMonth = filteredArray.filter((item, index) => {
        return parseInt(item.date.month - 1) === parseInt(month);
      });
      setDisplay(filteredArrayMonth.reverse());
      return;
    }
    //setDisplay(filteredArray);
    setDisplay(filteredArray.reverse());
  }, [year, month]);

  const monthHandler = (e) => {
    setMonth(e.target.id);
  };

  const yearHandler = (e) => {
    setMonth();
    setYear(e.target.id);
  };

  return (
    <ChronContext.Provider
      value={{
        display,
        year,
        month,
        setDisplay,
        setYear: yearHandler,
        setMonth: monthHandler,
        setInitialArray,
      }}
    >
      {props.children}
    </ChronContext.Provider>
  );
};

export default ChronContextProvider;
