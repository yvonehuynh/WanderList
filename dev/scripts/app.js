import React from 'react';
import ReactDOM from 'react-dom';
import Inputs from "./input-section";
import ViewContents from "./view-contents";

class App extends React.Component {
  constructor(){
    super();
    this.state={
      showForm: true
    }
    // this.showMemories = this.showMemories.bind(this);
  }
  // showMemories(){
  //   console.log("HELLO THERE");
  // }
    render() {
      return (
        <div className="wrapper">

          <h1>WanderList</h1>
          {this.state.showForm ? <Inputs /> : <ViewContents data={this.showForm} /> }
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
