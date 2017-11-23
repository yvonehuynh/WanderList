import React from 'react';
import ReactDOM from 'react-dom';
import Inputs from "./input-section";

class App extends React.Component {
    render() {
      return (
        <div>
          Hello
          <Inputs />
          <ul></ul>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
