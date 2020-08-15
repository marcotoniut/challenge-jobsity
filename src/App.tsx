import React, { FC } from 'react';
import './App.css';
import { Month } from './components/Month';

export const App: FC = () => {
  const date = new Date();

  return (
    <div className="App">
      <Month date={date} />
    </div>
  );
}

export default App;
