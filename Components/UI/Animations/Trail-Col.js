import { useTrail, a } from "react-spring";
import React, { useState } from "react";

function TrailCol({ open, children, ...props }) {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2500, friction: 150 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? "auto" : "auto",
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div className="trails-main-col" {...props}>
      {trail.reverse().map(({ x, height, ...rest }, index) => {
        return (
          <a.div
            key={items[index].key}
            className="trails-text-col"
            style={{
              ...rest,
              //transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
              transform: x.to((x) => `translate3d(0,${x}px,0)`),
            }}
          >
            <a.div className="trails-main-col-cont" style={{ height }}>
              {items[index]}
            </a.div>
          </a.div>
        );
      })}
    </div>
  );
}

export default TrailCol;
