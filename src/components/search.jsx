import React, { useState } from 'react';
import Fuse from 'fuse.js';
import text from './dictionary.txt';

// import characters from './characters.json';


export  default function Search() {
  const [query, updateQuery] = useState('');
  const [instance,setInstance]=useState([]);
  const [characterResults,setCharacterResults]=useState([]);
  let list = ['Please','Enter','Keyword'];

   fetch(text).then(function(response) {
    response.text().then(function(text) {
      setInstance(text.split("\n"));
    // console.log(instance); 
    });
    
  });


  let options = {
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  findAllMatches: true,
  threshold: 0,
  location: 0,
  distance: 0,
  maxPatternLength: 32,
  minMatchCharLength: 1,
    
    // don't include the keys property
  };
function change (e){
  updateQuery(e.target.value);
};


  function onSearch() {
    const fuse = new Fuse(instance , options);
    // console.log(list)
    const results = fuse.search(query);
  
     setCharacterResults ( results.length !== 0 ? results.map(character => character.item) : list);
  };

  return (
    <>

      <header>
        <div >
          <h1>Characters</h1>
        </div>
      </header>

      <main>
        <h3>{characterResults.map(ch => 
          <li>
          {ch}
          </li>
          )}
          </h3>
        <aside>
          <form>
            <label>Search</label>
            <input type="text" value={ query} onChange={change}/>
            <button type="button" onClick={onSearch}>Search</button>
          </form>
        </aside>
      </main>

    </>
  );

}