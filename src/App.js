import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [data, setData] = React.useState([])
  const [invites, setInvites] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [success, setSuccess] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  React.useEffect(() => {
    setIsLoading(true)
    fetch("https://reqres.in/api/users")
    .then(res => res.json())
    .then(json => {
      setData(json.data)
      setIsLoading(false)
    }).catch(err => {
      console.warn(err);
    })
  }, [])

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id))
    } else {
      setInvites((prev) => [...prev, id]);
    }
  }

  const onClickSuccess = () => {
    setSuccess(!success)
  }

  return (
    <div className="App">
      {
      success && invites.length > 0 ?
      <Success
      count = {invites.length}
      onClickSuccess={onClickSuccess}/>
      :
      <Users
      onClickSuccess={onClickSuccess}
      invites={invites}
      onClickInvite={onClickInvite}
      items={data} 
      isLoading={isLoading} 
      searchValue={searchValue} 
      setSearchValue={setSearchValue}/>
      }
    </div>
  );
}

export default App;
