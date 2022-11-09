import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  // const [currency, setCurrency] = React.useState('RUB')
  const [currency1, setCurrency1] = React.useState('USD')
  const [currency2, setCurrency2] = React.useState('RUB')
  const [value1, setValue1] = React.useState(1)
  const [value2, setValue2] = React.useState(1)
  
  const ratesRef = React.useRef({})

  React.useEffect(() => {
    fetch("https://cdn.cur.su/api/latest.json")
    .then(res => res.json())
    .then(json => {
      ratesRef.current = json.rates;
      onChangeValue1(1)
    }).catch(err => {
      console.warn(err);
    })
  }, [])

  const onChangeValue1 = (value) => {
    const price = Math.round((value / ratesRef.current[currency1]) * 100) / 100
    const result = Math.round((price * ratesRef.current[currency2]) * 100) / 100
    setValue1(value)
    setValue2(result)
  }

  const onChangeValue2 = (value) => {
    // const result = Math.round((rates[currency1] / rates[currency2]) * 100) / 100
    const price = Math.round((value / ratesRef.current[currency2]) * 100) / 100
    const result = Math.round((price * ratesRef.current[currency1]) * 100) / 100
    setValue2(value)
    setValue1(result)
  }

  React.useEffect(() => {
    onChangeValue1(value1)
  }, [currency1])

  React.useEffect(() => {
    onChangeValue2(value2)
  }, [currency2])

  return (
    <div className="App">
      <Block value={value1} currency={currency1} onChangeCurrency={(cur) => setCurrency1(cur)} onChangeValue={(value) => onChangeValue1(value)}/>
      <Block value={value2} currency={currency2} onChangeCurrency={(cur) => setCurrency2(cur)} onChangeValue={(value) => onChangeValue2(value)}/>
    </div>
  );
}

export default App;
