import React, { useEffect } from "react";

import { getItems } from "./services";

const App: React.FC = () => {
  const [items, setItems] = React.useState<string>("");
  useEffect(() => {
    (async () => {
      try {
        setItems(await getItems());
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-blue-600">
        {items || "React + TypeScript + Tailwind CSS is Ready!"}
      </h1>
    </div>
  );
};

export default App;
