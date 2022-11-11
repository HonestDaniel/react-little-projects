import React from 'react';
import axios from 'axios';
import Pagination from './pagination';
import './index.scss';

function Collection({ name, images }) {
  return (
    <div className="collection">
      <img className="collection__big" src={images[0]} alt="Item" />
      <div className="collection__bottom">
        <img className="collection__mini" src={images[1]} alt="Item" />
        <img className="collection__mini" src={images[2]} alt="Item" />
        <img className="collection__mini" src={images[3]} alt="Item" />
      </div>
      <h4>{name}</h4>
    </div>
  );
}

function App() {
  const categories = [
    'Все',
    'Море',
    'Горы',
    'Архитектура',
    'Города'
  ]
  const collectionsRef = React.useRef([])
  const [page, setPage] = React.useState(1)
  const [categoryIndex, setCategoryIndex] = React.useState(0)
  const [photos, setPhotos] = React.useState([])
  // const [categoryId, setCategoryId] = React.useState(0)
  const [name, setName] = React.useState('')
  React.useEffect(() => {
    axios.get(`https://636d09b8ab4814f2b276a7b1.mockapi.io/collections?page=1&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}`)
    .then(response => {
      collectionsRef.current = response.data;
      console.log(collectionsRef.current)
      setName(collectionsRef.current[0].name)
      setPhotos(collectionsRef.current[0].photos)
    })
    // fetch('https://636d09b8ab4814f2b276a7b1.mockapi.io/collections')
    // .then((res) => res.json())
    // .then((json) => {
    //   setCollections(json)
    // })
  }, [categoryIndex])

  const onClickCategory = (index) => {
    setCategoryIndex(index)
  }

  const onChangePage = (number) => {
    setPage(number)
  }

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            categories.map((categoryName, index) => (
              <li onClick={() => onClickCategory(index)} key={index} 
              className={categoryIndex === index ? 'active' : ''}>{categoryName}</li>
            ))
          }
        </ul>
        <input className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        <Collection
          name={name ? name : 'Путетешствие по миру'}
          images={photos.length > 0 ? photos : [
            'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1560840067-ddcaeb7831d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1573108724029-4c46571d6490?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          ]}
        />
      </div>
      <Pagination onChangePage={number => onChangePage(number)}/>
    </div>
  );
}

export default App;
