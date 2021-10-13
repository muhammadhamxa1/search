import React, { Component } from 'react';
import Fuse from 'fuse.js';
import text from './dictionary.txt';
import debounce from 'lodash.debounce';

class Find extends Component {
  state={
    query:'',
    instance:[],
    characterResults:[],
   options : {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      findAllMatches: true,
      threshold: 0,
      location: 0,
      distance: 0,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      }
  };
  componentDidMount(){
      fetch(text)
      .then((response) => response.text())
      .then((result) => {
        this.setState({instance: result.split("\n")});
      });
  }
  
      
  handleChange = (e) => {
    this.setState({query: e.target.value});
    this.debouncedLog(e.target.value);
  };


  onSearch = text => {
    const fuse = new Fuse(this.state.instance , this.state.options);
    const results = fuse.search(this.state.query);
  
    if(results.length!== 0)
    {
    this.setState({characterResults: results.map(character => character.item)});
    }
    else
    {
      if(this.state.query.length !==0)
      this.setState({characterResults: "00000"});
    } 
  };

  debouncedLog=debounce(text=>{this.onSearch(text)},500);

  handleAddValue = () => {
    const dist=[...this.state.instance,this.state.query];
    this.setState({instance:dist});
  };  

 render() {      
  return <div>

    <header>
      <div >
        <h1>Dictionary</h1>
      </div>
    </header>
    <aside>
        <form>
          <label>Search</label>
          <input type="text" value={ this.state.query} onChange={this.handleChange}/>
        </form>
      </aside>

    <main>
      <h3>{this.state.characterResults !== "00000" ? (this.state.characterResults.map(ch => 
        <li key={ch}>
        {ch}
        </li>
        )
      ):
     <div>
        <p>Add this value into the Dictionary</p>
        <button type="button" onClick={() => this.handleAddValue()}>Add</button>
        </div>
      }
        </h3>
      
    </main>
  </div>;
 }
}
 
export default Find;