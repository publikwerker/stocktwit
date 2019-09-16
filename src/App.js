import React from 'react';
import {Main} from './components/Main';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        This is the header.
      </header>
      <Main />
      {/* this is what
      needs to happen:
      1.the user types in a symbol or list of symbols, the app detects spaces and commas and forms an array
      2. a call is made for each, and an object is formed for each symbol and the response.
      3. flex-box display of each group listing number of tweets
      4. some manner of user interface to edit list of symbols */}
    </div>
  );
}

export default App;
