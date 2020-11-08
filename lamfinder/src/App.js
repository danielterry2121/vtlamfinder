import React , {useState} from 'react';
import Fuse from 'fuse.js';
import data from './data.js';
import './App.css';

function App() {
  const [query,setQuery] = useState('');

  const fuse = new Fuse(data, {
    keys: [
      'color',
      'number'
    ],
    includeScore:true
  })

  const results = fuse.search(query);
  const dataResults = results.map(result => result.item);

  const handleSearch = ({ currentTarget = {} }) => {
    const {value} = currentTarget;
    setQuery(value);
  }
  return (
    <div>
      <header>
        <h1>VT Laminate Finder</h1>
      </header>
      <main>
      <aside>
          <form className="search">
            <label>Search</label>
            <input type="text" value = {query} onChange = {handleSearch} />
          </form>
        </aside>
        <ul>
          {dataResults.map(item => {
            const { number, color, style, img} = item;
            return (
              <li key = {color}>
                <ul>
                  <li>
                    <strong>Color:</strong> { color }
                  </li>
                  <li>
                    <strong>Number:</strong> { number }
                  </li>
                  <li>
                    <strong>Style:</strong> { style }
                  </li>
                  <li>
                    <img src = {`${img}`} alt = { `${ color }` }/>
                  </li>
                </ul>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
