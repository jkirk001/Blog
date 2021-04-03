import { useTrail, a } from "react-spring";
import React, { useState } from "react";

function Trail({ open, children, ...props }) {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 1500, friction: 150 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? "auto" : "auto",
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div className="trails-main" {...props}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <a.div
            key={items[index].key}
            className="trails-text"
            style={{
              ...rest,
              //transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
              transform: x.to((x) => `translate3d(0,${x}px,0)`),
            }}
          >
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
    </div>
  );
}

export default Trail;
