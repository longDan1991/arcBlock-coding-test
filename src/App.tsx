import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import BlockHash from './pages/BlockHash';

const App: React.FunctionComponent = (): JSX.Element => {
  
  return (
    <div className="App">
      <BlockHash />
    </div>
  )
}

export default App;
