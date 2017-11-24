import React from "react";


export default class ViewContents extends React.Component {
    constructor(){
        super();
        THIS.STATE({
            showForm: ''
        })
        this.checkTrue = this.checkTrue.bind(this);
    }
    checkTrue(){
        console.log("I HAVE BEEN CLICKED");
        this.setState({
            showForm: true
        })
    }
    render(){
        return (
            <div className="greeting-container">
                 <label htmlFor="add">add memories</label>
                <input type="radio" className="add" id="add" onChange={()=> this.state.showForm}/>
                 <label htmlFor="view">view memories</label>
                <input type="radio" className="view" id="add"/>
            </div>
        )
    }

}

// app needs a method that is reponsible for setting the state is true or false

// this method should be called on change, of radio buttons that live in the viewcontent

// pass the method as a prop to the view content compoenent
// inside viewcontent, we have an onchange listener on the forms, that calls this prop and passes what input is currently selected to the method which is on the app

