import './index.scss';
import React from 'react';

function App() {
  const [number, setNumber] = React.useState(0);

  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{number}</h1>
        <button onClick={()=>setNumber(number - 1)} className="minus">- Минус</button>
        <button onClick={()=>setNumber(number + 1)} className="plus">Плюс +</button>
      </div>
    </div>
  );
}

export default App;
