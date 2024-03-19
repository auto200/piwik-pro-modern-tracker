import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div data-track-content>
        <a href="https://vitejs.dev" target="_blank" data-content-name="vitejs-name">
          <img src={viteLogo} className="logo" alt="Vite logo" data-content-piece="logo-piece" />
        </a>
        <a href="https://react.dev" target="_blank" data-content-target="https://react.dev">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div
        className="card"
        data-track-content
        data-content-name="name"
        data-content-piece="piece"
        data-content-target="target"
      >
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
