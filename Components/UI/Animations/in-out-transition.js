import React from "react";
import { useTransition, animated } from "react-spring";

const InOutTransition = (props) => {
  const items = props.data;

  const transitions = useTransition(items, (item) => item.key, {
    from: { transform: "translate3d(0,-40px,0)" },
    enter: { transform: "translate3d(0,0px,0)" },
    leave: { transform: "translate3d(0,-40px,0)" },
  });

  const display = transitions.map(({ item, props, key }, index) => (
    <animated.div key={key} style={props}>
      {item}
    </animated.div>
  ));

  return <div>{display}</div>;
};

export default InOutTransition;
