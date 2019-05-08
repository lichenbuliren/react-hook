import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FnDepends = () => {
  const [query, setQuery] = useState('react')
  const [data, setData] = useState()

  useEffect(() => {
    const getFetchUrl = () => {
      return `https://hn.algolia.com/api/v1/search?query=${query}`
    }

    const fetchData = async () => {
      return axios.get(getFetchUrl())
    }
    
    fetchData().then(resp => {
      console.log(resp)
      setData(resp.data)
    })
  }, [query])

  return (
    <div>
      <input onChange={e => setQuery(e.target.value)} />
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FnDepends