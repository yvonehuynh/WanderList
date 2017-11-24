import React from 'react';
import ReactDOM from 'react-dom';
import Inputs from "./input-section";

class App extends React.Component {
    render() {
      return (
        <div className="wrapper">
          <h1>WanderList</h1>
          <Inputs />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
