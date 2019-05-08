import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

const Parent = () => {
  const [query, setQuery] = useState('react')

  const fetchData = useCallback(() => {
    const url = `https://hn.algolia.com/api/v1/search?query=${query}`
    return axios.get(url)
  }, [query])

  return (
    <div>
      <input onChange={e => setQuery(e.target.value)} />
      <Child fetchData={fetchData} />
    </div>
  )
}

const Child = props => {
  const { fetchData } = props
  const [data, setData] = useState({ hits: [] })

  useEffect(() => {
    fetchData().then(resp => {
      console.log(resp.data)
      setData(resp.data)
    })
  }, [fetchData])

  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  )
}

export default Parent