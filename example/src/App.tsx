import './App.css';
import Store from './Store';
import HookStore from './HookStore';
import UserStore from './UserStore';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(true);
  return (
    <div className="App">
      <button
        onClick={() => {
          setOpen((val) => !val);
        }}
      >
        开启关闭
      </button>
      {open && <Store />}
    </div>
  );
}

export default App;
