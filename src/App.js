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
  const [isLoading, setIsLoading] = React.useState(true)
  const [page, setPage] = React.useState(1)
  // const [pageCount, setPageCount] = React.useState(1)
  const [categoryIndex, setCategoryIndex] = React.useState(0)
  // const [photos, setPhotos] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  // const [categoryId, setCategoryId] = React.useState(0)
  // const [name, setName] = React.useState('')
  React.useEffect(() => {
    //&search=${searchValue}
    setIsLoading(true)
    axios.get(`https://636d09b8ab4814f2b276a7b1.mockapi.io/collections?page=${page}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}`)
    .then(response => {
      collectionsRef.current = response.data;
      // setName(collectionsRef.current[page].name)
      // setPhotos(collectionsRef.current[page].photos)
      // setPageCount(collectionsRef.current.length)
    }).finally(() => setIsLoading(false))
    // fetch('https://636d09b8ab4814f2b276a7b1.mockapi.io/collections')
    // .then((res) => res.json())
    // .then((json) => {
    //   setCollections(json)
    // })
  }, [categoryIndex, page])

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
        <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
       { isLoading ? (<h2>Идет загрузка...</h2>) : (
        collectionsRef.current
        .filter((obj) => {
          return obj.name.toLowerCase().includes(searchValue.toLowerCase())
        })
        .map((obj, index) => (
          <Collection
          key={index}
          name={obj.name}
          images={obj.photos}/>
        )))
       }
      </div>
      <Pagination onChangePage={number => onChangePage(number)}/>
    </div>
  );
}

export default App;
