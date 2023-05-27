import * as React from 'react';
import { useState, useEffect } from 'react';

import Greeting from './Greeting';

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const handleToggle = () => {
    if (isDark) {
      document.body.classList.remove('dark');
      // document.body.classList = "bg-slate-100";
    } else {
      document.body.classList.add('dark');
    }
    setIsDark(!isDark);
  };

  return (
    <main>
      <div>
        <button className="p-2 m-4 text-xl bg-indigo-600 rounded-lg">Test TW button</button>
      </div>
    </main>
  );
};

interface AppProps {}

export default App;
