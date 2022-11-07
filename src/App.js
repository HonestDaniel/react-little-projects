import './index.scss';
import React from 'react';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
];

function Result({correct, onClickAgain}) {
  return (
    <div className="result">
      <img alt='' src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct} ответов из {questions.length}</h2>
      <button onClick={()=>onClickAgain()}>Попробовать снова</button>
    </div>
  );
}

function Game({q_index, question, onClickVariant}) {
  // const [q_index, setQ_index] = React.useState(0);
  const percentage = Math.round((q_index / questions.length * 100));
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
       {
          question.variants.map((variant, index) => (
            <li onClick={() => onClickVariant(index)} key={index}>{variant}</li>
          ))
          // questions[q_index].variants.map((variant, index) => (
          //   <li key={index} 
          //   onClick={setQ_index(q_index + 1)}>
          //     {variant}</li>
          // ))
        }
      </ul>
    </>
  );
}

function App() {
  const [q_index, setQ_index] = React.useState(0);
  const [correct, updateCorrect] = React.useState(0);
  const question = questions[q_index];

  const onClickVariant = (index) => {
    setQ_index(q_index + 1)
    if (index === question.correct) {
      updateCorrect(correct + 1)
    }
  }

  const onClickAgain = () => {
    setQ_index(0)
    updateCorrect(0)
  }

  return (
    <div className="App">
      {q_index === questions.length ? <Result onClickAgain={onClickAgain} correct = {correct}/> : 
      <Game q_index = {q_index} question = {question} onClickVariant={onClickVariant}/>}
    </div>
  );
}

export default App;
