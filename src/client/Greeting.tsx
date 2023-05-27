import React, { useEffect, useState } from "react";

const colors = ["green", "turquoise", "emerald", "orange", "blue", "red", "indigo", "rose"];
const values = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const Greeting = () => {
  const [color, setColor] = useState("indigo");
  const [value, setValue] = useState(700);

  const cycle = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    setColor(randomColor);
    setValue(randomValue);
  };

  useEffect(() => {
    const interval = setInterval(cycle, 1500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="mx-20">
      <div className="bg-red-200 text-blue-900 dark:text-green-500 dark:text-3xl mx-2">Hey</div>
    </div>
  );
};

export default Greeting;
